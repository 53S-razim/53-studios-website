"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Top divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "h-[2.5px] bg-[var(--foreground)] mb-6",
          align === "center" ? "w-16 mx-auto origin-center" : "w-12 origin-left"
        )}
      />

      {/* Label - ALL CAPS */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        className="text-overline text-[var(--foreground)] tracking-[0.15em] mb-4"
      >
        {label}
      </motion.p>

      {/* Title */}
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          className="text-headline text-[var(--foreground)] mb-4"
        >
          {title}
        </motion.h2>
      )}

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
          className={cn(
            "text-body text-[var(--foreground-secondary)]",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

// Compact version for smaller sections
interface CompactHeaderProps {
  label: string;
  className?: string;
}

export function CompactHeader({ label, className }: CompactHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("flex items-center gap-3 mb-8", className)}
    >
      <div className="w-8 h-px bg-[var(--foreground)]" />
      <span className="text-overline text-[var(--foreground)] tracking-[0.15em]">
        {label}
      </span>
    </motion.div>
  );
}

// Large display header for hero-like sections
interface DisplayHeaderProps {
  label: string;
  title: string;
  highlight?: string;
  className?: string;
}

export function DisplayHeader({ 
  label, 
  title, 
  highlight,
  className 
}: DisplayHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={className}>
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-center gap-3 mb-6"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="w-8 h-[2px] bg-[var(--foreground)] origin-left"
        />
        <span className="text-overline text-[var(--foreground-secondary)] tracking-[0.15em]">
          {label}
        </span>
      </motion.div>

      {/* Title with optional highlight */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="text-display text-[var(--foreground)]"
        >
          {title}
          {highlight && (
            <span className="text-[var(--foreground-secondary)] italic">
              {" "}{highlight}
            </span>
          )}
        </motion.h2>
      </div>
    </div>
  );
}
