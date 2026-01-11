import { Metadata } from "next";
import { TermsContent } from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for 53 Studios - Architecture & Interior Design firm in Chennai, India.",
};

export default function TermsPage() {
  return <TermsContent />;
}
