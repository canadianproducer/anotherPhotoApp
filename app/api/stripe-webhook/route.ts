import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { updateJobStatus } from '@/lib/storage';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
  }

  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook Error";
    console.error('Webhook signature verification failed.', message);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = event.data.object as any; // Using any because Stripe types are complex and we only need basic metadata
    const jobId = session.metadata?.jobId || session.client_reference_id;

    if (jobId) {
      await updateJobStatus(jobId, 'paid');
      console.log(`Job ${jobId} marked as paid via webhook.`);
    }
  }

  return NextResponse.json({ received: true });
}
