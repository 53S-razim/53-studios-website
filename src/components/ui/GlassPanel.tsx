"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "subtle" | "strong";
  hover?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = "default", hover = false, children, ...props }, ref) => {
    const variants = {
      default: "glass",
      subtle: "glass-subtle",
      strong: "bg-[var(--glass-background)] backdrop-blur-[30px] border border-[var(--glass-border)]",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl",
          variants[variant],
          hover && "transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
