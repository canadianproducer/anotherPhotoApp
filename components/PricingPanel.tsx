export function PricingPanel() {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-medium mb-4">Simple pricing</h2>
      <p className="text-xl text-foreground/70 mb-8">
        Preview free. Download HD for $0.99. <br className="hidden sm:block"/> No subscription.
      </p>
      
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
