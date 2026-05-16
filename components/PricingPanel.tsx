import { PRICING } from "@/lib/pricing";

export function PricingPanel() {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-medium mb-4">Simple pricing</h2>
      <p className="text-xl text-foreground/70 mb-8">
        Preview free. Download HD for {PRICING.singleHdDownload.displayPrice}. <br className="hidden sm:block"/> No subscription.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
        <div className="rounded-2xl border border-primary/30 bg-white/70 p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Launch price</div>
          <h3 className="text-lg font-medium">Single HD download</h3>
          <p className="text-3xl font-semibold mt-2">{PRICING.singleHdDownload.displayPrice}</p>
          <p className="text-sm text-foreground/60 mt-2">Pay only if your free preview is worth keeping.</p>
        </div>
        <div className="rounded-2xl border border-border bg-white/50 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-foreground/40 mb-2">Planned next</div>
          <h3 className="text-lg font-medium">3-download pack</h3>
          <p className="text-3xl font-semibold mt-2">{PRICING.threePack.displayPrice}</p>
          <p className="text-sm text-foreground/60 mt-2">A better option for testing a few variants. Coming after the single-download flow is proven.</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-6 text-left max-w-lg mx-auto">
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-primary/20 p-1 rounded-full">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium">No monthly plan</h4>
            <p className="text-sm text-foreground/60">Pay once per photo.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-primary/20 p-1 rounded-full">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium">No account</h4>
            <p className="text-sm text-foreground/60">No login required.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-primary/20 p-1 rounded-full">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium">Pay if you like it</h4>
            <p className="text-sm text-foreground/60">Free watermarked preview.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
