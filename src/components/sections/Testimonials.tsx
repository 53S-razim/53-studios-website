"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function Testimonials() {
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
            What Clients Say
          </p>
          <h2 className="text-headline text-[var(--foreground)]">
            Testimonials
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassPanel className="p-8 h-full flex flex-col">
                <Quote className="w-10 h-10 text-[var(--foreground-muted)] mb-6" />
                <p className="text-[var(--foreground)] leading-relaxed flex-grow">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[var(--border)]">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-[var(--foreground)]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
