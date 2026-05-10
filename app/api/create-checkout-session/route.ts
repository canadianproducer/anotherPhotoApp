import { NextResponse } from 'next/server';
import { stripe, isMockPaymentMode } from '@/lib/stripe';
import { getJob } from '@/lib/storage';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(req: Request) {
  try {
    const { jobId } = await req.json();

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const job = await getJob(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (isMockPaymentMode) {
      console.warn("MOCK PAYMENT MODE: Skipping Stripe. Redirecting directly to success.");
      // In mock mode, we just redirect directly as if paid
      return NextResponse.json({ url: `${APP_URL}/success?session_id=mock_${jobId}&job_id=${jobId}` });
    }

    // Create a Checkout Session
    const session = await stripe!.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 99, // $0.99
            product_data: {
              name: 'StudioSnap AI HD Download',
              description: `High-resolution, watermark-free download for job ${jobId.substring(0,8)}`,
              images: [`${APP_URL}/api/image/${jobId}?type=preview`], // Stripe will pull the preview to show on checkout
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&job_id=${jobId}`,
      cancel_url: `${APP_URL}/cancel?jobId=${jobId}`,
      client_reference_id: jobId,
      metadata: {
        jobId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe error:", err);
    const message = err instanceof Error ? err.message : "Failed to create session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
