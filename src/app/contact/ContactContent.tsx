"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/content/faq";
import { submitContactForm } from "@/lib/firebase";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "No. 1 Melony Road, T-Nagar, Chennai-600035",
    href: "https://www.google.com/maps/place/No.+1+Melony+Road,+T-Nagar,+Chennai,+Tamil+Nadu+600035",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 73958 53673",
    href: "tel:+917395853673",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@53studios.in",
    href: "mailto:hello@53studios.in",
  },
];

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setErrors({ submit: result.error || "Failed to submit form" });
      }
    } catch {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-overline text-[var(--foreground-muted)] mb-4">
              Get In Touch
            </p>
            <h1 className="text-display text-[var(--foreground)] mb-6">
              Contact Us
            </h1>
            <p className="text-body-lg text-[var(--foreground-secondary)]">
              Have a question or want to work together? Fill out the form below
              and we&apos;ll get back to you soon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <GlassPanel className="p-8 md:p-10">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-[var(--foreground)] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[var(--foreground-secondary)]">
                      Thank you for reaching out. We&apos;ll get back to you shortly.
                    </p>
                    <Button
                      variant="secondary"
                      className="mt-6"
                      onClick={() => setSuccess(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        id="name"
                        label="Name"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        error={errors.name}
                      />
                      <Input
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        error={errors.email}
                      />
                    </div>
                    <Input
                      id="phone"
                      label="Phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      error={errors.phone}
                    />
                    <Textarea
                      id="message"
                      label="Message"
                      placeholder="Tell us about your project..."
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      error={errors.message}
                    />
                    {errors.submit && (
                      <p className="text-sm text-red-500">{errors.submit}</p>
                    )}
                    <Button type="submit" size="lg" loading={loading}>
                      Send Message
                    </Button>
                  </form>
                )}
              </GlassPanel>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  <GlassPanel className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-[var(--surface)]">
                        <info.icon className="w-5 h-5 text-[var(--foreground-secondary)]" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--foreground-muted)] mb-1">
                          {info.label}
                        </p>
                        <p className="text-[var(--foreground)]">{info.value}</p>
                      </div>
                    </div>
                  </GlassPanel>
                </a>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/917395853673"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <GlassPanel className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-500">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">
                        Chat on WhatsApp
                      </p>
                      <p className="text-sm text-[var(--foreground-secondary)]">
                        Quick response guaranteed
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[var(--background-secondary)]">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-overline text-[var(--foreground-muted)] mb-4">
              Common Questions
            </p>
            <h2 className="text-headline text-[var(--foreground)]">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion items={faqs} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
