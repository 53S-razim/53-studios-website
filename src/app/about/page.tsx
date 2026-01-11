import { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about 53 Studios, our approach to architecture and design, and our team of creative professionals.",
};

export default function AboutPage() {
  return <AboutContent />;
}
