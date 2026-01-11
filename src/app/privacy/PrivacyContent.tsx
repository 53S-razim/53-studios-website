"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, including:
    
• **Personal Information**: Name, email address, phone number, and postal address when you contact us or request a quote.
• **Project Information**: Details about your property, design preferences, budget considerations, and project requirements.
• **Communication Data**: Records of correspondence when you contact us via email, phone, or our website forms.
• **Technical Data**: IP address, browser type, device information, and website usage data collected automatically when you visit our website.`
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Respond to your inquiries and provide requested services
• Prepare project estimates and proposals
• Communicate with you about your project
• Send updates about our services (with your consent)
• Improve our website and services
• Comply with legal obligations
• Protect our rights and prevent fraud`
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:

• **Service Providers**: With trusted vendors and contractors who assist us in delivering our services (e.g., material suppliers, subcontractors)
• **Legal Requirements**: When required by law, court order, or government regulation
• **Business Transfers**: In connection with any merger, acquisition, or sale of company assets
• **With Your Consent**: When you have given us explicit permission to share your information`
  },
  {
    title: "4. Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• Secure data storage systems
• Limited access to personal information on a need-to-know basis
• Regular security assessments
• Encrypted communications where applicable

However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`
  },
  {
    title: "5. Data Retention",
    content: `We retain your personal information for as long as necessary to:

• Fulfill the purposes for which it was collected
• Comply with legal obligations
• Resolve disputes and enforce agreements
• Maintain business records as required by Indian law

Project-related information may be retained for up to 7 years after project completion for warranty and legal purposes.`
  },
  {
    title: "6. Your Rights",
    content: `Under applicable Indian data protection laws, you have the right to:

• **Access**: Request a copy of the personal information we hold about you
• **Correction**: Request correction of inaccurate or incomplete information
• **Deletion**: Request deletion of your personal information (subject to legal retention requirements)
• **Objection**: Object to processing of your personal information
• **Withdrawal**: Withdraw consent for marketing communications at any time

To exercise these rights, please contact us at syed@53studios.in`
  },
  {
    title: "7. Cookies and Tracking",
    content: `Our website may use cookies and similar tracking technologies to:

• Remember your preferences
• Analyze website traffic and usage patterns
• Improve user experience

You can control cookie settings through your browser preferences. Disabling cookies may affect some website functionality.`
  },
  {
    title: "8. Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.`
  },
  {
    title: "9. Children's Privacy",
    content: `Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information.`
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated effective date. Your continued use of our services after any changes indicates your acceptance of the updated policy.`
  },
  {
    title: "11. Contact Us",
    content: `If you have any questions about this Privacy Policy or our data practices, please contact us:

**53 Studios**
No. 1 Melony Road
T-Nagar, Chennai-600035
Tamil Nadu, India

Email: syed@53studios.in
Phone: +91 73958 53673`
  },
  {
    title: "12. Governing Law",
    content: `This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes arising from this policy shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.`
  }
];

export function PrivacyContent() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <h1 className="text-display text-[var(--foreground)] mb-6">
              Privacy Policy
            </h1>
            <p className="text-body-lg text-[var(--foreground-secondary)] max-w-2xl">
              Your privacy is important to us. This policy explains how 53 Studios collects, uses, and protects your personal information.
            </p>
            <p className="text-caption text-[var(--foreground-muted)] mt-4">
              Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24">
        <div className="container-main">
          <div className="max-w-3xl">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="mb-12"
              >
                <h2 className="text-title text-[var(--foreground)] mb-4">
                  {section.title}
                </h2>
                <div className="text-body text-[var(--foreground-secondary)] leading-relaxed whitespace-pre-line">
                  {section.content.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-[var(--foreground)]">{part}</strong> : part
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
