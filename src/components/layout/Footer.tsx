"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Instagram, MessageCircle, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { DecorativeLine } from "@/components/ui/DecorativeLine";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const contactInfo = {
  address: "No. 1 Melony Road, T-Nagar, Chennai-600035",
  phones: ["+91 73958 53673", "+91 95000 45144", "+91 80560 43110"],
  emails: ["syed@53studios.in", "sanjay@53studios.in", "nancy@53studios.in"],
  instagram: "https://www.instagram.com/53studiosin",
  whatsapp: "https://wa.me/917395853673",
  maps: "https://www.google.com/maps/place/No.+1+Melony+Road,+T-Nagar,+Chennai,+Tamil+Nadu+600035",
};

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
        {/* Top Section - Large Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 md:mb-24"
        >
          <p className="text-overline text-[var(--background)]/50 tracking-[0.2em] mb-4">
            LET&apos;S WORK TOGETHER
          </p>
          <a
            href="mailto:syed@53studios.in"
            className="group inline-flex items-center gap-4"
          >
            <span className="text-4xl md:text-6xl lg:text-7xl font-light text-[var(--background)] hover:text-[var(--background)]/80 transition-colors break-all">
              syed@53studios.in
            </span>
            <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-[var(--background)]/20 mb-16 origin-left"
        />

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--background)]/20 flex items-center justify-center hover:bg-[var(--background)]/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--background)]/20 flex items-center justify-center hover:bg-[var(--background)]/10 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
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

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-3"
          >
            <h4 className="text-overline text-[var(--background)]/50 tracking-[0.15em] mb-6">
              CONTACT
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={contactInfo.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[var(--background)]/70 hover:text-[var(--background)] transition-colors group"
                >
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 opacity-50 group-hover:opacity-100" />
                  <span className="text-caption leading-relaxed">{contactInfo.address}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[var(--background)]/70">
                  <Phone className="w-4 h-4 mt-1 flex-shrink-0 opacity-50" />
                  <div className="flex flex-col gap-1">
                    {contactInfo.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="text-caption hover:text-[var(--background)] transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Emails */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-3"
          >
            <h4 className="text-overline text-[var(--background)]/50 tracking-[0.15em] mb-6">
              EMAIL
            </h4>
            <ul className="space-y-3">
              {contactInfo.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="text-caption text-[var(--background)]/70 hover:text-[var(--background)] transition-colors inline-flex items-center gap-2 group"
                  >
                    <Mail className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    {email}
                  </a>
                </li>
              ))}
            </ul>
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
