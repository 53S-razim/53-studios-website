"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Sofa, MapPin, MessageSquare, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/content/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DecorativeLine } from "@/components/ui/DecorativeLine";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Sofa,
  MapPin,
  MessageSquare,
};

function ServiceCard({ 
  service, 
  index 
}: { 
  service: typeof services[0]; 
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = iconMap[service.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      <div className="relative p-8 h-full border border-[var(--border)] rounded-2xl bg-[var(--surface)]/50 backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--border-strong)] group-hover:bg-[var(--surface)] group-hover:shadow-lg overflow-hidden">
        {/* Service Number */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          className="absolute top-4 right-4 text-6xl font-light text-[var(--foreground)] pointer-events-none"
        >
          0{index + 1}
        </motion.span>

        {/* Icon */}
        <div className="relative z-10 w-14 h-14 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
          {Icon && <Icon className="w-7 h-7 text-[var(--accent-foreground)]" />}
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-medium text-[var(--foreground)] mb-3 group-hover:text-[var(--foreground)] transition-colors">
            {service.title}
          </h3>
          <p className="text-body text-[var(--foreground-secondary)] leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Learn More Link */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-caption font-medium text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors"
          >
            <span>Learn More</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </motion.div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[var(--background-secondary)]">
      <div className="container-main">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-6">
            <SectionHeader
              label="WHAT WE OFFER"
              title="Our Services"
              description="Comprehensive design solutions tailored to transform your vision into reality."
            />
          </div>
          
          <div className="lg:col-span-6 flex items-end justify-end">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)] transition-all group"
              >
                <span className="font-medium">Get a Quote</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[var(--accent)]" />
            <p className="text-body text-[var(--foreground-secondary)]">
              Custom solutions for every project, from concept to completion
            </p>
          </div>
          <DecorativeLine
            orientation="horizontal"
            length={100}
            withArrow
            arrowPosition="end"
            delay={0.7}
            className="hidden md:flex"
          />
        </motion.div>
      </div>
    </section>
  );
}
