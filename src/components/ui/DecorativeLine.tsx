"use client";

import { motion, useInView, type Transition } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Custom ease curve
const customEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface DecorativeLineProps {
  orientation?: "horizontal" | "vertical";
  length?: string | number;
  thickness?: number;
  color?: string;
  opacity?: number;
  withArrow?: boolean;
  arrowPosition?: "start" | "end" | "both";
  delay?: number;
  className?: string;
}

export function DecorativeLine({
  orientation = "horizontal",
  length = "100%",
  thickness = 1,
  color = "var(--foreground)",
  opacity = 0.15,
  withArrow = false,
  arrowPosition = "end",
  delay = 0,
  className,
}: DecorativeLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const isHorizontal = orientation === "horizontal";

  const lineTransition: Transition = {
    duration: 0.8,
    ease: customEase,
    delay,
  };

  const arrowTransition: Transition = {
    duration: 0.3,
    ease: customEase,
    delay: delay + 0.6,
  };

  const ArrowSVG = ({ direction }: { direction: "up" | "down" | "left" | "right" }) => {
    const rotations = {
      up: -90,
      down: 90,
      left: 180,
      right: 0,
    };

    return (
      <motion.svg
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={arrowTransition}
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        style={{ 
          transform: `rotate(${rotations[direction]}deg)`,
          opacity 
        }}
      >
        <path
          d="M0 4H7M7 4L4 1M7 4L4 7"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    );
  };

  if (isHorizontal) {
    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        style={{ width: length }}
      >
        {withArrow && (arrowPosition === "start" || arrowPosition === "both") && (
          <ArrowSVG direction="left" />
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={lineTransition}
          className="flex-1"
          style={{
            height: thickness,
            backgroundColor: color,
            opacity,
            originX: arrowPosition === "end" ? 0 : arrowPosition === "start" ? 1 : 0.5,
          }}
        />
        {withArrow && (arrowPosition === "end" || arrowPosition === "both") && (
          <ArrowSVG direction="right" />
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-center", className)}
      style={{ height: length }}
    >
      {withArrow && (arrowPosition === "start" || arrowPosition === "both") && (
        <ArrowSVG direction="up" />
      )}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={lineTransition}
        className="flex-1"
        style={{
          width: thickness,
          backgroundColor: color,
          opacity,
          originY: arrowPosition === "end" ? 0 : arrowPosition === "start" ? 1 : 0.5,
        }}
      />
      {withArrow && (arrowPosition === "end" || arrowPosition === "both") && (
        <ArrowSVG direction="down" />
      )}
    </div>
  );
}

// Decorative corner element
interface DecorativeCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  color?: string;
  opacity?: number;
  delay?: number;
  className?: string;
}

export function DecorativeCorner({
  position,
  size = 60,
  color = "var(--foreground)",
  opacity = 0.15,
  delay = 0,
  className,
}: DecorativeCornerProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const getPath = () => {
    switch (position) {
      case "top-left":
        return `M ${size} 0 L 0 0 L 0 ${size}`;
      case "top-right":
        return `M 0 0 L ${size} 0 L ${size} ${size}`;
      case "bottom-left":
        return `M 0 0 L 0 ${size} L ${size} ${size}`;
      case "bottom-right":
        return `M 0 ${size} L ${size} ${size} L ${size} 0`;
    }
  };

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
    >
      <motion.path
        d={getPath()}
        stroke={color}
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity } : { pathLength: 0, opacity: 0 }}
        transition={{
          pathLength: { duration: 0.8, ease: customEase, delay },
          opacity: { duration: 0.3, delay },
        }}
      />
    </svg>
  );
}

// Decorative cross/plus element
interface DecorativeCrossProps {
  size?: number;
  color?: string;
  opacity?: number;
  delay?: number;
  className?: string;
}

export function DecorativeCross({
  size = 20,
  color = "var(--foreground)",
  opacity = 0.15,
  delay = 0,
  className,
}: DecorativeCrossProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
      initial={{ scaleX: 0, scaleY: 0 }}
      animate={isInView ? { scaleX: 1, scaleY: 1 } : { scaleX: 0, scaleY: 0 }}
      transition={{
        duration: 0.4,
        ease: customEase,
        delay,
      }}
    >
      <line
        x1={size / 2}
        y1="0"
        x2={size / 2}
        y2={size}
        stroke={color}
        strokeWidth="1"
        opacity={opacity}
      />
      <line
        x1="0"
        y1={size / 2}
        x2={size}
        y2={size / 2}
        stroke={color}
        strokeWidth="1"
        opacity={opacity}
      />
    </motion.svg>
  );
}

// Decorative divider with label
interface SectionDividerProps {
  label?: string;
  className?: string;
}

export function SectionDivider({ label, className }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={cn("flex items-center gap-4", className)}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: customEase }}
        className="flex-1 h-px bg-[var(--border-strong)] origin-left"
      />
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-overline text-[var(--foreground-muted)]"
        >
          {label}
        </motion.span>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: customEase, delay: 0.1 }}
        className="flex-1 h-px bg-[var(--border-strong)] origin-right"
      />
    </div>
  );
}
