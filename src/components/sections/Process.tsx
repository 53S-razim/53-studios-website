"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { processSteps } from "@/content/services";
import { DisplayHeader } from "@/components/ui/SectionHeader";
import { DecorativeLine } from "@/components/ui/DecorativeLine";

function ProcessStep({ 
  step, 
  index 
}: { 
  step: typeof processSteps[0]; 
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group"
    >
      {/* Step Card */}
      <div className="relative p-6 md:p-8 h-full border border-[var(--border)] rounded-2xl bg-[var(--surface)]/50 backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--border-strong)] group-hover:bg-[var(--surface)]">
        {/* Step Number */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl md:text-5xl font-light text-[var(--foreground-muted)] tracking-tight">
            {step.number}
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            className="flex-1 h-px bg-[var(--border)] origin-left"
          />
        </div>

        {/* Content */}
        <h3 className="text-xl font-medium text-[var(--foreground)] mb-3">
          {step.title}
        </h3>
        <p className="text-body text-[var(--foreground-secondary)] leading-relaxed">
          {step.description}
        </p>

        {/* Decorative corner */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-4 h-4 border-r border-b border-[var(--foreground-muted)]" />
        </div>
      </div>
    </motion.div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Only show first 4 steps in main grid
  const mainSteps = processSteps.slice(0, 4);
  const additionalSteps = processSteps.slice(4);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/liv2.jpg"
          alt="Interior Design Process"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--background)]/95" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container-main relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-6">
            <DisplayHeader
              label="HOW WE WORK"
              title="The Process:"
              highlight="*"
            />
          </div>
          
          <div className="lg:col-span-6 flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-body-lg text-[var(--foreground-secondary)] max-w-md"
            >
              Our work involves many intricate steps and stages to ensure 
              exceptional results for every project.
            </motion.p>
          </div>
        </div>

        {/* Main Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainSteps.map((step, index) => (
            <ProcessStep key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Additional Steps */}
        {additionalSteps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:px-16">
            {additionalSteps.map((step, index) => (
              <ProcessStep key={step.id} step={step} index={index + 4} />
            ))}
          </div>
        )}

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex items-start gap-4"
        >
          <span className="text-2xl text-[var(--foreground-muted)]">*</span>
          <p className="text-caption text-[var(--foreground-muted)] max-w-lg">
            Each project is unique, and our process adapts to meet your specific 
            needs and timeline. We maintain open communication throughout every 
            phase to ensure your vision is realized.
          </p>
        </motion.div>

        {/* Bottom Decorative Line */}
        <div className="mt-16 flex justify-center">
          <DecorativeLine
            orientation="horizontal"
            length={150}
            delay={0.8}
          />
        </div>
      </div>
    </section>
  );
}
