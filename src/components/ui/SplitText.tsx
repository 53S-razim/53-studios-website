"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "char" | "word" | "line";
  staggerDelay?: number;
  initialDelay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function SplitText({
  children,
  className,
  as: Component = "span",
  splitBy = "word",
  staggerDelay = 0.03,
  initialDelay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.3,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: splitBy === "line" ? "100%" : 30,
      rotateX: splitBy === "char" ? -45 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const renderContent = () => {
    if (splitBy === "char") {
      return children.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{ 
            whiteSpace: char === " " ? "pre" : "normal",
            transformOrigin: "bottom"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
    }

    if (splitBy === "word") {
      return children.split(" ").map((word, index, arr) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            variants={itemVariants}
            className="inline-block"
          >
            {word}
            {index < arr.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ));
    }

    // splitBy === "line"
    return children.split("\n").map((line, index) => (
      <span key={index} className="block overflow-hidden">
        <motion.span
          variants={itemVariants}
          className="block"
        >
          {line}
        </motion.span>
      </span>
    ));
  };

  const MotionComponent = motion[Component] as typeof motion.span;

  return (
    <MotionComponent
      ref={ref as React.RefObject<HTMLSpanElement>}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("inline-block", className)}
      style={{ perspective: splitBy === "char" ? 1000 : undefined }}
    >
      {renderContent()}
    </MotionComponent>
  );
}

// Simplified version for hero headlines
interface HeroTextProps {
  line1: string;
  line2: string;
  line2Accent?: boolean;
  className?: string;
}

export function HeroText({ line1, line2, line2Accent = true, className }: HeroTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      <div className="overflow-hidden">
        <motion.div variants={lineVariants}>
          <span className="block text-display text-[var(--foreground)]">
            {line1}
          </span>
        </motion.div>
      </div>
      <div className="overflow-hidden">
        <motion.div variants={lineVariants}>
          <span 
            className={cn(
              "block text-display",
              line2Accent 
                ? "text-[var(--foreground-secondary)]" 
                : "text-[var(--foreground)]"
            )}
          >
            {line2}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Large headline with staggered words
interface StaggeredHeadlineProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function StaggeredHeadline({ 
  children, 
  className,
  as: Component = "h1" 
}: StaggeredHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const words = children.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const MotionComponent = motion[Component];

  return (
    <MotionComponent
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("flex flex-wrap", className)}
      style={{ perspective: 1000 }}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden mr-[0.25em]">
          <motion.span
            variants={wordVariants}
            className="inline-block"
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
}
