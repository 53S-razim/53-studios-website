"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import { team } from "@/content/team";

export function Team() {
  return (
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
            Who We Are
          </p>
          <h2 className="text-headline text-[var(--foreground)]">
            Meet Our Team
          </h2>
          <p className="text-body-lg text-[var(--foreground-secondary)] mt-4 max-w-2xl mx-auto">
            The team works like storytellers, turning spaces into narratives
            you&apos;ll love living in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-medium text-[var(--foreground)]">
                {member.name}
              </h3>
              <p className="text-[var(--foreground-secondary)] mt-1">
                {member.role}
              </p>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 mt-3 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {member.email}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
