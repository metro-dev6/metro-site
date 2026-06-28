import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const LOCATIONS: Record<string, {
  name: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  note: string;
  mapQuery: string;
}> = {
  "bakersfield": {
    name: "Bakersfield",
    metaTitle: "Mobile Auto Detailing in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Metro Auto Detailing serves all of Bakersfield, CA. 100% mobile — we come to your home or office. Full details, interior cleaning, headlight restoration, and more.",
    headline: "Mobile Auto Detailing in Bakersfield, CA",
    intro: "Metro Auto Detailing is based in Bakersfield and serves the city and surrounding areas. We are 100% mobile. No shop, no drop-off, no waiting. You book a time, we show up with everything needed, and you get your vehicle back clean.",
    note: "Serving all of Bakersfield, CA. Appointment only.",
    mapQuery: "Bakersfield,CA",
  },
  "southwest-bakersfield": {
    name: "Southwest Bakersfield",
    metaTitle: "Mobile Detailing in Southwest Bakersfield | Metro Auto Detailing",
    metaDescription: "Mobile auto detailing in Southwest Bakersfield, CA. Metro Auto Detailing comes to your home — Gosford, White Lane, Coffee Road area. Book online.",
    headline: "Mobile Detailing in Southwest Bakersfield",
    intro: "Southwest Bakersfield is our home base. If you're in the Gosford, White Lane, or Coffee Road corridor, we can be at your door faster than anyone else in the city. No driving anywhere. We come to you.",
    note: "Home base area — fastest availability in Southwest Bakersfield.",
    mapQuery: "Southwest+Bakersfield,CA",
  },
  "stockdale": {
    name: "Stockdale",
    metaTitle: "Mobile Detailing in Stockdale, Bakersfield | Metro Auto Detailing",
    metaDescription: "Mobile auto detailing in Stockdale, Bakersfield CA. Metro Auto Detailing serves the Stockdale Highway corridor. We come to your home. Book online.",
    headline: "Mobile Detailing in Stockdale, Bakersfield",
    intro: "Stockdale is one of Bakersfield's most established corridors. We work trucks, SUVs, and weekend vehicles throughout this area. You stay home. We handle the vehicle. Done right the first time.",
    note: "Serving the Stockdale Highway corridor and surrounding neighborhoods.",
    mapQuery: "Stockdale,Bakersfield,CA",
  },
  "seven-oaks": {
    name: "Seven Oaks",
    metaTitle: "Mobile Detailing in Seven Oaks, Bakersfield | Metro Auto Detailing",
    metaDescription: "Mobile auto detailing in Seven Oaks, Bakersfield CA. Metro Auto Detailing comes to your home. Full detail, refresh detail, headlight restoration, and more.",
    headline: "Mobile Detailing in Seven Oaks, Bakersfield",
    intro: "Seven Oaks clients usually want the Full Detail or Refresh Detail. We show up, do the work, and leave the vehicle looking the way it should. No upselling on the driveway. Just the job you booked.",
    note: "Serving Seven Oaks and the surrounding southwest area.",
    mapQuery: "Seven+Oaks,Bakersfield,CA",
  },
  "oleander": {
    name: "Oleander",
    metaTitle: "Mobile Detailing in Oleander, Bakersfield | Metro Auto Detailing",
    metaDescription: "Mobile auto detailing in the Oleander neighborhood, Bakersfield CA. Metro Auto Detailing comes to your home. Book a detail online.",
    headline: "Mobile Detailing in Oleander, Bakersfield",
    intro: "Oleander is one of Bakersfield's older established neighborhoods. Long-term homeowners who want their vehicles treated right, not rushed through. We take the time to do it properly.",
    note: "Serving Oleander and the Sunset neighborhood.",
    mapQuery: "Oleander,Bakersfield,CA",
  },
};

const SERVICES = [
  { name: "Signature Wash", price: "$80", note: "Hand wash, wax coat, interior wipe" },
  { name: "Exterior Detail", price: "$150", note: "Full exterior decontamination and protection" },
  { name: "Interior Detail", price: "$200", note: "Deep clean, vacuum, panels, console" },
  { name: "Refresh Detail", price: "$250", note: "Interior + exterior combined" },
  { name: "Full Detail", price: "$400", note: "Complete top-to-bottom detail" },
];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = LOCATIONS[slug];
  if (!location) return {};
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `https://metroautodetailing.pro/locations/${slug}`,
      siteName: "Metro Auto Detailing",
      images: [{ url: "https://metroautodetailing.pro/hero-car-enhanced.jpg", width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return Object.keys(LOCATIONS).map((slug) => ({ slug }));
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = LOCATIONS[slug];
  if (!location) notFound();

  return (
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(250,194,5,0.05),transparent)]" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 pt-16 pb-24">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 text-brand-yellow text-xs font-bold tracking-[0.2em] uppercase border border-brand-yellow/50 rounded-full px-5 py-1.5">
            <MapPin className="w-3 h-3" />
            Bakersfield, CA&nbsp;&nbsp;·&nbsp;&nbsp;Fully Mobile
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight uppercase text-white text-center mb-6">
          {location.headline}
        </h1>

        {/* Intro */}
        <p className="text-white/60 text-base leading-relaxed text-center max-w-2xl mx-auto mb-4">
          {location.intro}
        </p>
        <p className="text-brand-yellow/70 text-sm font-bold text-center mb-14">
          {location.note}
        </p>

        {/* Divider */}
        <div className="h-px w-full mb-14" style={{ background: "linear-gradient(to right, transparent 0%, #fac205 25%, #fac205 75%, transparent 100%)" }} />

        {/* Services */}
        <div className="mb-14">
          <p className="text-xs font-black text-brand-yellow uppercase tracking-[0.2em] mb-6 text-center">
            Services
          </p>
          <div className="flex flex-col gap-3">
            {SERVICES.map((svc) => (
              <div key={svc.name} className="flex items-center justify-between px-5 py-4 rounded-xl border border-white/[0.07] bg-white/[0.02]">
                <div>
                  <p className="text-sm font-bold text-white">{svc.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{svc.note}</p>
                </div>
                <span className="text-sm font-black text-brand-yellow font-numeric shrink-0 ml-4">
                  {svc.price}+
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 text-center mt-4">
            Larger vehicles (trucks, SUVs, vans) add $20–$40. Add-ons available at booking.
          </p>
        </div>

        {/* Map */}
        <div className="mb-14">
          <p className="text-xs font-black text-brand-yellow uppercase tracking-[0.2em] mb-6 text-center">
            Service Area
          </p>
          <div className="rounded-2xl overflow-hidden border border-white/[0.07]">
            <iframe
              src={`https://maps.google.com/maps?q=${location.mapQuery}&output=embed&z=13`}
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${location.name} service area map`}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-yellow text-black font-black text-sm tracking-wide hover:bg-brand-yellow/90 transition-colors"
          >
            Get a Free Estimate
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-white/30 mt-4">
            Or call / text (661) 368-5165
          </p>
        </div>

      </div>
    </div>
  );
}
