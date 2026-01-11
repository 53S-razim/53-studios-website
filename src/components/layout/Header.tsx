"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { MenuOverlay } from "./MenuOverlay";
import { ScrollProgress } from "./ScrollProgress";
import { useQuoteModal } from "@/context/QuoteModalContext";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { openModal } = useQuoteModal();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Show/hide header based on scroll direction
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    // Add glass effect after scrolling
    setScrolled(latest > 50);
  });

  return (
    <>
      <ScrollProgress />
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden && !menuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && !menuOpen && "glass backdrop-blur-xl border-b border-[var(--border)]"
        )}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Larger size, no text */}
            <Link href="/" className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/53 logo front.JPG"
                  alt="53 Studios"
                  width={64}
                  height={64}
                  className="rounded-xl"
                  priority
                />
              </motion.div>
            </Link>

            {/* Center - Hidden nav links for desktop */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:flex items-center gap-8"
            >
              {["Projects", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--foreground)] transition-all group-hover:w-full" />
                </Link>
              ))}
            </motion.nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ThemeToggle />
              </motion.div>

              {/* CTA Button - Desktop - Opens Quote Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hidden md:block"
              >
                <button
                  onClick={openModal}
                  className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Get Quote
                </button>
              </motion.div>
              
              {/* Menu Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className={cn(
                  "relative z-10 p-3 rounded-xl transition-all",
                  "hover:bg-[var(--surface)]",
                  menuOpen && "bg-[var(--foreground)] text-[var(--background)]"
                )}
                whileTap={{ scale: 0.95 }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
