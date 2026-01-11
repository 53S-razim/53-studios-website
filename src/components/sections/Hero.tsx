"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/liv3.jpg"
          alt="Luxury Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/95 via-[var(--background)]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container-main relative z-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-overline text-[var(--foreground-secondary)] mb-6"
          >
            Architecture & Interior Design Studio
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display text-[var(--foreground)] mb-8"
          >
            Designing Spaces,
            <br />
            <span className="text-[var(--foreground-secondary)]">
              Crafting Experiences
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-[var(--foreground-secondary)] mb-10 max-w-xl"
          >
            We transform your vision into beautifully crafted spaces that blend
            functionality with timeless aesthetics.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/contact">
              <Button size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                Get Free Quote
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="glass" size="lg">
                View Projects
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[var(--foreground-muted)] flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-[var(--foreground-muted)] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
