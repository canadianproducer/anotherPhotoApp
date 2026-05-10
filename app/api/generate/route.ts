import { NextResponse } from 'next/server';
import { generateImageWithGemini } from '@/lib/gemini';
import { createWatermarkedImage } from '@/lib/watermark';
import { saveJob } from '@/lib/storage';
import { checkRateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit';
import { parseLimitedJson, RequestValidationError, validateGenerateRequest } from '@/lib/request-validation';

const GENERATE_LIMIT_PER_HOUR = Number(process.env.GENERATE_LIMIT_PER_HOUR || 5);

// TODO(PRODUCTION): Replace the in-memory limiter with Upstash Redis or another durable edge-safe store.
// TODO(PRODUCTION): Add real bot protection such as Turnstile before paid traffic.

export const maxDuration = 60; // Allow up to 60 seconds for image generation on Vercel

export async function POST(req: Request) {
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(`generate:${clientIp}`, GENERATE_LIMIT_PER_HOUR);
  const headers = rateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many generations. Please try again later.' },
      { status: 429, headers }
    );
  }

  try {
    const rawBody = await parseLimitedJson(req);
    const { toolType, userImage, referenceImage } = validateGenerateRequest(rawBody);

    // 1. Generate the Image from Gemini
    const rawBuffer = await generateImageWithGemini({
      toolType,
      userImage,
      referenceImage,
    });

    // 2. Upscale to 2K (2048px on longest side) for HD download
    // Using sharp to resize while maintaining aspect ratio
    const sharp = (await import('sharp')).default;
    const hdBuffer = await sharp(rawBuffer)
      .resize({
        width: 2048,
        height: 2048,
        fit: 'inside', // This ensures the longest side is 2048px without cropping
        withoutEnlargement: false, // We explicitly want to enlarge if it's smaller
      })
      .jpeg({ quality: 95 })
      .toBuffer();

    // 3. Generate the Watermarked Preview
    const previewBuffer = await createWatermarkedImage(hdBuffer);

    // 4. Save to Storage (returns jobId)
    const jobId = await saveJob(toolType, previewBuffer, hdBuffer);
    const previewUrl = `/api/image/${jobId}?type=preview`;

    return NextResponse.json({ jobId, previewUrl }, { headers });
  } catch (error: unknown) {
    if (error instanceof RequestValidationError) {
      return NextResponse.json({ error: error.message }, { status: error.status, headers });
    }

    console.error('Generation API error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500, headers });
  }
}
