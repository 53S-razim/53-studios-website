"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Mail, Instagram, MessageCircle } from "lucide-react";

interface TeamProfileCardProps {
  name: string;
  role: string;
  image: string;
  phone?: string;
  email?: string;
  instagram?: string;
  whatsapp?: string;
  delay?: number;
}

export function TeamProfileCard({
  name,
  role,
  image,
  phone,
  email,
  instagram,
  whatsapp,
  delay = 0,
}: TeamProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="profile-card-glass p-4 flex items-center gap-4"
    >
      {/* Profile Image */}
      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        {/* Online Indicator */}
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[var(--background)]" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[var(--foreground)] truncate">{name}</h4>
        <p className="text-sm text-[var(--foreground-secondary)] truncate">{role}</p>
        
        {/* Contact Row */}
        <div className="flex items-center gap-2 mt-2">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="p-1.5 rounded-lg bg-[var(--surface)]/50 hover:bg-[var(--surface)] transition-colors"
              aria-label={`Call ${name}`}
            >
              <Phone className="w-3.5 h-3.5 text-[var(--foreground-secondary)]" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="p-1.5 rounded-lg bg-[var(--surface)]/50 hover:bg-[var(--surface)] transition-colors"
              aria-label={`Email ${name}`}
            >
              <Mail className="w-3.5 h-3.5 text-[var(--foreground-secondary)]" />
            </a>
          )}
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-[var(--surface)]/50 hover:bg-[var(--surface)] transition-colors"
              aria-label={`WhatsApp ${name}`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-[var(--foreground-secondary)]" />
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-[var(--surface)]/50 hover:bg-[var(--surface)] transition-colors"
              aria-label={`Instagram ${name}`}
            >
              <Instagram className="w-3.5 h-3.5 text-[var(--foreground-secondary)]" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
