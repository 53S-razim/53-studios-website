"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Instagram, ArrowUpRight, MapPin } from "lucide-react";
import { TeamProfileCard } from "@/components/ui/TeamProfileCard";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { team } from "@/content/team";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const teamWithContact = [
  {
    ...team[0],
    phone: "+91 73958 53673",
    whatsapp: "https://wa.me/917395853673",
  },
  {
    ...team[1],
    phone: "+91 95000 45144",
    whatsapp: "https://wa.me/919500045144",
  },
  {
    ...team[2],
    phone: "+91 80560 43110",
    whatsapp: "https://wa.me/918056043110",
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  return (
    <footer 
      ref={footerRef}
      className="bg-[var(--foreground)] text-[var(--background)] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container-main relative z-10 py-16 md:py-24">
        {/* Top Section - Simple CTA without email */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="text-overline text-[var(--background)]/50 tracking-[0.2em] mb-4">
            LET&apos;S WORK TOGETHER
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-[var(--background)] tracking-tight max-w-3xl">
            Ready to transform your space? Get in touch with our team.
          </h2>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-[var(--background)]/20 mb-16 origin-left"
        />

        {/* Team Profile Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h4 className="text-overline text-[var(--background)]/50 tracking-[0.15em] mb-6">
            REACH OUT TO US
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamWithContact.map((member, index) => (
              <TeamProfileCard
                key={member.id}
                name={member.name}
                role={member.role}
                image={member.image}
                phone={member.phone}
                email={member.email}
                whatsapp={member.whatsapp}
                delay={0.1 * index}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-block mb-6">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[var(--background)] p-2">
                <Image
                  src="/images/53 logo front.JPG"
                  alt="53 Studios"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-body text-[var(--background)]/70 leading-relaxed max-w-sm">
              Functional design <em className="text-[var(--background)]/90">and</em> timeless craftsmanship. 
              Creating spaces that inspire and endure.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/53studiosin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-[var(--background)]/20 flex items-center justify-center hover:bg-[var(--background)]/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/917395853673"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-[var(--background)]/20 flex items-center justify-center hover:bg-[var(--background)]/10 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-3"
          >
            <h4 className="text-overline text-[var(--background)]/50 tracking-[0.15em] mb-6">
              NAVIGATION
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body text-[var(--background)]/70 hover:text-[var(--background)] transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-5"
          >
            <h4 className="text-overline text-[var(--background)]/50 tracking-[0.15em] mb-6">
              VISIT US
            </h4>
            <a
              href="https://www.google.com/maps/place/No.+1+Melony+Road,+T-Nagar,+Chennai,+Tamil+Nadu+600035"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-[var(--background)]/70 hover:text-[var(--background)] transition-colors group"
            >
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-50 group-hover:opacity-100" />
              <div>
                <p className="text-body leading-relaxed">No. 1 Melony Road</p>
                <p className="text-body leading-relaxed">T-Nagar, Chennai-600035</p>
                <p className="text-body leading-relaxed">Tamil Nadu, India</p>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="pt-8 border-t border-[var(--background)]/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-caption text-[var(--background)]/50">
            © {new Date().getFullYear()} 53 Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-caption text-[var(--background)]/50">
            <Link href="/privacy" className="hover:text-[var(--background)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--background)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
