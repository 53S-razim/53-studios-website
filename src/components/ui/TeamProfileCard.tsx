"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Mail, Instagram } from "lucide-react";
import { WhatsAppIcon } from "./Icons";

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
      className="profile-card-glass p-5"
    >
      {/* Header - Profile Image & Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
          {/* Online Indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--background)]" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-[var(--foreground)] text-lg">{name}</h4>
          <p className="text-sm text-[var(--foreground-secondary)]">{role}</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-2 mb-4">
        {phone && (
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>{phone}</span>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
          >
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{email}</span>
          </a>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            aria-label={`WhatsApp ${name}`}
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] transition-colors"
            aria-label={`Instagram ${name}`}
          >
            <Instagram className="w-5 h-5 text-[var(--foreground-secondary)]" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
