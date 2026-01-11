"use client";

import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // macOS-style rounded rectangle buttons
    const variants = {
      primary:
        "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 shadow-sm hover:shadow-md",
      secondary:
        "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-elevated)] hover:border-[var(--border-strong)]",
      ghost:
        "bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)]",
      glass:
        "liquid-glass text-[var(--foreground)] hover:shadow-lg border-0",
      outline:
        "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)]",
    };

    // macOS-style sizing with rounded rectangles (not pills)
    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          icon && iconPosition === "left" && icon
        )}
        <span>{children}</span>
        {!loading && icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";
