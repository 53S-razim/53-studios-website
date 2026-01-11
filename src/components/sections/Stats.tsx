"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats } from "@/content/stats";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DecorativeLine } from "@/components/ui/DecorativeLine";

function AnimatedNumber({ 
  value, 
  suffix,
  duration = 2000 
}: { 
  value: number; 
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

// Round stat card variant
function RoundStatCard({ 
  stat, 
  index 
}: { 
  stat: typeof stats[0]; 
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="aspect-square rounded-full bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:border-[var(--border-strong)] group-hover:shadow-lg">
        {/* Number */}
        <div className="text-4xl md:text-5xl lg:text-6xl font-light text-[var(--foreground)] mb-2 tracking-tight">
          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
        </div>
        
        {/* Label */}
        <p className="text-caption text-[var(--foreground-secondary)] text-center leading-tight">
          {stat.label}
        </p>
      </div>
      
      {/* Decorative dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--foreground)] opacity-20"
      />
    </motion.div>
  );
}

// Square stat card variant
function SquareStatCard({ 
  stat, 
  index 
}: { 
  stat: typeof stats[0]; 
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="glass rounded-2xl p-8 h-full flex flex-col justify-between transition-all duration-300 group-hover:shadow-lg">
        {/* Top: Description */}
        <p className="text-caption text-[var(--foreground-muted)] mb-6">
          {stat.description}
        </p>
        
        {/* Middle: Number */}
        <div className="text-5xl md:text-6xl lg:text-7xl font-light text-[var(--foreground)] tracking-tight mb-4">
          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
        </div>
        
        {/* Bottom: Label with line */}
        <div className="pt-4 border-t border-[var(--border)]">
          <p className="text-body font-medium text-[var(--foreground)]">
            {stat.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="py-24 md:py-32 bg-[var(--background-secondary)] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-[var(--border)] opacity-50" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-[var(--border)] opacity-50" />
      </div>

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-5">
            <SectionHeader
              label="WHAT WE'RE PROUD OF"
              title="Our Numbers"
              description="A decade of crafting exceptional spaces and building lasting relationships with our clients."
            />
          </div>
          
          <div className="lg:col-span-7 hidden lg:flex items-end justify-end">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-right"
            >
              <p className="text-body text-[var(--foreground-secondary)] max-w-sm">
                Every project is a testament to our commitment to excellence and 
                attention to detail.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid - Mixed layout like Housemood */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            index % 2 === 0 ? (
              <RoundStatCard key={stat.id} stat={stat} index={index} />
            ) : (
              <SquareStatCard key={stat.id} stat={stat} index={index} />
            )
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex justify-center">
          <DecorativeLine
            orientation="horizontal"
            length={200}
            withArrow
            arrowPosition="both"
            delay={0.8}
          />
        </div>
      </div>
    </section>
  );
}
