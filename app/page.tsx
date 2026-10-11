import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: { absolute: "Metro Auto Detailing | Mobile Detailing in Bakersfield, CA" },
  description: "Mobile auto detailing in Bakersfield, CA. We come to you, no drop-off required. Full details, interior cleaning, and headlight restoration.",
  alternates: { canonical: "https://metroautodetailing.pro" },
  openGraph: {
    title: "Metro Auto Detailing | Mobile Detailing in Bakersfield, CA",
    description: "Professional mobile auto detailing in Bakersfield, CA. We come to you.",
    url: "https://www.metroautodetailing.pro",
  },
};
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyMetro } from "@/components/sections/WhyMetro";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ, DEFAULT_FAQS } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DEFAULT_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <WhyMetro />
      <ServicesPreview />
      <Testimonials />
      <Gallery />
      <CTABanner />
      <FAQ theme="light" />
    </>
  );
}
