"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function IOSToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <div className="w-[72px] h-9 rounded-full bg-[var(--surface)] opacity-50" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-[72px] h-9 rounded-full p-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
      style={{
        background: isDark 
          ? "linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(50, 50, 50, 0.8))"
          : "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.8))",
        boxShadow: isDark
          ? "inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.4)"
          : "inset 0 1px 2px rgba(0, 0, 0, 0.08), 0 1px 0 rgba(255, 255, 255, 0.8), 0 4px 12px rgba(0, 0, 0, 0.1)",
        border: isDark 
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(0, 0, 0, 0.08)",
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Track Background Glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark
            ? "radial-gradient(circle at 75% 50%, rgba(99, 102, 241, 0.15), transparent 60%)"
            : "radial-gradient(circle at 25% 50%, rgba(251, 191, 36, 0.2), transparent 60%)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Icons Container */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
        <Sun 
          className="w-4 h-4 transition-all duration-300"
          style={{ 
            color: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(251, 191, 36, 0.9)",
            filter: isDark ? "none" : "drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))"
          }} 
        />
        <Moon 
          className="w-4 h-4 transition-all duration-300"
          style={{ 
            color: isDark ? "rgba(147, 197, 253, 0.9)" : "rgba(0, 0, 0, 0.2)",
            filter: isDark ? "drop-shadow(0 0 4px rgba(147, 197, 253, 0.5))" : "none"
          }} 
        />
      </div>

      {/* Sliding Knob */}
      <motion.div
        className="relative w-7 h-7 rounded-full"
        animate={{
          x: isDark ? 36 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        style={{
          background: isDark
            ? "linear-gradient(145deg, rgba(60, 60, 70, 1), rgba(40, 40, 50, 1))"
            : "linear-gradient(145deg, rgba(255, 255, 255, 1), rgba(245, 245, 245, 1))",
          boxShadow: isDark
            ? "0 2px 8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Knob Inner Highlight (Glass Effect) */}
        <div 
          className="absolute inset-[2px] rounded-full"
          style={{
            background: isDark
              ? "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%)"
              : "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, transparent 50%)",
          }}
        />
        
        {/* Knob Specular Highlight */}
        <div 
          className="absolute top-1 left-1 w-2 h-1 rounded-full"
          style={{
            background: isDark
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(255, 255, 255, 0.8)",
            filter: "blur(1px)",
          }}
        />
      </motion.div>
    </button>
  );
}
