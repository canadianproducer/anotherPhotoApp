"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export function ToolCard({ title, description, icon: Icon, isActive, onClick }: ToolCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex flex-col items-start p-6 rounded-2xl border text-left transition-all duration-300 w-full",
        isActive 
          ? "bg-white border-primary shadow-md ring-1 ring-primary" 
          : "bg-white/60 border-border/60 hover:bg-white hover:border-primary/50 shadow-sm"
      )}
    >
      <div className={cn(
        "p-3 rounded-xl mb-4 transition-colors",
        isActive ? "bg-primary text-white" : "bg-primary/10 text-primary"
      )}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-sm text-foreground/70 leading-relaxed">{description}</p>
    </motion.button>
  );
}
