import Link from "next/link";
import { SITE } from "@/lib/site";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="glass-card rounded-3xl p-8 md:p-12">
        <p className="text-sm text-foreground/50 mb-3">Last updated: May 16, 2026</p>
        <h1 className="text-4xl font-medium mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-foreground/75 leading-relaxed">
          <p>
            {SITE.name} lets you upload photos, generate a watermarked AI preview, and optionally pay for a high-resolution download.
            This policy explains the basic data we handle for that MVP flow.
          </p>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">Photos you upload</h2>
            <p>
              Uploaded and generated images are used to create your preview and paid download. Do not upload images unless you have the right
              to use them. For the MVP, images may be stored temporarily so the preview, checkout, and download pages can work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">Payments</h2>
            <p>
              Payments are processed by Stripe. We do not store full card numbers on our servers. Stripe may receive payment details, billing
              information, fraud-prevention signals, and transaction metadata according to Stripe&apos;s own policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">Technical data</h2>
            <p>
              We may process basic technical information such as IP address, browser details, request timestamps, and rate-limit counters to
              operate the service, prevent abuse, and troubleshoot errors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">Data retention</h2>
            <p>
              The intended MVP behavior is short-term storage for generated images, not permanent hosting. Before full public launch, we should
              add an automated cleanup job for old generated files.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">Contact</h2>
            <p>
              For privacy or support questions, contact <a className="text-primary underline" href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.
            </p>
          </section>

          <p className="text-sm text-foreground/50">
            This page is a practical MVP policy draft, not legal advice. It should be reviewed before serious paid traffic.
          </p>
        </div>

        <Link href="/" className="inline-block mt-10 px-6 py-3 bg-foreground text-background rounded-full hover:bg-primary transition-colors">
          Back to home
        </Link>
      </div>
    </div>
  );
}
