"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Sofa, MapPin, MessageSquare, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useQuoteModal } from "@/context/QuoteModalContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Sofa,
  MapPin,
  MessageSquare,
};

// HQ Stock images for each service - Unsplash interior design images
const serviceImages: Record<string, string> = {
  "architecture": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "interior-design": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  "space-planning": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  "consultation": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
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
  const imageUrl = serviceImages[service.id] || serviceImages["interior-design"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      <div className="relative h-full rounded-2xl bg-[var(--surface)] overflow-hidden transition-all duration-300 group-hover:shadow-xl">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Service Number Badge */}
          <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <span className="text-white font-medium">0{index + 1}</span>
          </div>
          
          {/* Icon Badge */}
          <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
            {Icon && <Icon className="w-6 h-6 text-[var(--accent-foreground)]" />}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-medium text-[var(--foreground)] mb-3">
            {service.title}
          </h3>
          <p className="text-body text-[var(--foreground-secondary)] leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Learn More Link */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-caption font-medium text-[var(--foreground-muted)] group-hover:text-[var(--accent)] transition-colors"
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
  const { openModal } = useQuoteModal();

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
              <button
                onClick={openModal}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)] hover:border-[var(--border-strong)] transition-all group"
              >
                <span className="font-medium">Get a Quote</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
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
          className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl liquid-glass"
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[var(--accent)] animate-pulse" />
            <p className="text-body text-[var(--foreground-secondary)]">
              Custom solutions for every project, from concept to completion
            </p>
          </div>
          <button
            onClick={openModal}
            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-medium hover:opacity-90 transition-opacity"
          >
            Start Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}
