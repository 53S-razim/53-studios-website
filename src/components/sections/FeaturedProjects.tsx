"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function FeaturedProjects() {
  return (
    <section className="py-24">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <p className="text-overline text-[var(--foreground-muted)] mb-4">
              What We&apos;re Proud Of
            </p>
            <h2 className="text-headline text-[var(--foreground)]">
              Our Projects
            </h2>
          </div>
          <Link href="/projects" className="mt-6 md:mt-0">
            <Button variant="ghost" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              View All Projects
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--foreground-muted)] mb-2">
                      {formatDate(project.date)} · {project.location}
                    </p>
                    <h3 className="text-title text-[var(--foreground)] group-hover:text-[var(--foreground-secondary)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[var(--foreground-secondary)] mt-1">
                      {project.category}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
