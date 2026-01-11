"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Instagram, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { TimeWidget, WeatherWidget, LocationWidget } from "@/components/ui/Widget";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { team } from "@/content/team";

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

          <div className="h-full overflow-y-auto">
            <div className="container-main py-24 md:py-28 min-h-full flex flex-col">
              {/* Main Content Grid */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left Column - Navigation */}
                <div className="lg:col-span-5 flex flex-col">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-overline text-[var(--foreground-muted)] tracking-[0.2em] mb-8"
                  >
                    NAVIGATION
                  </motion.p>
                  
                  <nav className="space-y-2 mb-12">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.15 + index * 0.08,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                        className="overflow-hidden"
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center gap-6 py-4 transition-colors"
                        >
                          <span className="text-sm text-[var(--foreground-muted)] font-medium w-8">
                            {item.number}
                          </span>
                          <span className="text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--foreground)] group-hover:text-[var(--foreground-secondary)] transition-colors tracking-tight">
                            {item.label}
                          </span>
                          <ArrowUpRight className="w-6 h-6 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-50 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                        </Link>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 + index * 0.08 }}
                          className="h-px bg-[var(--border)] origin-left"
                        />
                      </motion.div>
                    ))}
                  </nav>

                  {/* Get Quote Button - Larger */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => {
                      onClose();
                      setTimeout(openModal, 300);
                    }}
                    className="w-full md:w-auto py-5 px-10 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-2xl text-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
                  >
                    <span>Get a Quote</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Right Column - Widgets & Contact */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                  {/* Widgets Grid - macOS style for web, iOS style for mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-overline text-[var(--foreground-muted)] tracking-[0.2em] mb-4">
                      WIDGETS
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <TimeWidget />
                      <WeatherWidget />
                      <LocationWidget />
                    </div>
                  </motion.div>

                  {/* Team Contact Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1"
                  >
                    <p className="text-overline text-[var(--foreground-muted)] tracking-[0.2em] mb-4">
                      REACH OUT TO US
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {teamWithContact.map((member, index) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 + index * 0.1 }}
                          className="widget-glass rounded-2xl p-5"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--background)]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-[var(--foreground)]">{member.name}</h4>
                              <p className="text-sm text-[var(--foreground-secondary)]">{member.role}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <a 
                              href={`tel:${member.phone.replace(/\s/g, "")}`}
                              className="flex items-center gap-3 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                            >
                              <Phone className="w-4 h-4" />
                              <span>{member.phone}</span>
                            </a>
                            {member.email && (
                              <a 
                                href={`mailto:${member.email}`}
                                className="flex items-center gap-3 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                              >
                                <Mail className="w-4 h-4" />
                                <span>{member.email}</span>
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--border)]">
                            <a
                              href={member.whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                              <WhatsAppIcon className="w-4 h-4" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href="https://www.instagram.com/53studiosin"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] transition-colors"
                            >
                              <Instagram className="w-5 h-5 text-[var(--foreground-secondary)]" />
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className="text-sm text-[var(--foreground-muted)]">
                  © {new Date().getFullYear()} 53 Studios. Chennai, India.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/53studiosin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/917395853673"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
