"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { faqs } from "@/content/faq";
import { DecorativeLine } from "@/components/ui/DecorativeLine";

function FAQItem({ 
  faq, 
  index,
  isOpen,
  onToggle
}: { 
  faq: typeof faqs[0]; 
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-b border-[var(--border)]"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-start justify-between gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg md:text-xl font-medium text-[var(--foreground)] group-hover:text-[var(--foreground-secondary)] transition-colors pr-4">
          {faq.question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground-secondary)] group-hover:border-[var(--border-strong)] transition-colors">
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-body text-[var(--foreground-secondary)] leading-relaxed max-w-2xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[var(--background-secondary)]">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Large headline */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:sticky lg:top-32"
            >
              <p className="text-overline text-[var(--foreground-muted)] tracking-[0.15em] mb-6">
                QUESTIONS
              </p>
              <h2 className="text-display text-[var(--foreground)] mb-8">
                FAQ:
              </h2>
              
              <DecorativeLine
                orientation="horizontal"
                length={80}
                delay={0.3}
                className="mb-8"
              />

              <p className="text-body text-[var(--foreground-secondary)] mb-8">
                Can&apos;t find what you&apos;re looking for? We&apos;re here to help with any questions about our services.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)] transition-all group"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Ask your Question</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </Link>
            </motion.div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="lg:col-span-8">
            <div className="border-t border-[var(--border)]">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </div>

            {/* Additional CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-medium text-[var(--foreground)] mb-1">
                    Still have questions?
                  </p>
                  <p className="text-caption text-[var(--foreground-secondary)]">
                    Our team is ready to help you with your project.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="https://wa.me/917395853673"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-medium hover:bg-[#128C7E] transition-colors"
                  >
                    WhatsApp
                  </Link>
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
