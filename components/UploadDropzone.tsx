"use client";

import { useState, useRef } from "react";
import { ResultPreview } from "./ResultPreview";
import { Upload, Loader2 } from "lucide-react";

interface UploadDropzoneProps {
  toolType: "passport" | "outfit" | "style";
}

export function UploadDropzone({ toolType }: UploadDropzoneProps) {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ previewUrl: string, jobId: string } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (f: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError("File must be less than 10MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setError("Only JPEG, PNG, and WEBP are supported");
        return;
      }
      setError(null);
      setFile(file);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerate = async () => {
    if (!image1 || (toolType !== "passport" && !image2)) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const base64Image1 = await toBase64(image1);
      const base64Image2 = image2 ? await toBase64(image2) : undefined;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType,
          userImage: base64Image1,
          referenceImage: base64Image2,
          website: "", // Honeypot field; bots often fill hidden website fields.
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Generation failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!result?.jobId) return;
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: result.jobId }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      setError(message);
      setIsCheckingOut(false);
    }
  };

  if (result) {
    return (
      <ResultPreview 
        previewUrl={result.previewUrl} 
        jobId={result.jobId} 
        onReset={() => {
          setResult(null);
          setImage1(null);
          setImage2(null);
        }}
        onDownload={handleDownload}
        isCheckingOut={isCheckingOut}
      />
    );
  }

  const renderUploadBox = (label: string, file: File | null, inputRef: React.RefObject<HTMLInputElement | null>, setFile: (f: File | null) => void) => (
    <div 
      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl bg-white/50 hover:bg-white/80 transition-colors cursor-pointer w-full aspect-square md:aspect-[4/3]"
      onClick={() => inputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={inputRef as React.RefObject<HTMLInputElement>} 
        className="hidden" 
        accept="image/jpeg, image/png, image/webp"
        onChange={(e) => handleFileChange(e, setFile)}
      />
      {file ? (
        <div className="flex flex-col items-center w-full h-full justify-center relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover rounded-lg absolute inset-0 opacity-50 group-hover:opacity-30 transition-opacity" />
          <div className="relative z-10 flex flex-col items-center bg-white/80 p-2 rounded-lg">
            <p className="text-xs font-medium text-center truncate max-w-[120px]">{file.name}</p>
            <p className="text-[10px] text-foreground/70 mt-1">Click to change</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-foreground/60">
          <Upload className="mb-2" size={32} />
          <p className="text-sm font-medium text-center">{label}</p>
          <p className="text-xs mt-1">JPEG, PNG up to 10MB</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium ml-1">Your photo</label>
          {renderUploadBox("Upload your portrait", image1, fileInput1Ref, setImage1)}
        </div>

        {toolType !== "passport" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium ml-1">
              {toolType === "outfit" ? "Outfit reference" : "Style reference"}
            </label>
            {renderUploadBox("Upload reference image", image2, fileInput2Ref, setImage2)}
          </div>
        )}


      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isGenerating || !image1 || (toolType !== "passport" && !image2)}
        className="w-full py-4 rounded-xl bg-foreground text-background font-medium hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            {toolType === "passport" ? "Matching lighting and identity..." : "Preparing your studio preview..."}
          </>
        ) : (
          "Generate Preview"
        )}
      </button>
      
      <p className="text-center text-xs text-foreground/40 mt-4">
        By generating, you agree to our terms and confirm you have rights to these images.
      </p>
    </div>
  );
}
