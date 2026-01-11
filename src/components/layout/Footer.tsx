"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

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
  return (
    <footer className="bg-[var(--background-secondary)] border-t border-[var(--border)]">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/53 logo front.JPG"
                alt="53 Studios"
                width={80}
                height={80}
                className="rounded-lg"
              />
            </Link>
            <p className="text-[var(--foreground-secondary)] leading-relaxed">
              Functional design <em>and</em> timeless craftsmanship.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-overline text-[var(--foreground-muted)] mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-overline text-[var(--foreground-muted)] mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={contactInfo.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{contactInfo.address}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {contactInfo.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="hover:text-[var(--foreground)] transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {contactInfo.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="hover:text-[var(--foreground)] transition-colors"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-overline text-[var(--foreground-muted)] mb-6">
              Follow Us
            </h4>
            <div className="flex items-center gap-4">
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-elevated)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-elevated)] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--foreground-muted)]">
            © {new Date().getFullYear()} 53 Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[var(--foreground-muted)]">
            <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
