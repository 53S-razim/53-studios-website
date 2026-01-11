"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { Instagram, MessageCircle, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { TimeWidget, WeatherWidget, ContactWidget } from "@/components/ui/Widget";

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
  const { openModal } = useQuoteModal();
  
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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* macOS-style Dropdown Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-20 left-4 right-4 md:left-auto md:right-6 md:w-[480px] z-50 macos-panel rounded-3xl overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-[var(--foreground)]">Menu</h2>
                <span className="text-xs text-[var(--foreground-muted)]">53 Studios</span>
              </div>

              {/* Widgets Row */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <TimeWidget />
                <WeatherWidget />
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1 mb-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-3 px-4 -mx-4 rounded-xl hover:bg-[var(--surface)] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-[var(--foreground-muted)] font-mono w-6">
                          {item.number}
                        </span>
                        <span className="text-base font-medium text-[var(--foreground)]">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <div className="h-px bg-[var(--border)] mb-6" />

              {/* Get Quote Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  onClose();
                  setTimeout(openModal, 300);
                }}
                className="w-full py-3 px-6 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 pt-6 border-t border-[var(--border)]"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Contact Details */}
                  <div className="space-y-3">
                    <a 
                      href="tel:+917395853673"
                      className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                    >
                      <Phone className="w-4 h-4 opacity-50" />
                      <span>+91 73958 53673</span>
                    </a>
                    <a 
                      href="mailto:syed@53studios.in"
                      className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                    >
                      <Mail className="w-4 h-4 opacity-50" />
                      <span>syed@53studios.in</span>
                    </a>
                    <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                      <MapPin className="w-4 h-4 opacity-50" />
                      <span>Chennai, India</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-end justify-end gap-2">
                    <a
                      href="https://www.instagram.com/53studiosin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://wa.me/917395853673"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-all"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
