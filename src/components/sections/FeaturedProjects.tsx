"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DecorativeLine } from "@/components/ui/DecorativeLine";

function ProjectCard({ 
  project, 
  index,
  size = "default"
}: { 
  project: typeof featuredProjects[0]; 
  index: number;
  size?: "default" | "large";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const isLarge = size === "large";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={isLarge ? "lg:col-span-2 lg:row-span-2" : ""}
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl bg-[var(--surface)]">
          {/* Image Container */}
          <div className={`relative overflow-hidden ${isLarge ? "h-[500px] lg:h-full" : "h-[300px] md:h-[350px]"}`}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 text-xs font-medium text-white/90 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                {project.category}
              </span>
            </div>

            {/* Arrow Icon */}
            <div className="absolute top-4 right-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
              >
                <ArrowUpRight className="w-5 h-5 text-white" />
              </motion.div>
            </div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {/* Location & Date */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-white/70 uppercase tracking-wider">
                    {project.location}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span className="text-xs text-white/70">
                    {new Date(project.date).getFullYear()}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className={`font-medium text-white group-hover:text-white/90 transition-colors ${isLarge ? "text-2xl md:text-3xl" : "text-xl"}`}>
                  {project.title}
                </h3>

                {/* Description (only for large cards) */}
                {isLarge && project.description && (
                  <p className="mt-3 text-sm text-white/70 line-clamp-2 max-w-md">
                    {project.description}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[var(--background)]">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <SectionHeader
            label="SELECTED WORKS"
            title="Featured Projects"
            description="A curated selection of our most impactful architectural and interior design projects."
          />
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-body font-medium text-[var(--foreground)] hover:text-[var(--foreground-secondary)] transition-colors group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.slice(0, 4).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              size={index === 0 ? "large" : "default"}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-col items-center"
        >
          <DecorativeLine
            orientation="horizontal"
            length={100}
            withArrow
            arrowPosition="end"
            delay={0.6}
          />
          <p className="mt-6 text-center text-body text-[var(--foreground-secondary)]">
            Explore our complete portfolio of{" "}
            <Link 
              href="/projects" 
              className="text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--foreground-secondary)] transition-colors"
            >
              50+ projects
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
