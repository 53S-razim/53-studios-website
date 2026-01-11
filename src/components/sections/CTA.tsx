"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function CTA() {
  return (
    <section className="py-24">
      <div className="container-main">
        <GlassPanel className="p-12 md:p-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-overline text-[var(--foreground-muted)] mb-4">
              Ready to Start?
            </p>
            <h2 className="text-headline text-[var(--foreground)] mb-6">
              Let&apos;s Create Something Beautiful
            </h2>
            <p className="text-body-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto mb-10">
              Whether it&apos;s your home, office, or a commercial project, we are
              always dedicated to bringing your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                  Get a Quote
                </Button>
              </Link>
              <a
                href="https://wa.me/917395853673"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" icon={<MessageCircle className="w-5 h-5" />}>
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </GlassPanel>
      </div>
    </section>
  );
}
