"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DecorativeLine } from "@/components/ui/DecorativeLine";

function TestimonialCard({ 
  testimonial, 
  index 
}: { 
  testimonial: typeof testimonials[0]; 
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group"
    >
      <div className="glass rounded-3xl p-8 md:p-10 h-full flex flex-col transition-all duration-300 group-hover:shadow-lg">
        {/* Quote Icon */}
        <div className="mb-6">
          <Quote className="w-10 h-10 text-[var(--foreground-muted)] opacity-30" />
        </div>

        {/* Quote Text */}
        <blockquote className="text-xl md:text-2xl font-light text-[var(--foreground)] leading-relaxed mb-8 flex-grow">
          &ldquo;{testimonial.content}&rdquo;
        </blockquote>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--border)] mb-6" />

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <p className="font-medium text-[var(--foreground)]">
              {testimonial.name}
            </p>
            <p className="text-caption text-[var(--foreground-secondary)]">
              {testimonial.role}
            </p>
          </div>
          
          {/* Stars */}
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-4 h-4 fill-[var(--foreground)] text-[var(--foreground)]" 
              />
            ))}
          </div>
        </div>

        {/* Project Reference */}
        {testimonial.project && (
          <p className="mt-4 text-caption text-[var(--foreground-muted)]">
            Project: {testimonial.project}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// Carousel version for featured display
function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="glass rounded-3xl p-8 md:p-12 lg:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Large Quote */}
            <div className="flex justify-center mb-8">
              <Quote className="w-16 h-16 text-[var(--foreground-muted)] opacity-20" />
            </div>

            {/* Quote Text */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-[var(--foreground)] leading-relaxed text-center max-w-4xl mx-auto mb-12">
              &ldquo;{testimonial.content}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-[var(--border)] mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-lg font-medium text-[var(--foreground)]">
                {testimonial.name}
              </p>
              <p className="text-body text-[var(--foreground-secondary)]">
                {testimonial.role}
              </p>
              {testimonial.project && (
                <p className="mt-2 text-caption text-[var(--foreground-muted)]">
                  {testimonial.project}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current 
                  ? "w-8 bg-[var(--foreground)]" 
                  : "bg-[var(--border-strong)] hover:bg-[var(--foreground-muted)]"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[var(--background)]">
      <div className="container-main">
        {/* Header */}
        <SectionHeader
          label="CLIENT STORIES"
          title="What Our Clients Say"
          description="Real experiences from homeowners and businesses who trusted us with their spaces."
          align="center"
        />

        {/* Carousel for featured display */}
        <div className="mb-16">
          <TestimonialCarousel />
        </div>

        {/* Grid of all testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <DecorativeLine orientation="horizontal" length={60} delay={0.4} />
            <span className="text-overline text-[var(--foreground-muted)]">
              ALL REVIEWS
            </span>
            <DecorativeLine orientation="horizontal" length={60} delay={0.5} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
