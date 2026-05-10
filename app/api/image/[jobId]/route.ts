import { NextResponse } from 'next/server';
import { getJobPreviewImage, getJobHdImage } from '@/lib/storage';

export async function GET(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'preview';
  const resolvedParams = await params;
  const jobId = resolvedParams.jobId;

  try {
    let buffer: Buffer | null = null;
    
    if (type === 'hd') {
      buffer = await getJobHdImage(jobId);
    } else {
      buffer = await getJobPreviewImage(jobId);
    }

    if (!buffer) {
      return new NextResponse("Image not found or not authorized", { status: 404 });
    }

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400'
      }
    });

  } catch (error) {
    console.error("Image serving error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
