import { redirect } from 'next/navigation';
import { stripe, isMockPaymentMode } from '@/lib/stripe';
import { updateJobStatus } from '@/lib/storage';
import Link from 'next/link';
import { CheckCircle, Download } from 'lucide-react';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string; job_id?: string }> }) {
  const params = await searchParams;
  const sessionId = params.session_id;
  const jobId = params.job_id;

  if (!sessionId || !jobId) {
    redirect('/');
  }

  let isPaid = false;

  if (isMockPaymentMode && sessionId.startsWith('mock_')) {
    isPaid = true;
    await updateJobStatus(jobId, 'paid');
  } else if (stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === 'paid') {
        isPaid = true;
        await updateJobStatus(jobId, 'paid'); // Ensure it's paid even if webhook is slow
      }
    } catch (e) {
      console.error("Error retrieving Stripe session", e);
    }
  }

  if (!isPaid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-3xl font-medium text-red-600 mb-4">Payment Verification Failed</h1>
        <p className="text-foreground/70 mb-8">We could not verify your payment. Please contact support.</p>
        <Link href="/" className="px-6 py-3 bg-foreground text-background rounded-full hover:bg-primary transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full pt-20 px-4">
      <div className="w-full max-w-2xl glass-card rounded-3xl p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-4">Thank you!</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Your payment was successful. Your high-resolution, watermark-free image is ready.
        </p>

        <div className="w-full max-w-md aspect-[4/5] bg-muted rounded-2xl overflow-hidden mx-auto mb-8 relative shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={`/api/image/${jobId}?type=hd`} 
            alt="HD Result" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={`/api/image/${jobId}?type=hd`}
            download="StudioSnap-HD.jpg"
            className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium shadow-md"
          >
            <Download size={20} />
            Download HD Image
          </a>
          <Link
            href="/"
            className="px-8 py-4 border border-border bg-white text-foreground rounded-xl hover:bg-muted transition-colors flex items-center justify-center font-medium"
          >
            Create Another
          </Link>
        </div>
      </div>
    </div>
  );
}
