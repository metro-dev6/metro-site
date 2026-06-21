import type { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Services | Metro Auto Detailing",
  description: "Professional mobile detailing services in Bakersfield, CA. View packages, add-ons, fleet pricing, and book online.",
};

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-brand-yellow mt-0.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SectionLabel({ label, subheadline }: { label: string; subheadline: string }) {
  return (
    <div className="mb-10">
      <span className="inline-flex items-center text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase border border-brand-yellow/50 rounded-full px-5 py-1.5 mb-3">
        {label}
      </span>
      <p className="text-2xl sm:text-3xl font-black uppercase text-white/60 tracking-tight">
        {subheadline}
      </p>
    </div>
  );
}

interface PackageCardProps {
  name: string;
  tagline: string;
  price: string;
  largerPrice?: string;
  includes: string[];
  featured?: boolean;
  note?: string;
}

function PackageCard({ name, tagline, price, largerPrice, includes, featured, note }: PackageCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 gap-6 ${
        featured ? "border-brand-yellow" : "border-white/[0.08]"
      } bg-white/[0.02]`}
    >
      {featured && (
        <span className="absolute -top-3 right-6 bg-brand-yellow text-brand-black text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full">
          Best Value
        </span>
      )}
      <div>
        <h3 className="text-xl font-black uppercase text-brand-white tracking-tight">{name}</h3>
        <p className="text-sm text-white/50 mt-1.5 leading-snug">{tagline}</p>
      </div>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-4xl font-bold text-brand-yellow font-numeric">{price}</span>
        {largerPrice && (
          <span className="text-sm text-white/40">{largerPrice} larger vehicles</span>
        )}
      </div>
      <ul className="flex flex-col gap-2.5 flex-1">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-white/70 leading-snug">
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
      {note && (
        <p className="text-xs text-white/40 leading-relaxed border-t border-white/[0.06] pt-4">
          {note}
        </p>
      )}
      <Link
        href="/estimate"
        className={`block w-full py-3 rounded-xl text-sm font-bold tracking-wide text-center transition-colors mt-auto ${
          featured
            ? "bg-brand-yellow text-brand-black hover:bg-brand-yellow/90"
            : "border border-brand-yellow/40 text-brand-yellow hover:bg-brand-yellow hover:text-black"
        }`}
      >
        Book This Service
      </Link>
    </div>
  );
}

interface AddonCardProps {
  name: string;
  price: string;
  description: string;
}

function AddonCard({ name, price, description }: AddonCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-black uppercase text-brand-white leading-tight">{name}</h3>
        <span className="text-brand-yellow font-bold text-xl shrink-0 font-numeric">{price}</span>
      </div>
      <p className="text-sm text-white/55 leading-relaxed flex-1">{description}</p>
      <p className="text-xs text-white/35 pt-3 border-t border-white/[0.06]">
        Add to your detail — text (661) 368-5165
      </p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="bg-black text-white">

      {/* Page Header */}
      <section className="bg-black pt-36 pb-16 px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl sm:text-7xl font-black uppercase text-brand-white tracking-tight mb-4">
            Services
          </h1>
          <p className="text-lg text-white/55">
            Mobile detailing in Bakersfield, CA. We come to you.
          </p>
        </div>
      </section>

      {/* Section 1 — The Essentials */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel label="The Essentials" subheadline="Clean, refreshed, or completely reset." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PackageCard
              name="Signature Wash"
              tagline="Routine maintenance. In and out."
              price="$80"
              largerPrice="+$20"
              includes={[
                "Hand wash & dry",
                "Wheel & rim clean",
                "Tire dressing",
                "Window clean (exterior)",
                "Door jambs wiped",
                "Interior vacuum (quick)",
              ]}
            />
            <PackageCard
              name="Refresh Detail"
              tagline="Deep clean without the full package price."
              price="$250"
              largerPrice="+$40"
              includes={[
                "Hand wash & dry",
                "Wheel & rim clean",
                "Tire dressing",
                "Full interior vacuum (thorough)",
                "Dashboard, console & door panels wiped down",
                "Carpet & seat shampoo with extraction",
                "UV interior dressing",
                "Windows (interior & exterior)",
                "Door jambs cleaned",
              ]}
            />
            <PackageCard
              name="Full Detail"
              tagline="Complete reset. Inside and out."
              price="$400"
              largerPrice="+$40"
              featured
              includes={[
                "Everything in Exterior Detail",
                "Full interior vacuum (thorough)",
                "Dashboard, console & door panels wiped down",
                "Carpet & seat shampoo with extraction",
                "UV interior dressing",
                "Windows (interior & exterior)",
                "Door jambs cleaned",
                "Complete vehicle reset",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Section 2 — Protection */}
      <section className="py-24 px-6 lg:px-8 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel label="Protection" subheadline="Keep the paint looking right longer." />
          <p className="text-sm text-white/70 leading-relaxed max-w-2xl mb-10">
            If your paint feels rough or looks dull despite being clean, it needs more than a wash. Hard water minerals, brake dust, and industrial fallout bond to paint and can't be removed with soap and water. These services break down and remove that contamination, then seal the surface so it lasts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PackageCard
              name="Exterior Detail"
              tagline="Decon, clay bar, and ceramic protection. Built for paint that needs real work."
              price="$150"
              largerPrice="+$20"
              includes={[
                "Hand wash & dry",
                "Decontamination treatment (iron or acid wash — selected based on paint condition)",
                "Clay bar — removes bonded contamination, leaves paint smooth to the touch",
                "Koch Chemie S003 Hydro Foam — hydrophobic wash topper applied during rinse",
                "Stinger 918 Ceramic Spray Sealant — ceramic protection layer bonded to dry paint",
                "Wheel & fender well deep clean",
                "Bug & tar removal",
                "Tire dressing",
                "Door jambs cleaned",
                "Windows (interior & exterior)",
              ]}
            />
            <PackageCard
              name="Full Detail"
              tagline="Full exterior protection plus a complete interior clean."
              price="$400"
              largerPrice="+$40"
              featured
              note="The same ceramic protection as the Exterior Detail, combined with a full interior reset."
              includes={[
                "Complete exterior decontamination (iron or acid wash)",
                "Clay bar treatment",
                "Koch Chemie S003 + Stinger 918 ceramic protection",
                "Full interior vacuum, shampoo & extraction",
                "UV interior dressing",
                "Everything protected inside and out",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Section 3 — Restoration */}
      <section className="py-24 px-6 lg:px-8 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel label="Restoration" subheadline="Bring back what faded or wore down." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <AddonCard
              name="Headlight Restoration"
              price="$100"
              description="Cloudy or yellowed lenses sanded progressively, prepped with IPA, and coated with Cerakote ceramic clear coat. Restores clarity and protects against UV."
            />
            <AddonCard
              name="Trim Restoration"
              price="$100"
              description="Faded black plastic trim restored. Color and UV protection brought back."
            />
            <AddonCard
              name="Leather Conditioning"
              price="$40"
              description="Leather surfaces cleaned, conditioned, and protected. Prevents cracking and fading."
            />
          </div>
        </div>
      </section>

      {/* Section 4 — Deep Clean */}
      <section className="py-24 px-6 lg:px-8 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel label="Deep Clean" subheadline="For the tough stuff that needs more than a standard detail." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <AddonCard
              name="Pet Hair & Sand Removal"
              price="$80"
              description="Full extraction of embedded pet hair and sand from carpet and seats. Priced separately because it takes significantly longer than a standard vacuum."
            />
            <AddonCard
              name="Carpet & Seat Extraction"
              price="$70"
              description="Hot water extraction for deep-seated stains, odors, and ground-in dirt."
            />
            <AddonCard
              name="Engine Bay Detail"
              price="$50"
              description="Degreased, cleaned, and dressed. Removes oil buildup and road grime."
            />
          </div>
        </div>
      </section>

      {/* Section 5 — Fleet & Commercial */}
      <section className="py-24 px-6 lg:px-8 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl">
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

    </main>
  );
}
