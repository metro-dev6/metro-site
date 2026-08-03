import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AddonCard } from "@/components/sections/AddonCard";
import { EstimateCartBar } from "@/components/EstimateCartBar";
import { FAQ } from "@/components/sections/FAQ";
import { QuickContactForm } from "@/components/sections/QuickContactForm";

const SERVICES: Record<string, {
  name: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  "signature-wash": {
    name: "Signature Wash",
    metaTitle: "Mobile Signature Wash in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Hand wash, light wax, and interior wipe-down. Mobile service — we come to you in Bakersfield, CA. Starting at $80.",
  },
  "exterior-detail": {
    name: "Exterior Detail",
    metaTitle: "Mobile Exterior Detailing in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Full exterior decontamination, clay bar, and paint protection. Mobile service in Bakersfield, CA. Starting at $150.",
  },
  "interior-detail": {
    name: "Interior Detail",
    metaTitle: "Mobile Interior Detailing in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Deep interior cleaning — vacuumed, wiped, dressed, and protected. Mobile service in Bakersfield, CA. Starting at $200.",
  },
  "refresh-detail": {
    name: "Refresh Detail",
    metaTitle: "Mobile Refresh Detail in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Interior and exterior refresh for vehicles that need more than a wash. Mobile service in Bakersfield, CA. Starting at $250.",
  },
  "full-detail": {
    name: "Full Detail",
    metaTitle: "Mobile Full Detail in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Complete interior and exterior detail with full decontamination, clay bar, and paint protection. Mobile service in Bakersfield, CA. Starting at $400.",
  },
  "headlight-restoration": {
    name: "Headlight Restoration",
    metaTitle: "Mobile Headlight Restoration in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Cloudy headlights sanded, polished, and ceramic coated. Mobile service in Bakersfield, CA. $80.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `https://metroautodetailing.pro/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://metroautodetailing.pro/services/${slug}`,
      siteName: "Metro Auto Detailing",
      images: [{ url: "https://metroautodetailing.pro/hero-car-enhanced.jpg", width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

// ─── Exterior Detail content ─────────────────────────────────────────────────

const INCLUDES = [
  { step: "Hand wash & dry" },
  { step: "Iron remover", detail: "Dissolves bonded metallic contamination." },
  { step: "Tar and tree sap removal" },
  { step: "Clay bar", detail: "Removes remaining contamination, leaves paint smooth to the touch." },
  { step: "Koch Chemie S003", detail: "Ceramic base layer." },
  { step: "Stinger 918", detail: "SiO2 ceramic sealant applied over S003. 6+ months protection." },
  { step: "Wheels, rims, and fender wells cleaned" },
  { step: "Tire dressing" },
  { step: "Door jambs cleaned" },
  { step: "Windows cleaned" },
];

const PRODUCTS = [
  {
    name: "Koch Chemie S003",
    desc: "The ceramic base layer. Applied after washing to bond to the paint and prep the surface before the sealant goes on top. Lifts remaining contamination without contact, reducing wash-induced scratching.",
  },
  {
    name: "Stinger 918",
    desc: "An SiO2 ceramic sealant applied over the S003 base. Water sheets off instead of sitting, and paint stays cleaner longer between visits.",
    badge: "6+ Months Protection",
  },
];

const EXTERIOR_FAQS = [
  {
    q: "What is an iron remover?",
    a: "Brake dust and road grime embed ferrous particles in your paint. They cause rust spots over time. Iron remover dissolves them chemically before they do damage.",
  },
  {
    q: "What is clay bar?",
    a: "A clay bar grabs contamination that's bonded to the clear coat. After clay, paint feels slick instead of rough.",
  },
  {
    q: "How long does the ceramic protection last?",
    a: "6+ months on a daily driver in Bakersfield conditions.",
  },
  {
    q: "Does this include interior?",
    a: "No. Interior is a separate service.",
  },
];

const EXTERIOR_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: EXTERIOR_FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

// ─── Page component ───────────────────────────────────────────────────────────

function ExteriorDetailPage() {
  return (
    <main className="bg-site-bg text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(EXTERIOR_FAQ_SCHEMA) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">

        <div className="relative px-6 lg:px-8 py-20 lg:py-24 mx-auto max-w-7xl w-full grid lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16 items-center">

          {/* Copy */}
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-brand-yellow mb-4">
              Bakersfield, CA &middot; Fully Mobile
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-5">
              Exterior Detail
            </h1>
            <p className="text-lg text-white/80 max-w-[46ch] leading-relaxed mb-8">
              Full decontamination and paint protection in Bakersfield. Hand wash, iron decontamination,
              clay bar, and ceramic sealant. Mobile.
            </p>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-5xl font-black text-brand-yellow font-numeric leading-none">$150</span>
              <span className="text-sm text-white/60">+$20 larger vehicles</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center px-7 h-12 rounded-xl bg-brand-yellow text-black font-black tracking-wide text-sm hover:bg-brand-yellow/90 transition-colors"
              >
                Get a Free Estimate
              </Link>
              <a
                href="tel:6613685165"
                className="inline-flex items-center justify-center px-7 h-12 rounded-xl border border-white/30 text-white font-black tracking-wide text-sm hover:border-white/60 hover:bg-white/5 transition-colors"
              >
                Call (661) 368-5165
              </a>
            </div>
          </div>

          {/* Quick contact form */}
          <div>
            <QuickContactForm service="Exterior Detail" />
          </div>

        </div>
      </section>

      {/* MODULE 1: Is This The Right Service? — image left, copy right */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">
          <div className="relative h-64 lg:h-72 rounded-xl overflow-hidden bg-white/[0.03]">
            <Image
              src="/exterior-bg.JPEG"
              alt="Exterior paint detail close-up"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-5">
              Is This The Right Service?
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-[48ch]">
              Paint feels rough. Water isn&apos;t beading. The car&apos;s been sitting. This goes deeper
              than any wash can. If your paint is just dusty, a Signature Wash is enough.
            </p>
          </div>
        </div>
      </section>

      {/* MODULE 2: What's Included — copy left, sticky image right */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-8">
              What&apos;s Included
            </h2>
            <div className="flex flex-col">
              {INCLUDES.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-baseline py-4 border-b border-white/[0.06]"
                >
                  <span className="shrink-0 w-8 font-black text-2xl text-brand-yellow font-numeric leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-base font-bold text-white">{item.step}</p>
                    {item.detail && (
                      <p className="text-sm text-white/55 leading-relaxed mt-1">{item.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-24 relative h-80 rounded-xl overflow-hidden bg-white/[0.03]">
              <Image
                src="/wash-bg.JPEG"
                alt="Exterior detail process"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 3: Products & Protection — image left, copy right */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-10">
            Products &amp; Protection
          </h2>
          <div className="flex flex-col gap-12">
            {PRODUCTS.map((product) => (
              <div
                key={product.name}
                className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-12 items-center"
              >
                <div className="relative h-56 rounded-xl overflow-hidden bg-white/[0.03]">
                  <Image
                    src="/wash-bg-1.JPEG"
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-wide text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="text-base text-white/60 leading-relaxed max-w-[48ch] mb-4">
                    {product.desc}
                  </p>
                  {product.badge && (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-yellow/40 text-brand-yellow">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON: Where This Fits In The Lineup */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-10">
            Where This Fits In The Lineup
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-stretch">
            {/* Lighter tier */}
            <Link
              href="/services/signature-wash"
              className="flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-site-bg p-7 hover:border-white/20 transition-colors group"
            >
              <span className="inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-white/[0.12] text-white/40">
                Lighter
              </span>
              <h3 className="text-xl font-black uppercase text-white">Signature Wash</h3>
              <p className="font-black text-brand-yellow font-numeric">$80 <span className="text-sm font-medium text-white/40">+$20 larger</span></p>
              <p className="text-sm text-white/55 leading-relaxed flex-1">
                Hand wash, light wax coat, and a surface-level interior wipe down. The right call for
                routine maintenance. No decontamination, no clay.
              </p>
              <span className="text-xs font-bold uppercase tracking-wide text-brand-yellow group-hover:underline mt-auto">
                See Signature Wash &rarr;
              </span>
            </Link>

            {/* You are here */}
            <div className="flex lg:items-center justify-center py-2 lg:px-2">
              <div className="bg-brand-yellow text-black rounded-lg px-5 py-3 text-center">
                <p className="text-xs font-black uppercase tracking-wide leading-tight">You Are Here</p>
                <p className="text-xs font-black uppercase tracking-wide leading-tight">Exterior Detail</p>
              </div>
            </div>

            {/* Heavier tier */}
            <Link
              href="/services/full-detail"
              className="flex flex-col gap-3 rounded-xl border border-brand-yellow/30 bg-site-bg p-7 hover:border-brand-yellow/60 transition-colors group"
            >
              <span className="inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-brand-yellow text-black">
                Heavier
              </span>
              <h3 className="text-xl font-black uppercase text-white">Full Detail</h3>
              <p className="font-black text-brand-yellow font-numeric">$400 <span className="text-sm font-medium text-white/40">+$40 larger</span></p>
              <p className="text-sm text-white/55 leading-relaxed flex-1">
                The same exterior decontamination and ceramic protection, plus a full interior reset.
                Vacuum, shampoo, and UV dressing. Both sides of the car.
              </p>
              <span className="text-xs font-bold uppercase tracking-wide text-brand-yellow group-hover:underline mt-auto">
                See Full Detail &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* MODULE 4: Mobile Means Your Driveway — image left, copy right */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">
          <div className="relative h-64 lg:h-72 rounded-xl overflow-hidden bg-white/[0.03]">
            <Image
              src="/6cfdf17d879b1c336369a41a14884917.jpg"
              alt="Mobile detailing at a client driveway in Bakersfield"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-5">
              Mobile Means Your Driveway, Not Our Shop
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-[48ch]">
              We bring the water, power, and equipment. The work happens in your driveway, garage, or
              office lot. Wherever the car already is. We serve Bakersfield, Southwest Bakersfield,
              Stockdale, Seven Oaks, Rosedale, and Terra Vista.
            </p>
          </div>
        </div>
      </section>

      {/* ADD-ONS: Pairs Well With */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-10">
            Pairs Well With
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AddonCard
              name="Headlight Restoration"
              price="+$80"
              priceValue={80}
              description="Lenses sanded progressively, polished to remove surface scratches, prepped with IPA, and coated with a ceramic clear coat. Restores clarity and protects against UV."
            />
            <AddonCard
              name="Water Spot Removal"
              price="+$60"
              priceValue={60}
              description="Minerals from hard water etch into paint and glass over time. Left long enough, they cause permanent damage. Acid wash breaks down the mineral bond and removes them from both surfaces."
            />
            <AddonCard
              name="Trim Restoration"
              price="+$100"
              priceValue={100}
              description="Solution Finish applied to faded black plastic trim. Semi-permanent bond to the plastic, not a dressing that washes off in two weeks. Lasts at least 9 months."
            />
            <AddonCard
              name="Engine Bay Detail"
              price="+$50"
              priceValue={50}
              description="Degreased, cleaned, and dressed. Oil buildup and road grime removed. Everything looking right under the hood."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={EXTERIOR_FAQS} heading="Frequently Asked" />

      {/* CTA */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 bg-white/[0.02] border-t border-white/[0.06]">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none mb-3">
            Book Your Exterior Detail
          </h2>
          <p className="font-black text-3xl text-brand-yellow font-numeric mb-8">
            $150{" "}
            <span className="text-base font-medium text-white/55">+$20 larger vehicles</span>
          </p>
          <Link
            href="/estimate"
            className="inline-flex items-center justify-center px-8 h-13 rounded-xl bg-brand-yellow text-black font-black tracking-wide text-sm hover:bg-brand-yellow/90 transition-colors"
          >
            Request This Detail
          </Link>
        </div>
      </section>

      <EstimateCartBar />
    </main>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  if (slug === "exterior-detail") return <ExteriorDetailPage />;

  redirect("/services");
}
