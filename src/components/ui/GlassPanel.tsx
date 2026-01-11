"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "subtle" | "strong" | "macos" | "widget";
  hover?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = "default", hover = false, children, ...props }, ref) => {
    const variants = {
      default: "liquid-glass",
      subtle: "glass-subtle",
      strong: "bg-[var(--glass-background)] backdrop-blur-[40px] border border-[var(--glass-border)]",
      macos: "macos-panel",
      widget: "widget-glass",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl",
          variants[variant],
          hover && "transition-all duration-300 hover:shadow-lg hover:scale-[1.01]",
          className
        )}
        {...props}
      >
        {/* Specular Highlight - Apple-style top shine */}
        <div 
          className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, var(--glass-specular) 50%, transparent 100%)",
          }}
        />
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
