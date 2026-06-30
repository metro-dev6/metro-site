import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: { absolute: "Metro Auto Detailing | Mobile Detailing in Bakersfield, CA" },
  description: "Professional mobile auto detailing in Bakersfield, CA. We come to your home or office — no drop-off required. Full details, interior cleaning, headlight restoration, and more.",
  alternates: { canonical: "https://www.metroautodetailing.pro" },
  openGraph: {
    title: "Metro Auto Detailing | Mobile Detailing in Bakersfield, CA",
    description: "Professional mobile auto detailing in Bakersfield, CA. We come to you.",
    url: "https://www.metroautodetailing.pro",
  },
};
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyMetro } from "@/components/sections/WhyMetro";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's the difference between a detail and a regular car wash?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A car wash is automated and surface level. It wets the car, runs generic brushes over it, and sends you out. Detailing is different. Every surface gets worked by hand, inside and out. We clean what a car wash misses and protect what a car wash leaves behind."
      }
    },
    {
      "@type": "Question",
      "name": "What do I need to provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Just your vehicle. We bring everything: water tank, generator, all equipment and products. You don't need to do anything except make the car accessible."
      }
    },
    {
      "@type": "Question",
      "name": "How should I prepare my car before the appointment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remove any personal items from the interior, especially anything large or valuable. Make sure the vehicle is parked somewhere we can access it: driveway, parking lot, or street. That's it."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be home during the appointment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. We just need the keys and access to the vehicle. You don't need to be present. If you want to be there for a before-and-after walkthrough, that's always welcome. But it's not required."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a detail take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depends on the service and the condition of the vehicle. A Signature Wash takes about an hour. A Full Detail runs 4-6+ hours. We'll give you a time estimate when we confirm the booking."
      }
    },
    {
      "@type": "Question",
      "name": "What areas do you service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bakersfield, CA and surrounding areas within 15 miles. Submit an estimate with your location and we'll confirm availability. Travel fees apply beyond that range."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept all major credit and debit cards, cash, Zelle, and Apple Pay. Payment is collected at the end of the appointment after you've seen the finished result."
      }
    },
    {
      "@type": "Question",
      "name": "Is a deposit required to book?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A $20 deposit secures your appointment and applies toward the total. It's refundable if you cancel with enough notice."
      }
    },
    {
      "@type": "Question",
      "name": "What if my vehicle is in rough condition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We handle it. If the condition calls for extra time or an upcharge after assessing the car, we'll tell you before we start. Nothing changes without your sign-off."
      }
    },
    {
      "@type": "Question",
      "name": "What if it rains on my appointment day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We'll reach out to reschedule. Interior work can sometimes still happen depending on conditions. We'll figure it out on a case-by-case basis."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer recurring appointments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer biweekly, monthly, bimonthly, and quarterly maintenance plans. Regular bookings keep the car in better condition between visits and cost less per service than starting from a dirty baseline."
      }
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <ServicesPreview />
      <WhyMetro />
      <Testimonials />
      <CTABanner />
      <FAQ />
    </>
  );
}
