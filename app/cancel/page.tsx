import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 text-center">
        <h1 className="text-3xl font-medium mb-4">Payment Cancelled</h1>
        <p className="text-foreground/70 mb-8">
          Your payment was cancelled. You have not been charged.
        </p>
        <Link href="/" className="px-6 py-3 bg-foreground text-background rounded-full hover:bg-primary transition-colors inline-block">
          Return Home
        </Link>
      </div>
    </div>
  );
}
