"use client";

import { motion } from "framer-motion";
import { Building2, Sofa, MapPin, MessageSquare } from "lucide-react";
import { services } from "@/content/services";
import { GlassPanel } from "@/components/ui/GlassPanel";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Sofa,
  MapPin,
  MessageSquare,
};

export function Services() {
  return (
    <section className="py-24 bg-[var(--background-secondary)]">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-overline text-[var(--foreground-muted)] mb-4">
            What We Offer
          </p>
          <h2 className="text-headline text-[var(--foreground)]">
            Our Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassPanel
                  hover
                  className="p-8 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-6">
                    {Icon && <Icon className="w-7 h-7 text-[var(--accent-foreground)]" />}
                  </div>
                  <h3 className="text-xl font-medium text-[var(--foreground)] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[var(--foreground-secondary)] leading-relaxed">
                    {service.description}
                  </p>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
