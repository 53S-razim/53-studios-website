"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-[var(--background)]"
        >
          <div className="h-full flex flex-col lg:flex-row">
            {/* Left Panel - Image */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hidden lg:block lg:w-1/2 relative"
            >
              <Image
                src="/images/liv3.jpg"
                alt="Interior Design"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--background)]/20" />
              
              {/* Contact Info on Image */}
              <div className="absolute bottom-8 left-8 text-white space-y-2">
                <p className="text-sm opacity-80">No. 1 Melony Road</p>
                <p className="text-sm opacity-80">T-Nagar, Chennai-600035</p>
                <p className="text-sm opacity-80 mt-4">hello@53studios.in</p>
                <p className="text-sm opacity-80">+91 73958 53673</p>
              </div>
            </motion.div>

            {/* Right Panel - Navigation */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 pt-24 lg:pt-0">
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center gap-4 py-4 transition-colors"
                    >
                      <span className="text-sm text-[var(--foreground-muted)] font-medium">
                        {item.number}
                      </span>
                      <span className="text-4xl lg:text-5xl font-light text-[var(--foreground)] group-hover:text-[var(--foreground-secondary)] transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Get Quote Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-12"
              >
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Get a Quote
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="mt-12 flex items-center gap-6"
              >
                <a
                  href="https://www.instagram.com/53studiosin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://wa.me/917395853673"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </motion.div>

              {/* Mobile Contact Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="mt-12 lg:hidden space-y-3 text-sm text-[var(--foreground-secondary)]"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>No. 1 Melony Road, T-Nagar, Chennai-600035</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+917395853673">+91 73958 53673</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:hello@53studios.in">hello@53studios.in</a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
