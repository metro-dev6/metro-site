import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Metro Auto Detailing | Bakersfield, CA",
    template: "%s | Metro Auto Detailing",
  },
  description: "Mobile auto detailing in Bakersfield, CA. We come to you — no drop-off, no shop. Book online.",
  metadataBase: new URL("https://metroautodetailing.pro"),
  openGraph: {
    siteName: "Metro Auto Detailing",
    type: "website",
    locale: "en_US",
    images: [{ url: "/hero-car-enhanced.jpg", width: 1200, height: 630, alt: "Metro Auto Detailing — Bakersfield, CA" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "AutoRepair"],
              "name": "Metro Auto Detailing",
              "description": "Mobile auto detailing in Bakersfield, CA. We come to you.",
              "url": "https://metroautodetailing.pro",
              "telephone": "+16613685165",
              "email": "metrodetailing661@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bakersfield",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "areaServed": [
                "Southwest Bakersfield", "Stockdale", "Seven Oaks",
                "Oleander", "Bakersfield"
              ],
              "priceRange": "$$",
              "image": "https://metroautodetailing.pro/hero-car-enhanced.jpg",
              "sameAs": [
                "https://instagram.com/metroautodetailing",
                "https://facebook.com/metroautodetailing"
              ]
            })
          }}
        />
        <AnnouncementBar />
        <Header />
        {/* AnnouncementBar h-9 (36px) + Header h-16 (64px) = 100px */}
        <div className="h-[100px]" aria-hidden="true" />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
