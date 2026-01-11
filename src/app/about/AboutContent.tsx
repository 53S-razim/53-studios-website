"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Team } from "@/components/sections/Team";
import { CTA } from "@/components/sections/CTA";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Target, Heart, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every detail matters. We approach each project with meticulous attention to ensure exceptional results.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We love what we do. Our passion for design drives us to create spaces that inspire and delight.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We blend traditional craftsmanship with modern techniques to deliver forward-thinking solutions.",
  },
];

export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-overline text-[var(--foreground-muted)] mb-4">
                About Us
              </p>
              <h1 className="text-display text-[var(--foreground)] mb-8">
                Our Story
              </h1>
              <div className="space-y-6 text-body-lg text-[var(--foreground-secondary)]">
                <p>
                  Founded with a clear vision: to create spaces that foster
                  connection, inspire creativity, and enhance the human
                  experience. We believe that thoughtful design has the power to
                  transform not just physical spaces, but the way people live,
                  work, and interact.
                </p>
                <p>
                  Our approach combines technical expertise with artistic
                  sensibility, resulting in designs that are both functional and
                  beautiful. Every project we undertake is a collaboration, where
                  your vision meets our expertise to create something truly
                  exceptional.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/53 logo.JPG"
                  alt="53 Studios"
                  fill
                  className="object-cover"
                />
              </div>
              <GlassPanel className="absolute -bottom-8 -left-8 p-6 max-w-xs">
                <p className="text-2xl font-light text-[var(--foreground)]">
                  Since 2021
                </p>
                <p className="text-[var(--foreground-secondary)] mt-1">
                  Crafting exceptional spaces
                </p>
              </GlassPanel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              What Drives Us
            </p>
            <h2 className="text-headline text-[var(--foreground)]">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassPanel className="p-8 h-full text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--accent)] flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-[var(--accent-foreground)]" />
                  </div>
                  <h3 className="text-xl font-medium text-[var(--foreground)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[var(--foreground-secondary)] leading-relaxed">
                    {value.description}
                  </p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/liv1.jpg"
                  alt="Interior Design"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <p className="text-overline text-[var(--foreground-muted)] mb-4">
                Our Philosophy
              </p>
              <h2 className="text-headline text-[var(--foreground)] mb-6">
                Design That Endures
              </h2>
              <div className="space-y-4 text-[var(--foreground-secondary)]">
                <p>
                  We believe that great design should stand the test of time.
                  Rather than chasing trends, we focus on creating spaces that
                  feel timeless and authentic to their occupants.
                </p>
                <p>
                  Our process is collaborative and transparent. We listen
                  carefully to understand your needs, lifestyle, and aspirations,
                  then translate these insights into spaces that truly feel like
                  home.
                </p>
                <p>
                  From concept to completion, we guide you through every step,
                  ensuring the final result exceeds your expectations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Team />
      <CTA />
    </>
  );
}
