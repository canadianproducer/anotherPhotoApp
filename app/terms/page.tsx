import Link from "next/link";
import { PRICING } from "@/lib/pricing";
import { SITE } from "@/lib/site";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="glass-card rounded-3xl p-8 md:p-12">
        <p className="text-sm text-foreground/50 mb-3">Last updated: May 16, 2026</p>
        <h1 className="text-4xl font-medium mb-6">Terms of Service</h1>

        <div className="space-y-6 text-foreground/75 leading-relaxed">
          <p>
            By using {SITE.name}, you agree to these MVP terms. The service provides AI-generated photo edits from images you upload.
          </p>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">Use only images you have rights to use</h2>
            <p>
              You confirm that you have the rights and permission needed to upload each image, including any person, outfit, or reference image.
              Do not upload private, illegal, abusive, or non-consensual content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">AI results are not guaranteed</h2>
            <p>
              AI photo edits can be inaccurate, imperfect, or visually distorted. Preview the result before paying. The paid download removes
              the watermark and provides the generated high-resolution file; it does not guarantee a perfect or official result.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">Passport-style disclaimer</h2>
            <p>
              Passport-style or ID-style photos generated here are not guaranteed to satisfy any government, immigration, school, workplace,
              or platform requirements. You are responsible for checking official rules before using the image.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">Payment</h2>
            <p>
              The MVP price is {PRICING.singleHdDownload.displayPrice} for one high-resolution, watermark-free download. Payments are processed
              by Stripe. If a payment succeeds but the download fails, contact support so the issue can be fixed or refunded where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">No account system</h2>
            <p>
              The MVP does not create user accounts. Keep your success/download link until you save your image. Generated files may be removed
              after a retention period once cleanup automation is added.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">Contact</h2>
            <p>
              For support, contact <a className="text-primary underline" href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.
            </p>
          </section>

          <p className="text-sm text-foreground/50">
            These are practical MVP terms, not legal advice. Review them before serious paid traffic.
          </p>
        </div>

        <Link href="/" className="inline-block mt-10 px-6 py-3 bg-foreground text-background rounded-full hover:bg-primary transition-colors">
          Back to home
        </Link>
      </div>
    </div>
  );
}
