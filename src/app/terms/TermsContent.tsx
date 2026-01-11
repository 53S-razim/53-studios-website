"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Estimate Basis",
    content: `All estimates provided by 53 Studios are prepared based on the information available at the time of issuance. Estimates are subject to change should there be any unforeseen circumstances, changes in specifications, or project scope revisions. Final pricing will be confirmed upon detailed site assessment and design finalization.`
  },
  {
    title: "2. Currency",
    content: `All quoted amounts are in Indian Rupees (₹), unless stated otherwise. Prices are exclusive of applicable taxes unless specifically mentioned in the estimate.`
  },
  {
    title: "3. Payment Terms",
    content: `Payment schedules and terms will be finalized separately and documented in a formal agreement. A deposit may be required before the commencement of any work. Standard payment milestones include:

• **Booking Advance**: 30-40% upon design approval
• **Material Procurement**: 30-40% before material ordering
• **Completion**: Balance payment upon project handover

Payment delays may result in project timeline adjustments.`
  },
  {
    title: "4. Exclusions",
    content: `Unless specifically mentioned in the estimate, the following are excluded:

• Goods and Services Tax (GST) and other applicable taxes
• Government duties, permits, and approval fees
• Structural modifications requiring municipal approvals
• Electrical and plumbing work beyond specified scope
• Civil work, false ceiling, and flooring unless specified
• Furniture and fixtures not listed in the estimate`
  },
  {
    title: "5. Scope Changes",
    content: `Any variations or additions to the agreed scope of work will be treated as separate and will incur additional charges, subject to prior written approval. Change requests must be submitted in writing and will be evaluated for cost and timeline impact before implementation.`
  },
  {
    title: "6. Client Responsibilities",
    content: `The client is responsible for:

• Securing all necessary permissions, approvals, and clearances required to initiate and execute the work
• Providing accurate site measurements and existing condition documentation
• Ensuring site access during agreed working hours
• Timely decision-making on design approvals and material selections
• Arranging for temporary storage of existing furniture/belongings if required
• Providing basic amenities (electricity, water) at the site during execution`
  },
  {
    title: "7. Quality Assurance",
    content: `All materials used and workmanship provided will meet professional standards and be of good quality. 53 Studios guarantees:

• Use of materials as specified in the approved design documents
• Professional workmanship by skilled craftsmen
• Adherence to industry-standard practices
• Quality checks at key project milestones

Any defects in materials or workmanship will be rectified at no additional cost within the warranty period.`
  },
  {
    title: "8. Estimate Validity",
    content: `Estimates remain valid for a period of 30 days from the date of issuance, unless otherwise specified. After this period, prices may be subject to revision based on market conditions and material availability.`
  },
  {
    title: "9. Liability Limitations",
    content: `53 Studios' liability for any damages or delays will be limited to the total value of the contracted amount. We shall not be liable for:

• Delays caused by client-side decisions or approvals
• Force majeure events (natural disasters, pandemics, government restrictions)
• Issues arising from pre-existing structural conditions not disclosed
• Consequential or indirect damages`
  },
  {
    title: "10. Design Finalization",
    content: `Once the designs (3D renders and 2D drawings) are approved and execution begins, no further changes to the structure or design will be accommodated without additional charges and timeline revisions. Design approval is considered final upon written confirmation or payment of the execution advance.`
  },
  {
    title: "11. Additional Work",
    content: `Any structural changes, additions, or extra work beyond the original scope will be treated as a new project and billed separately. This includes but is not limited to:

• Design modifications after approval
• Additional rooms or areas not in original scope
• Upgrade requests for materials or finishes
• Work arising from site conditions not visible during initial assessment`
  },
  {
    title: "12. Design Approvals",
    content: `Project execution will not commence until the client has provided written approval for all 3D designs and 2D drawings. No project will start for production without complete approvals of 3D design and 2D drawings from the client. Approval may be provided via:

• Signed physical documents
• Email confirmation from the registered client email
• Digital signature on shared documents`
  },
  {
    title: "13. Site Access",
    content: `To maintain workflow efficiency and adhere to the project schedule, it is requested that no members of the client's household reside on-site during the execution phase. This measure is essential for:

• Worker safety and productivity
• Proper material storage and handling
• Uninterrupted work progress
• Timely project completion

Your cooperation in this matter is essential for the successful and timely completion of the project.`
  },
  {
    title: "14. Timeline Adherence",
    content: `Strict adherence to the designated timeline for both design and production phases is imperative. Delays can adversely affect not only the current project but also ongoing and upcoming projects in our pipeline. Timeline extensions requested by the client may result in additional charges due to:

• Extended site supervision
• Storage costs for materials
• Rescheduling of workforce
• Potential material price increases`
  },
  {
    title: "15. Operational Adjustments",
    content: `In the event of execution challenges like power cuts or site restrictions, our team may relocate workers to areas needing immediate attention. This ensures efficient resource utilization and meets labor timeline objectives. Clients are not liable for labor reassignments. 53 Studios reserves the right to make operational decisions to ensure efficient project delivery. We appreciate your understanding.`
  },
  {
    title: "16. Material Discontinuation",
    content: `If a vendor has discontinued a product after design confirmation, the client needs to select another option available. 53 Studios shall not be held liable for such changes beyond our control. In such cases:

• We will provide alternative options of similar quality and price range
• Any price difference will be communicated before procurement
• Timeline adjustments may be necessary for sourcing alternatives`
  },
  {
    title: "17. Warranty",
    content: `53 Studios provides the following warranty coverage:

• **Workmanship**: 1 year from project handover
• **Modular Furniture**: As per manufacturer warranty (typically 5-10 years)
• **Hardware & Fittings**: As per manufacturer warranty

Warranty does not cover:
• Normal wear and tear
• Damage due to misuse or negligence
• Modifications made by third parties
• Items not supplied by 53 Studios`
  },
  {
    title: "18. Dispute Resolution",
    content: `In the event of any dispute arising from this agreement:

• Parties shall first attempt amicable resolution through discussion
• If unresolved, mediation shall be attempted before legal proceedings
• Any legal proceedings shall be subject to the exclusive jurisdiction of courts in Chennai, Tamil Nadu

We encourage open communication to resolve any concerns promptly.`
  },
  {
    title: "19. Intellectual Property",
    content: `All designs, drawings, 3D renders, and creative work produced by 53 Studios remain our intellectual property until full payment is received. Upon full payment:

• Client receives a license to use the designs for the specified project
• Designs may not be replicated or shared without written permission
• 53 Studios reserves the right to use project images for portfolio and marketing purposes`
  },
  {
    title: "20. Governing Law",
    content: `These terms and conditions are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, under the jurisdiction of the Madras High Court.`
  },
  {
    title: "21. Contact Information",
    content: `For any questions regarding these Terms of Service, please contact:

**53 Studios**
No. 1 Melony Road
T-Nagar, Chennai-600035
Tamil Nadu, India

Email: syed@53studios.in
Phone: +91 73958 53673

Office Hours: Monday to Saturday, 10:00 AM to 7:00 PM IST`
  }
];

export function TermsContent() {
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
              Terms of Service
            </h1>
            <p className="text-body-lg text-[var(--foreground-secondary)] max-w-2xl">
              Please read these terms carefully before engaging our services. By working with 53 Studios, you agree to be bound by these terms and conditions.
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
                transition={{ duration: 0.5, delay: index * 0.03 }}
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

            {/* Agreement Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
            >
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">
                Acceptance of Terms
              </h3>
              <p className="text-body text-[var(--foreground-secondary)]">
                By engaging 53 Studios for any services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not proceed with our services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
