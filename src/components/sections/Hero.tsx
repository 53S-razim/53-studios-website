"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroText } from "@/components/ui/SplitText";
import { DecorativeLine, DecorativeCorner } from "@/components/ui/DecorativeLine";
import { useQuoteModal } from "@/context/QuoteModalContext";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useQuoteModal();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const services = [
    "Tech Specifications",
    "Design Project",
    "3D Visualization",
    "Interior Design",
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Image
          src="/images/liv3.jpg"
          alt="Luxury Interior Design"
          fill
          className="object-cover scale-110"
          priority
          quality={90}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/90 via-[var(--background)]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/30" />
        <div className="absolute inset-0 bg-[var(--background)]/20" />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Corner decorations */}
        <div className="absolute top-24 left-8 md:left-12">
          <DecorativeCorner position="top-left" size={40} delay={1} />
        </div>
        <div className="absolute top-24 right-8 md:right-12">
          <DecorativeCorner position="top-right" size={40} delay={1.1} />
        </div>
        <div className="absolute bottom-24 left-8 md:left-12">
          <DecorativeCorner position="bottom-left" size={40} delay={1.2} />
        </div>
        <div className="absolute bottom-24 right-8 md:right-12">
          <DecorativeCorner position="bottom-right" size={40} delay={1.3} />
        </div>

        {/* Vertical lines */}
        <div className="hidden md:block absolute top-32 left-[15%]">
          <DecorativeLine
            orientation="vertical"
            length={120}
            withArrow
            arrowPosition="end"
            delay={1.4}
          />
        </div>
        <div className="hidden md:block absolute bottom-32 right-[15%]">
          <DecorativeLine
            orientation="vertical"
            length={120}
            withArrow
            arrowPosition="start"
            delay={1.5}
          />
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 h-full flex flex-col"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Top Badge Area */}
        <div className="container-main pt-32 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--foreground)]" />
            <span className="text-overline text-[var(--foreground-secondary)] tracking-[0.2em]">
              Since 2014
            </span>
          </motion.div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex items-center">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Main Headline */}
              <div className="lg:col-span-7">
                <HeroText
                  line1="Designing Spaces,"
                  line2="Crafting Experiences"
                  className="mb-8"
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-body-lg text-[var(--foreground-secondary)] max-w-md mb-8"
                >
                  We transform your vision into beautifully crafted spaces that
                  blend functionality with timeless aesthetics.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button
                    size="lg"
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                    onClick={openModal}
                  >
                    Get Free Quote
                  </Button>
                  <Link href="/projects">
                    <Button variant="outline" size="lg">
                      View Projects
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Right: Services List */}
              <div className="lg:col-span-5 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="relative"
                >
                  {/* Decorative line above services */}
                  <div className="absolute -top-4 left-0 right-0">
                    <DecorativeLine
                      orientation="horizontal"
                      length="100%"
                      delay={1.3}
                    />
                  </div>

                  <div className="pt-8">
                    <p className="text-overline text-[var(--foreground-muted)] tracking-[0.15em] mb-6">
                      WHAT WE DO
                    </p>
                    <ul className="space-y-4">
                      {services.map((service, index) => (
                        <motion.li
                          key={service}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 1.4 + index * 0.1,
                          }}
                          className="flex items-center gap-3 group cursor-default"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground-muted)] group-hover:bg-[var(--foreground)] transition-colors" />
                          <span className="text-body text-[var(--foreground-secondary)] group-hover:text-[var(--foreground)] transition-colors">
                            {service}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="container-main pb-8 md:pb-12">
          <div className="flex items-end justify-between">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="hidden md:block"
            >
              <p className="text-caption text-[var(--foreground-muted)]">
                Based in Chennai, India
              </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-caption text-[var(--foreground-muted)]">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-4 h-4 text-[var(--foreground-muted)]" />
              </motion.div>
            </motion.div>

            {/* Awards/Recognition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="hidden md:flex items-center gap-4"
            >
              <div className="text-right">
                <p className="text-caption text-[var(--foreground-muted)]">
                  50+ Projects
                </p>
                <p className="text-caption text-[var(--foreground-muted)]">
                  Delivered
                </p>
              </div>
              <div className="w-px h-8 bg-[var(--border)]" />
              <div className="text-right">
                <p className="text-caption text-[var(--foreground-muted)]">
                  10+ Years
                </p>
                <p className="text-caption text-[var(--foreground-muted)]">
                  Experience
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
