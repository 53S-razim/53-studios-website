"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/content/services";

export function Process() {
  return (
    <section className="py-24">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-overline text-[var(--foreground-muted)] mb-4">
            How We Do It
          </p>
          <h2 className="text-headline text-[var(--foreground)]">
            The Process
          </h2>
          <p className="text-body-lg text-[var(--foreground-secondary)] mt-4 max-w-2xl mx-auto">
            Our work involves many intricate steps and stages to ensure
            exceptional results.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-[var(--border)]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {processSteps.slice(0, 4).map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center justify-center text-sm font-medium mb-6 mx-auto lg:mx-0">
                  {step.number}
                </div>
                
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-medium text-[var(--foreground)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--foreground-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 mt-12 lg:mt-16 lg:px-16">
            {processSteps.slice(4).map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] flex items-center justify-center text-sm font-medium mb-6 mx-auto lg:mx-0">
                  {step.number}
                </div>
                
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-medium text-[var(--foreground)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--foreground-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
