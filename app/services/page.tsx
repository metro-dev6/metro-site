import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTABanner } from "@/components/sections/CTABanner";
import { PackageCardGrid, type MetroPlan } from "@/components/sections/PackageCardGrid";
import { AddonCard } from "@/components/sections/AddonCard";
import { EstimateCartBar } from "@/components/EstimateCartBar";
import { BGPattern } from "@/components/bg-pattern";

export const metadata: Metadata = {
  title: "Services | Metro Auto Detailing",
  description: "Professional mobile detailing services in Bakersfield, CA. View packages, add-ons, fleet pricing, and book online.",
};

const essentialsPlans: MetroPlan[] = [
  {
    name: "Signature Wash",
    description: "Routine maintenance. In and out.",
    price: 80,
    largerVehicle: "+$20",
    features: [
      "Hand wash & dry",
      "Wheel & rim clean",
      "Tire dressing",
      "Window clean (exterior)",
      "Door jambs wiped",
      "Interior vacuum (quick)",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
  {
    name: "Refresh Detail",
    description: "Deep clean without the full package price.",
    price: 250,
    largerVehicle: "+$40",
    featured: true,
    features: [
      "Hand wash & dry",
      "Wheel & rim clean",
      "Tire dressing",
      "Full interior vacuum (thorough)",
      "Dashboard, console & door panels wiped down",
      "Carpet & seat shampoo with extraction",
      "UV interior dressing",
      "Windows (interior & exterior)",
      "Door jambs cleaned",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
  {
    name: "Full Detail",
    description: "Complete reset. Inside and out.",
    price: 400,
    largerVehicle: "+$40",
    features: [
      "Everything in Exterior Detail",
      "Full interior vacuum (thorough)",
      "Dashboard, console & door panels wiped down",
      "Carpet & seat shampoo with extraction",
      "UV interior dressing",
      "Windows (interior & exterior)",
      "Door jambs cleaned",
      "Complete vehicle reset",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
];

const protectionPlans: MetroPlan[] = [
  {
    name: "Exterior Detail",
    description: "Decon, clay bar, and ceramic protection. Built for paint that needs real work.",
    price: 150,
    largerVehicle: "+$20",
    features: [
      "Hand wash & dry",
      "Decontamination treatment (iron or acid wash, selected based on paint condition)",
      "Clay bar: removes bonded contamination, leaves paint smooth to the touch",
      "Koch Chemie S003 Hydro Foam: hydrophobic wash topper applied during rinse",
      "Stinger 918 Ceramic Spray Sealant: ceramic protection layer bonded to dry paint",
      "Wheel & fender well deep clean",
      "Bug & tar removal",
      "Tire dressing",
      "Door jambs cleaned",
      "Windows (interior & exterior)",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
  {
    name: "Full Detail",
    description: "Full exterior protection plus a complete interior clean.",
    price: 400,
    largerVehicle: "+$40",
    featured: true,
    note: "The same ceramic protection as the Exterior Detail, combined with a full interior reset.",
    features: [
      "Complete exterior decontamination (iron or acid wash)",
      "Clay bar treatment",
      "Koch Chemie S003 + Stinger 918 ceramic protection",
      "Full interior vacuum, shampoo & extraction",
      "UV interior dressing",
      "Everything protected inside and out",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
];

function SectionLabel({ label, subheadline }: { label: string; subheadline: string }) {
  return (
    <div className="mb-10">
      <span className="inline-flex items-center text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase border border-brand-yellow/50 rounded-full px-5 py-1.5 mb-4">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
        {subheadline}
      </h2>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="bg-black text-white">

      {/* Page Header */}
      <section className="relative bg-black pt-36 pb-16 px-6 lg:px-8 border-b border-white/[0.06] overflow-hidden">
        <BGPattern variant="dots" mask="fade-bottom" fill="rgba(255,255,255,0.04)" size={28} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl flex items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl sm:text-7xl font-black uppercase text-white tracking-tight mb-4">
              Services
            </h1>
            <p className="text-lg text-white/55">
              Mobile detailing in Bakersfield, CA. We come to you.
            </p>
          </div>
          <Image
            src="/1.png"
            alt="Metro Auto Detailing"
            width={200}
            height={200}
            className="shrink-0 opacity-90 h-36 w-auto"
          />
        </div>
      </section>

      {/* Section 1 — The Essentials */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <BGPattern variant="grid" mask="fade-edges" fill="rgba(255,255,255,0.03)" size={40} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <SectionLabel label="The Essentials" subheadline="Clean, refreshed, or completely reset." />
          <PackageCardGrid plans={essentialsPlans} columns={3} />
        </div>
      </section>

      {/* Section 2 — Protection */}
      <section className="relative py-24 px-6 lg:px-8 bg-zinc-950 border-y border-white/[0.04] overflow-hidden">
        <BGPattern variant="diagonal-stripes" mask="fade-edges" fill="rgba(250,194,5,0.04)" size={20} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <SectionLabel label="Protection" subheadline="Keep the paint looking right longer." />
          <p className="text-sm text-white/60 leading-relaxed max-w-2xl mb-10">
            If your paint feels rough or looks dull despite being clean, it needs more than a wash. Hard water minerals, brake dust, and industrial fallout bond to paint and cannot be removed with soap and water. These services break down and remove that contamination, then seal the surface so it lasts.
          </p>
          <PackageCardGrid plans={protectionPlans} columns={2} />
        </div>
      </section>

      {/* Section 3 — Restoration */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <BGPattern variant="horizontal-lines" mask="fade-edges" fill="rgba(255,255,255,0.03)" size={32} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <SectionLabel label="Restoration" subheadline="Bring back what faded or wore down." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <AddonCard
              name="Headlight Restoration"
              price="$100"
              priceValue={100}
              description="Cloudy or yellowed lenses sanded progressively, prepped with IPA, and coated with Cerakote ceramic clear coat. Restores clarity and protects against UV."
            />
            <AddonCard
              name="Trim Restoration"
              price="$100"
              priceValue={100}
              description="Faded black plastic trim restored. Color and UV protection brought back."
            />
            <AddonCard
              name="Leather Conditioning"
              price="$40"
              priceValue={40}
              description="Leather surfaces cleaned, conditioned, and protected. Prevents cracking and fading."
            />
          </div>
        </div>
      </section>

      {/* Section 4 — Deep Clean */}
      <section className="relative py-24 px-6 lg:px-8 bg-zinc-950 border-y border-white/[0.04] overflow-hidden">
        <BGPattern variant="dots" mask="fade-center" fill="rgba(255,255,255,0.04)" size={24} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <SectionLabel label="Deep Clean" subheadline="For the tough stuff that needs more than a standard detail." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <AddonCard
              name="Pet Hair & Sand Removal"
              price="$80"
              priceValue={80}
              description="Full extraction of embedded pet hair and sand from carpet and seats. Priced separately because it takes significantly longer than a standard vacuum."
            />
            <AddonCard
              name="Carpet & Seat Extraction"
              price="$70"
              priceValue={70}
              description="Hot water extraction for deep-seated stains, odors, and ground-in dirt."
            />
            <AddonCard
              name="Engine Bay Detail"
              price="$50"
              priceValue={50}
              description="Degreased, cleaned, and dressed. Removes oil buildup and road grime."
            />
          </div>
        </div>
      </section>

      {/* Section 5 — Fleet & Commercial */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <BGPattern variant="vertical-lines" mask="fade-edges" fill="rgba(250,194,5,0.03)" size={36} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <SectionLabel
            label="Fleet & Commercial"
            subheadline="We come to your lot. No drop-off. No scheduling around your operations."
          />
          <div className="rounded-2xl bg-[#0a0a0a] border border-white/[0.06] p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { service: "Exterior Wash", rate: "$7/ft" },
                    { service: "+ Roof Wash", rate: "+$3/ft" },
                    { service: "+ Interior Detail", rate: "+$4/ft" },
                    { service: "Wash & Wax", rate: "$10/ft" },
                  ].map(({ service, rate }) => (
                    <tr key={service} className="border-b border-white/[0.06]">
                      <td className="py-4 text-white/70">{service}</td>
                      <td className="py-4 text-right font-bold text-brand-yellow font-numeric">
                        {rate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-white/40 mt-5 leading-relaxed">
                A 20 ft vehicle exterior wash = $140. A 5-vehicle fleet = from $700 per cycle.
              </p>
            </div>
            <div className="flex flex-col gap-6 justify-between">
              <p className="text-base text-white/70 leading-relaxed">
                Metro handles fleet detailing at your location on weekends. We work around your schedule, price per linear foot, and start with one vehicle so you can see the work before committing to the full fleet.
              </p>
              <Link
                href="/contact"
                className="inline-block w-full lg:w-auto px-8 py-3 rounded-xl bg-brand-yellow text-brand-black text-sm font-black tracking-wide hover:bg-brand-yellow/90 transition-colors text-center"
              >
                Get a Fleet Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <EstimateCartBar />

    </main>
  );
}
