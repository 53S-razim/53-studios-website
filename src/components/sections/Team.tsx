"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { team } from "@/content/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DecorativeLine, DecorativeCorner } from "@/components/ui/DecorativeLine";

function TeamMemberCard({ 
  member, 
  index,
  featured = false 
}: { 
  member: typeof team[0]; 
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative group"
      >
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-overline text-white/60 tracking-[0.2em] mb-2">
                LEAD ARCHITECT
              </p>
              <h3 className="text-3xl md:text-4xl font-medium text-white mb-2">
                {member.name}
              </h3>
              <p className="text-white/70 mb-4">
                {member.role}
              </p>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group/link"
                >
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-6 left-6">
            <DecorativeCorner position="top-left" size={30} color="white" opacity={0.3} delay={0.5} />
          </div>
          <div className="absolute top-6 right-6">
            <DecorativeCorner position="top-right" size={30} color="white" opacity={0.3} delay={0.6} />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Email on hover */}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 py-3 px-4 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--foreground)] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
        )}
      </div>
      
      <h3 className="text-lg font-medium text-[var(--foreground)]">
        {member.name}
      </h3>
      <p className="text-caption text-[var(--foreground-secondary)]">
        {member.role}
      </p>
    </motion.div>
  );
}

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const featuredMember = team[0];
  const otherMembers = team.slice(1);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[var(--background-secondary)]">
      <div className="container-main">
        {/* Header with Slogan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Left: Large slogan */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="text-overline text-[var(--foreground-muted)] tracking-[0.15em] mb-6">
                WHO WE ARE
              </p>
              <h2 className="text-display text-[var(--foreground)] leading-[1.1]">
                The team works like{" "}
                <span className="italic text-[var(--foreground-secondary)]">
                  storytellers
                </span>
                , turning spaces into narratives you&apos;ll love living in.
              </h2>
            </motion.div>
          </div>

          {/* Right: Description */}
          <div className="lg:col-span-5 flex items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <DecorativeLine
                orientation="horizontal"
                length="100%"
                delay={0.4}
                className="mb-6"
              />
              <p className="text-body text-[var(--foreground-secondary)]">
                Our diverse team brings together expertise in architecture, 
                interior design, and project management to deliver exceptional 
                results for every client.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Featured Member - Large */}
          <div className="lg:col-span-5">
            <TeamMemberCard member={featuredMember} index={0} featured />
          </div>

          {/* Other Members - Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              {otherMembers.map((member, index) => (
                <TeamMemberCard 
                  key={member.id} 
                  member={member} 
                  index={index + 1} 
                />
              ))}
            </div>

            {/* Additional info box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-[var(--foreground)] mt-2" />
                <div>
                  <p className="text-body font-medium text-[var(--foreground)] mb-1">
                    Join Our Team
                  </p>
                  <p className="text-caption text-[var(--foreground-secondary)]">
                    We&apos;re always looking for talented individuals to join our 
                    growing team. Get in touch if you&apos;re passionate about design.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
