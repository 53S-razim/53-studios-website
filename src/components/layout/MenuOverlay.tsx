"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Instagram, Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { DecorativeLine, DecorativeCorner } from "@/components/ui/DecorativeLine";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: "/", label: "Home", number: "01" },
  { href: "/projects", label: "Projects", number: "02" },
  { href: "/about", label: "About", number: "03" },
  { href: "/contact", label: "Contact", number: "04" },
];

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-40 bg-[var(--background)]"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          <div className="h-full flex flex-col lg:flex-row relative">
            {/* Decorative Corners */}
            <div className="absolute top-24 left-8 z-10">
              <DecorativeCorner position="top-left" size={40} delay={0.3} />
            </div>
            <div className="absolute bottom-8 right-8 z-10">
              <DecorativeCorner position="bottom-right" size={40} delay={0.4} />
            </div>

            {/* Left Panel - Image */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="hidden lg:block lg:w-1/2 relative overflow-hidden"
            >
              <Image
                src="/images/liv3.jpg"
                alt="Interior Design"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-[var(--background)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Contact Info on Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-12 left-12 text-white space-y-4"
              >
                <p className="text-overline tracking-[0.2em] text-white/60 mb-4">
                  VISIT US
                </p>
                <p className="text-lg">No. 1 Melony Road</p>
                <p className="text-lg">T-Nagar, Chennai-600035</p>
                <div className="pt-4 space-y-2">
                  <p className="text-white/70">syed@53studios.in</p>
                  <p className="text-white/70">+91 73958 53673</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Panel - Navigation */}
            <div className="flex-1 flex flex-col justify-between px-8 lg:px-16 pt-28 pb-8 lg:pt-32 lg:pb-12 overflow-y-auto">
              {/* Navigation */}
              <nav className="space-y-1">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 60, opacity: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.1 + index * 0.08,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="overflow-hidden"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center gap-6 py-3 transition-colors"
                    >
                      <span className="text-caption text-[var(--foreground-muted)] font-medium w-8">
                        {item.number}
                      </span>
                      <span className="text-5xl lg:text-6xl xl:text-7xl font-light text-[var(--foreground)] group-hover:text-[var(--foreground-secondary)] transition-colors tracking-tight">
                        {item.label}
                      </span>
                      <ArrowUpRight className="w-6 h-6 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-50 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.08 }}
                      className="h-px bg-[var(--border)] origin-left ml-14"
                    />
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Section */}
              <div className="mt-12 space-y-8">
                {/* Get Quote Button */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-full font-medium hover:opacity-90 transition-opacity group"
                  >
                    <span>Get a Quote</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </motion.div>

                {/* Social Links & Contact */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
                >
                  {/* Social Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.instagram.com/53studiosin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://wa.me/917395853673"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Mobile Contact Info */}
                  <div className="lg:hidden space-y-3 text-caption text-[var(--foreground-secondary)]">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 opacity-50" />
                      <span>No. 1 Melony Road, T-Nagar, Chennai-600035</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 opacity-50" />
                      <a href="tel:+917395853673" className="hover:text-[var(--foreground)]">
                        +91 73958 53673
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 opacity-50" />
                      <a href="mailto:syed@53studios.in" className="hover:text-[var(--foreground)]">
                        syed@53studios.in
                      </a>
                    </div>
                  </div>

                  {/* Year Badge */}
                  <div className="hidden lg:block text-right">
                    <p className="text-caption text-[var(--foreground-muted)]">
                      Since 2014
                    </p>
                    <p className="text-caption text-[var(--foreground-muted)]">
                      Chennai, India
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
