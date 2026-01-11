import { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with 53 Studios. Contact us for inquiries about our architecture and interior design services.",
};

export default function ContactPage() {
  return <ContactContent />;
}
