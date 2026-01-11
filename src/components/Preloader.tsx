"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Accelerate progress as it gets closer to 100
        const increment = prev < 70 ? 2 : prev < 90 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    // Complete loading after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 2800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1
            }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)]"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2
              }
            }}
            exit={{ 
              opacity: 0,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            className="relative w-32 h-20 mb-8"
          >
            <Image
              src="/images/53 logo front.JPG"
              alt="53 Studios"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6, 
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.6
              }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            className="text-center mb-12"
          >
            <p className="text-overline text-[var(--foreground-muted)] tracking-[0.2em]">
              Architecture & Interior Design
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ 
              opacity: 1, 
              width: 200,
              transition: { 
                duration: 0.4, 
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.8
              }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            className="relative h-[2px] bg-[var(--border)] overflow-hidden rounded-full"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: progress / 100,
                transition: { 
                  duration: 0.1,
                  ease: "linear"
                }
              }}
              className="absolute inset-0 bg-[var(--foreground)] origin-left"
            />
          </motion.div>

          {/* Progress Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { 
                duration: 0.4, 
                delay: 1
              }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            className="mt-4 text-caption text-[var(--foreground-muted)] font-medium tabular-nums"
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Decorative Lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.1,
              transition: { duration: 0.6, delay: 0.4 }
            }}
            exit={{ opacity: 0 }}
            className="absolute top-1/4 left-12 w-px h-32 bg-[var(--foreground)]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.1,
              transition: { duration: 0.6, delay: 0.5 }
            }}
            exit={{ opacity: 0 }}
            className="absolute bottom-1/4 right-12 w-px h-32 bg-[var(--foreground)]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.1,
              transition: { duration: 0.6, delay: 0.6 }
            }}
            exit={{ opacity: 0 }}
            className="absolute top-12 right-1/4 w-32 h-px bg-[var(--foreground)]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.1,
              transition: { duration: 0.6, delay: 0.7 }
            }}
            exit={{ opacity: 0 }}
            className="absolute bottom-12 left-1/4 w-32 h-px bg-[var(--foreground)]"
          />

          {/* Year Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 0.6, delay: 1.2 }
            }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-8 text-caption text-[var(--foreground-muted)]"
          >
            Since 2014
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 0.6, delay: 1.3 }
            }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 right-8 text-caption text-[var(--foreground-muted)]"
          >
            Chennai, India
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
