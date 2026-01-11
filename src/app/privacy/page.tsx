import { Metadata } from "next";
import { PrivacyContent } from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for 53 Studios - Architecture & Interior Design firm in Chennai, India.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
