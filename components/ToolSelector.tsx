"use client";

import { useState } from "react";
import { ToolCard } from "./ToolCard";
import { Camera, Shirt, Image as ImageIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { UploadDropzone } from "./UploadDropzone";

type ToolType = "passport" | "outfit" | "style";

export function ToolSelector() {
  const [activeTool, setActiveTool] = useState<ToolType>("passport");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        <ToolCard
          title="ID Photo"
          description="Turn a clean portrait into a passport-style ID photo."
          icon={Camera}
          isActive={activeTool === "passport"}
          onClick={() => setActiveTool("passport")}
        />
        <ToolCard
          title="Outfit Swap"
          description="Try an outfit from any reference image."
          icon={Shirt}
          isActive={activeTool === "outfit"}
          onClick={() => setActiveTool("outfit")}
        />
        <ToolCard
          title="Photo Style"
          description="Transform your photo using a style or location reference."
          icon={ImageIcon}
          isActive={activeTool === "style"}
          onClick={() => setActiveTool("style")}
        />
      </div>

      <div className="w-full max-w-3xl glass-card rounded-3xl p-6 md:p-10 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTool === "passport" && (
              <UploadDropzone toolType="passport" />
            )}
            {activeTool === "outfit" && (
              <UploadDropzone toolType="outfit" />
            )}
            {activeTool === "style" && (
              <UploadDropzone toolType="style" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
