"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Tag } from "lucide-react";
import { Project, projects } from "@/content/projects";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { CTA } from "@/components/sections/CTA";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 pb-16">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
              <h1 className="text-display text-[var(--foreground)]">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-headline text-[var(--foreground)] mb-6">
                  About This Project
                </h2>
                <p className="text-body-lg text-[var(--foreground-secondary)] leading-relaxed">
                  {project.description ||
                    `This ${project.category.toLowerCase()} project in ${project.location} showcases our commitment to creating spaces that blend functionality with aesthetic excellence. Every detail has been carefully considered to deliver a result that exceeds expectations.`}
                </p>
              </motion.div>

              {/* Gallery */}
              {project.images && project.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-12"
                >
                  <h3 className="text-title text-[var(--foreground)] mb-6">
                    Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GlassPanel className="p-8 sticky top-28">
                  <h3 className="text-lg font-medium text-[var(--foreground)] mb-6">
                    Project Details
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-[var(--surface)]">
                        <MapPin className="w-5 h-5 text-[var(--foreground-secondary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--foreground-muted)]">Location</p>
                        <p className="text-[var(--foreground)]">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-[var(--surface)]">
                        <Calendar className="w-5 h-5 text-[var(--foreground-secondary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--foreground-muted)]">Completed</p>
                        <p className="text-[var(--foreground)]">{formatDate(project.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-[var(--surface)]">
                        <Tag className="w-5 h-5 text-[var(--foreground-secondary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--foreground-muted)]">Category</p>
                        <p className="text-[var(--foreground)]">{project.category}</p>
                      </div>
                    </div>
                  </div>

                  {project.services && project.services.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-[var(--border)]">
                      <p className="text-sm text-[var(--foreground-muted)] mb-3">
                        Services Provided
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1.5 text-sm bg-[var(--surface)] rounded-full text-[var(--foreground-secondary)]"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <Link href="/contact">
                      <Button className="w-full">
                        Start a Similar Project
                      </Button>
                    </Link>
                  </div>
                </GlassPanel>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="container-main">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-4"
              >
                <div className="p-3 rounded-full bg-[var(--surface)] group-hover:bg-[var(--surface-elevated)] transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-[var(--foreground-muted)]">Previous</p>
                  <p className="text-[var(--foreground)] font-medium group-hover:text-[var(--foreground-secondary)] transition-colors">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-4 text-right md:flex-row-reverse"
              >
                <div className="p-3 rounded-full bg-[var(--surface)] group-hover:bg-[var(--surface-elevated)] transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-[var(--foreground-muted)]">Next</p>
                  <p className="text-[var(--foreground)] font-medium group-hover:text-[var(--foreground-secondary)] transition-colors">
                    {nextProject.title}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
