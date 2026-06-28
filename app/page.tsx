import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Metro Auto Detailing | Mobile Detailing in Bakersfield, CA",
  description: "Professional mobile auto detailing in Bakersfield, CA. We come to your home or office — no drop-off required. Full details, interior cleaning, headlight restoration, and more.",
  openGraph: {
    title: "Metro Auto Detailing | Mobile Detailing in Bakersfield, CA",
    description: "Professional mobile auto detailing in Bakersfield, CA. We come to you.",
    url: "https://metroautodetailing.pro",
  },
};
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyMetro } from "@/components/sections/WhyMetro";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyMetro />
      <Testimonials />
      <CTABanner />
      <FAQ />
    </>
  );
}
