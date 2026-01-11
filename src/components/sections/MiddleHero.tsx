"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DecorativeCorner, DecorativeLine } from "@/components/ui/DecorativeLine";

export function MiddleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const lineVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: i * 0.15,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Image
          src="/images/bed2.jpg"
          alt="Interior Design"
          fill
          className="object-cover scale-110"
          quality={90}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-16 left-8 md:left-16">
          <DecorativeCorner position="top-left" size={50} color="white" opacity={0.2} delay={0.5} />
        </div>
        <div className="absolute top-16 right-8 md:right-16">
          <DecorativeCorner position="top-right" size={50} color="white" opacity={0.2} delay={0.6} />
        </div>
        <div className="absolute bottom-16 left-8 md:left-16">
          <DecorativeCorner position="bottom-left" size={50} color="white" opacity={0.2} delay={0.7} />
        </div>
        <div className="absolute bottom-16 right-8 md:right-16">
          <DecorativeCorner position="bottom-right" size={50} color="white" opacity={0.2} delay={0.8} />
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="container-main relative z-20"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-white/50" />
            <span className="text-overline text-white/70 tracking-[0.2em]">
              TRANSFORM YOUR SPACE
            </span>
            <div className="w-8 h-px bg-white/50" />
          </motion.div>

          {/* Split Text Headline */}
          <div ref={textRef} className="mb-10">
            <div className="overflow-hidden">
              <motion.h2
                custom={0}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-display text-white"
              >
                It&apos;s so Easy to
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-display text-white/70 italic"
              >
                Change the Mood
              </motion.h2>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-body-lg text-white/70 max-w-xl mx-auto mb-10"
          >
            Ready to transform your space into something extraordinary? 
            Let&apos;s create something beautiful together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Start Your Project
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                View Our Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="container-main py-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light text-white">50+</span>
              <span className="text-caption">Projects Completed</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light text-white">10+</span>
              <span className="text-caption">Years Experience</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light text-white">45+</span>
              <span className="text-caption">Happy Clients</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
