import { ToolSelector } from "@/components/ToolSelector";
import { PricingPanel } from "@/components/PricingPanel";
import { TrustSection } from "@/components/TrustSection";
import { PRICING } from "@/lib/pricing";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground mb-6">
          AI photo edits <br className="hidden md:block"/> without subscriptions.
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          Create passport-style photos, try outfits, or transform your portrait with a reference image. Preview free. Download HD for {PRICING.singleHdDownload.displayPrice}.
        </p>
        <div className="flex flex-col items-center gap-3">
          <a href="#tools" className="px-8 py-3 bg-primary text-white text-lg font-medium rounded-full hover:bg-primary/90 transition-all shadow-md">
            Choose a tool
          </a>
          <p className="text-xs font-medium text-foreground/50 tracking-wide uppercase mt-4">
            No account required &middot; Watermarked preview free &middot; HD download {PRICING.singleHdDownload.displayPrice}
          </p>
        </div>
      </section>

      {/* Interactive Tool Area */}
      <section id="tools" className="w-full max-w-5xl mx-auto px-4 py-12 scroll-mt-20">
        <ToolSelector />
      </section>

      {/* Trust & Privacy */}
      <section id="privacy" className="w-full py-16 bg-white/40">
        <div className="max-w-4xl mx-auto px-4">
          <TrustSection />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-20">
        <div className="max-w-4xl mx-auto px-4">
          <PricingPanel />
        </div>
      </section>
    </div>
  );
}
