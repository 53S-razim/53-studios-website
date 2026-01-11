import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PreloaderWrapper } from "@/components/PreloaderWrapper";

export const metadata: Metadata = {
  title: {
    default: "53 Studios - Architecture & Interior Design",
    template: "%s | 53 Studios",
  },
  description:
    "53 Studios specializes in contemporary architecture and interior design, delivering premium spaces with a focus on functionality and aesthetic appeal.",
  keywords: [
    "architecture",
    "interior design",
    "Chennai",
    "residential design",
    "commercial design",
    "53 Studios",
  ],
  authors: [{ name: "53 Studios" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://53studios.in",
    siteName: "53 Studios",
    title: "53 Studios - Architecture & Interior Design",
    description:
      "Premium architecture and interior design solutions in Chennai",
  },
  twitter: {
    card: "summary_large_image",
    title: "53 Studios - Architecture & Interior Design",
    description:
      "Premium architecture and interior design solutions in Chennai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/53 logo front.JPG" />
      </head>
      <body className="antialiased">
        <PreloaderWrapper>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </PreloaderWrapper>
      </body>
    </html>
  );
}
