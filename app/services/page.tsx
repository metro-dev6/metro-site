import type { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQ } from "@/components/sections/FAQ";
import { PageHeader } from "@/components/ui/section";
import { DarkCard } from "@/components/ui/cards";
import { ServicesInteractive } from "@/components/services/services-interactive";
import { WhoDoesTheWork } from "@/components/services/who-does-the-work";
import { SERVICES } from "@/components/services/services-data";
import { SERVICES_FAQS } from "@/components/services/services-faq-data";

export const metadata: Metadata = {
  title: { absolute: "Mobile Detailing Services | Bakersfield, CA" },
  description:
    "Mobile detailing packages in Bakersfield, CA starting at $80. Full pricing on every package and add-on, free estimates, and online booking. We come to you.",
  alternates: { canonical: "https://metroautodetailing.pro/services" },
  openGraph: {
    title: "Mobile Detailing Services in Bakersfield, CA | Metro Auto Detailing",
    description: "Mobile detailing packages starting at $80. We come to you, no drop-off required.",
    url: "https://metroautodetailing.pro/services",
  },
};

const BASE = "https://metroautodetailing.pro";

const SERVICES_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "AutomotiveBusiness"],
      "@id": `${BASE}#business`,
      name: "Metro Auto Detailing",
      url: BASE,
      telephone: "+16613685165",
      email: "metrodetailing661@gmail.com",
      areaServed: "Bakersfield, CA",
      sameAs: [
        "https://instagram.com/metroautodetailingca",
        "https://www.facebook.com/profile.php?id=61586613950253",
        "https://tiktok.com/@metroautodetailing",
      ],
    },
    ...SERVICES.map((s) => ({
      "@type": "Service",
      name: s.name,
      description: s.description,
      provider: { "@id": `${BASE}#business` },
      areaServed: "Bakersfield, CA",
      offers: {
        "@type": "Offer",
        price: String(s.prices.sedan),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${BASE}/services`,
      },
    })),
    {
      "@type": "FAQPage",
      mainEntity: SERVICES_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function ServicesPage() {
  return (
    <main className="bg-site-surface text-brand-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_SCHEMA) }} />

      {/* Header */}
      <PageHeader
        eyebrow="Bakersfield, Fully Mobile"
        title={<>Mobile Detailing <span className="font-accent text-brand-yellow">Services</span></>}
        sub="No shop. No drop-off. We bring the water, power, and everything else to wherever the car is parked."
      />

      {/* Selector + Essentials + Add-Ons + Maintenance (size-reactive) */}
      <ServicesInteractive />

      {/* Who does the work */}
      <WhoDoesTheWork />

      {/* Trust strip */}
      <section className="py-10">
        <DarkCard>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                Not sure which one <span className="font-accent text-brand-yellow">fits?</span>
              </h2>
              <p className="text-white/65 mt-3 leading-relaxed">
                The final price is always confirmed at the walk-around before we start. Not sure where your car lands?
                Send a couple photos and we&apos;ll build a quote, usually the same day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/estimate"
                className="bg-brand-yellow text-black font-black uppercase tracking-wide text-sm px-6 py-4 rounded-full transition-transform duration-150 active:scale-[0.97]"
              >
                Book Now
              </Link>
              <a
                href="tel:+16613685165"
                className="border-2 border-white/40 text-white font-black uppercase tracking-wide text-sm px-6 py-3.5 rounded-full transition-transform duration-150 active:scale-[0.97]"
              >
                Call (661) 368-5165
              </a>
            </div>
          </div>
        </DarkCard>
      </section>

      <FAQ faqs={SERVICES_FAQS} theme="light" />

      <CTABanner />
    </main>
  );
}
