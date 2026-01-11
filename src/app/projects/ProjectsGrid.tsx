"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { formatDate } from "@/lib/utils";

export function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <Link href={`/projects/${project.slug}`} className="group block">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--foreground-muted)] mb-2">
                  {formatDate(project.date)} · {project.location}
                </p>
                <h2 className="text-title text-[var(--foreground)] group-hover:text-[var(--foreground-secondary)] transition-colors">
                  {project.title}
                </h2>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
