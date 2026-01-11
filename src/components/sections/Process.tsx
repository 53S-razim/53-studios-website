"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { processSteps } from "@/content/services";
import { SectionHeader } from "@/components/ui/SectionHeader";

// HQ Stock images for process steps - Unsplash architecture/design images
const processImages: Record<string, string> = {
  "01": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", // Discovery - Meeting/Planning
  "02": "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=800&q=80", // Concept - Sketching/Design
  "03": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", // Design - 3D Rendering
  "04": "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80", // Development - Construction
  "05": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", // Execution - Interior
  "06": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", // Handover - Final Result
};

function ProcessStep({ 
  step, 
  index 
}: { 
  step: typeof processSteps[0]; 
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const imageUrl = processImages[step.number] || processImages["01"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group"
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-[var(--surface)]">
        {/* Image Section */}
        <div className="relative h-40 overflow-hidden">
          <Image
            src={imageUrl}
            alt={step.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
          
          {/* Step Number Badge */}
          <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center">
            <span className="text-lg font-medium text-[var(--accent-foreground)]">{step.number}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 pt-4">
          <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Hover Effect Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left opacity-0 group-hover:opacity-100 transition-opacity"
        />
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
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[var(--background)]">
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      </div>

      <div className="container-main relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <div>
            <SectionHeader
              label="HOW WE WORK"
              title="Our Design Process"
              description="A systematic approach to transforming your vision into reality."
            />
          </div>
          
          <div className="flex items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="liquid-glass p-6 rounded-2xl max-w-md"
            >
              <p className="text-body text-[var(--foreground-secondary)]">
                Every project is unique. Our process adapts to meet your specific 
                needs while maintaining exceptional quality at every stage.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mainSteps.map((step, index) => (
            <ProcessStep key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Additional Steps */}
        {additionalSteps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {additionalSteps.map((step, index) => (
              <ProcessStep key={step.id} step={step} index={index + 4} />
            ))}
          </div>
        )}

        {/* Timeline Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-4"
        >
          {processSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
                <span className="text-sm font-medium text-[var(--foreground-muted)]">{step.number}</span>
              </div>
              {index < processSteps.length - 1 && (
                <div className="w-8 md:w-12 h-px bg-[var(--border)]" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
