"use client";

import { Download, RefreshCw } from "lucide-react";

interface ResultPreviewProps {
  previewUrl: string;
  jobId: string;
  onReset: () => void;
  onDownload: () => void;
  isCheckingOut: boolean;
}

export function ResultPreview({ previewUrl, onReset, onDownload, isCheckingOut }: ResultPreviewProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-md aspect-[4/5] bg-muted rounded-2xl overflow-hidden mb-6 relative shadow-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={previewUrl} 
          alt="Generated preview" 
          className="w-full h-full object-contain"
        />
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
          Watermarked Preview
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-sm text-foreground/70 mb-2">
          Quality note: Preview is compressed and watermarked.
        </p>
        <p className="text-xs text-foreground/50">
          Paid HD download removes the watermark and provides full resolution.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={onReset}
          className="flex-1 py-3 px-4 rounded-xl border border-border bg-white text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <RefreshCw size={18} />
          Try another
        </button>
        <button
          onClick={onDownload}
          disabled={isCheckingOut}
          className="flex-[2] py-3 px-4 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium shadow-md disabled:opacity-70"
        >
          {isCheckingOut ? (
            <span className="flex items-center gap-2">
              <RefreshCw size={18} className="animate-spin" />
              Processing...
            </span>
          ) : (
            <>
              <Download size={18} />
              Download HD – $0.99
            </>
          )}
        </button>
      </div>
    </div>
  );
}
