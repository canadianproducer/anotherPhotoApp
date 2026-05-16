import Link from "next/link";
import { SITE } from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
        <h1 className="text-4xl font-medium mb-4">Contact</h1>
        <p className="text-foreground/70 mb-8">
          Need help with a payment, failed generation, or download? Email support and include your checkout/download link if you have one.
        </p>
        <a
          href={`mailto:${SITE.supportEmail}?subject=StudioSnap%20AI%20Support`}
          className="inline-block px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium shadow-md"
        >
          {SITE.supportEmail}
        </a>
        <p className="text-xs text-foreground/45 mt-6">
          Please do not email passwords, payment card numbers, API keys, or other sensitive secrets.
        </p>
        <Link href="/" className="inline-block mt-10 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
          Back to home
        </Link>
      </div>
    </div>
  );
}
