import { Hero } from "@/components/sections/Hero";
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
