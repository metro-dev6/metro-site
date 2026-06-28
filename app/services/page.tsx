import type { Metadata } from "next";
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
    description: "Hand wash, light wax coat, and a surface level interior wipe down. The right call for maintenance.",
    price: 80,
    largerVehicle: "+$20",
    features: [
      "Hand wash & dry",
      "Light wax coat (protection between washes)",
      "Wheels & rims cleaned",
      "Tire dressing",
      "Windows cleaned",
      "Door jambs cleaned",
      "Interior vacuum (surface level)",
      "All interior panels, compartments, and console cleaned (surface level)",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
  {
    name: "Refresh Detail",
    description: "Full exterior wash plus a thorough interior detail. Both done right in one visit.",
    price: 250,
    largerVehicle: "+$40",
    featured: true,
    features: [
      "Hand wash & dry",
      "Light wax coat",
      "Stinger 918 ceramic sealant topper",
      "Wheels, rims, & fender wells cleaned",
      "Tire dressing",
      "Full interior vacuum (thorough)",
      "All interior panels, compartments, and console cleaned",
      "Spot stain treatment on carpet and upholstery",
      "Windows (interior & exterior)",
      "Door jambs cleaned",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
  {
    name: "Full Detail",
    description: "Complete exterior decontamination finished with a ceramic sealant that protects and enhances your paint's appearance. Along with every interior surface cleaned and UV protected.",
    price: 400,
    largerVehicle: "+$40",
    features: [
      "Hand wash & dry",
      "Iron remover: dissolves bonded metallic contamination",
      "Acid wash: removes mineral deposits and water spots from paint and glass",
      "Tar and tree sap removal",
      "Clay bar: removes remaining contamination, leaves paint smooth to the touch",
      "Koch Chemie S003: ceramic base layer",
      "Stinger 918: SiO2 ceramic sealant applied over S003 (6+ months protection)",
      "Wheels, rims, & fender wells cleaned",
      "Tire dressing",
      "Door jambs cleaned",
      "Full interior vacuum (thorough)",
      "All interior panels, compartments, and console cleaned",
      "Carpet & seat shampoo with extraction",
      "CarPro PERL UV interior dressing",
      "Windows (interior & exterior)",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
];

const protectionPlans: MetroPlan[] = [
  {
    name: "Exterior Detail",
    description: "Full exterior decontamination finished with an SiO2 ceramic sealant. KC S003 as the base, Stinger 918 sealed on top. 6+ months of protection.",
    price: 150,
    largerVehicle: "+$20",
    features: [
      "Hand wash & dry",
      "Iron remover: dissolves bonded metallic contamination",
      "Tar and tree sap removal",
      "Clay bar: removes remaining contamination, leaves paint smooth to the touch",
      "Koch Chemie S003: ceramic base layer",
      "Stinger 918: SiO2 ceramic sealant applied over S003 (6+ months protection)",
      "Wheels, rims, & fender wells cleaned",
      "Tire dressing",
      "Door jambs cleaned",
      "Windows cleaned",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
  {
    name: "Full Detail",
    description: "Complete exterior decontamination finished with a ceramic sealant that protects and enhances your paint's appearance. Along with every interior surface cleaned and UV protected.",
    price: 400,
    largerVehicle: "+$40",
    featured: true,
    note: "The same ceramic protection as the Exterior Detail, combined with a full interior reset.",
    features: [
      "Hand wash & dry",
      "Iron remover: dissolves bonded metallic contamination",
      "Acid wash: removes mineral deposits and water spots from paint and glass",
      "Tar and tree sap removal",
      "Clay bar: removes remaining contamination, leaves paint smooth to the touch",
      "Koch Chemie S003: ceramic base layer",
      "Stinger 918: SiO2 ceramic sealant applied over S003 (6+ months protection)",
      "Wheels, rims, & fender wells cleaned",
      "Tire dressing",
      "Door jambs cleaned",
      "Full interior vacuum (thorough)",
      "All interior panels, compartments, and console cleaned",
      "Carpet & seat shampoo with extraction",
      "CarPro PERL UV interior dressing",
      "Windows (interior & exterior)",
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
      <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-normal leading-tight">
        {subheadline}
      </h2>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="bg-zinc-950 text-white">

      {/* Page Header */}
      <section className="relative pt-20 pb-14 px-6 lg:px-8 border-b border-white/[0.06] overflow-hidden">
        <BGPattern variant="diagonal-stripes" mask="fade-bottom" fill="rgba(250,194,5,0.04)" size={20} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <span className="inline-flex items-center text-brand-yellow text-[10px] font-bold tracking-[0.15em] uppercase border border-brand-yellow/50 rounded-full px-3 py-1 mb-6">
            Mobile Detailing - Bakersfield, CA
          </span>
          <div className="flex items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl sm:text-7xl font-black uppercase text-white tracking-normal mb-4">
                Services
              </h1>
              <p className="text-lg text-white/55 max-w-xl leading-relaxed">
                No shop. No drop-off. We bring everything needed to clean, protect, and restore. Wherever the vehicle is parked.
              </p>
            </div>
            <Image
              src="/1.png"
              alt="Metro Auto Detailing"
              width={200}
              height={200}
              className="hidden sm:block shrink-0 opacity-90 h-36 w-auto"
            />
          </div>
        </div>
      </section>

      {/* Section 1 — The Essentials */}
      <section id="essentials" className="relative py-24 px-6 lg:px-8 overflow-hidden scroll-mt-[108px]">
        <BGPattern variant="grid" mask="fade-edges" fill="rgba(250,194,5,0.03)" size={40} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <SectionLabel label="The Essentials" subheadline="Clean, refreshed, or completely reset." />
          <PackageCardGrid plans={essentialsPlans} columns={3} />
        </div>
      </section>

      {/* Section 2 — Protection */}
      <section className="relative py-24 px-6 lg:px-8 border-y border-white/[0.04] overflow-hidden">
        <BGPattern variant="diagonal-stripes" mask="fade-edges" fill="rgba(250,194,5,0.04)" size={20} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <SectionLabel label="Protection" subheadline="Keep your paint looking sharp longer." />
          <p className="text-sm text-white/60 leading-relaxed max-w-2xl mb-10">
            If your paint feels rough or looks dull despite being clean, it needs more than a wash. Hard water minerals, brake dust, and industrial fallout bond to paint and cannot be removed with soap and water. These services break down and remove that contamination, then seal the surface so it lasts.
          </p>
          <PackageCardGrid plans={protectionPlans} columns={2} />
        </div>
      </section>

      {/* Section 3 — Restoration */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <BGPattern variant="diagonal-stripes" mask="fade-edges" fill="rgba(250,194,5,0.04)" size={20} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <SectionLabel label="Restoration" subheadline="Bring back what faded or wore down." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AddonCard
              name="Headlight Restoration"
              price="$80"
              priceValue={80}
              description="Lenses sanded progressively, polished to remove surface scratches, prepped with IPA, and coated with a ceramic clear coat. Restores clarity and protects against UV."
            />
            <AddonCard
              name="Trim Restoration"
              price="$100"
              priceValue={100}
              description="Solution Finish applied to faded black plastic trim. Semi-permanent bond to the plastic, not a dressing that washes off in two weeks. Lasts at least 9 months. 12+ under ideal conditions."
            />
            <AddonCard
              name="Water Spot Removal"
              price="$100"
              priceValue={100}
              description="Water spots don't just sit on the surface. Minerals from hard water etch into paint and glass over time. Left long enough, they cause permanent damage. Acid wash breaks down the mineral bond and removes them from both surfaces."
            />
            <AddonCard
              name="Leather Conditioning"
              price="$40"
              priceValue={40}
              description="Leather cleaned, conditioned, and protected against drying and cracking. Better suited for aged leather. New leather still carries factory protective coatings that block the conditioner from penetrating."
            />
          </div>
        </div>
      </section>

      {/* Section 4 — Deep Clean */}
      <section className="relative py-24 px-6 lg:px-8 border-y border-white/[0.04] overflow-hidden">
        <BGPattern variant="grid" mask="fade-edges" fill="rgba(250,194,5,0.03)" size={40} className="z-0" />
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
              description="Stains pulled out of carpet and seats from deep in the material. More thorough than the surface spot treatment in a standard detail. The step for stains that didn't come out after a few passes."
            />
            <AddonCard
              name="Engine Bay Detail"
              price="$50"
              priceValue={50}
              description="Degreased, cleaned, and dressed. Oil buildup and road grime removed. Everything looking right under the hood."
            />
          </div>
        </div>
      </section>

      {/* Section 5 — Maintenance Plans */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <BGPattern variant="diagonal-stripes" mask="fade-edges" fill="rgba(250,194,5,0.04)" size={20} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <SectionLabel
            label="Maintenance Plans"
            subheadline="The longer you wait, the more work it takes."
          />
          <p className="text-sm text-white/60 leading-relaxed max-w-2xl mb-10">
            Price reflects condition at time of service. A car cleaned every two weeks stays clean. A car that goes three months between details has built-up contamination, road film, and interior grime that takes significantly longer to remove. Book a frequency that fits your schedule. The price matches the work.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              {
                frequency: "Every 2 Weeks",
                label: "Biweekly",
                price: "$80",
                note: "Car stays clean. Fast service.",
                items: [
                  "Hand wash & dry",
                  "Wheels, rims, & fender wells cleaned",
                  "Tire dressing",
                  "Windows (interior & exterior)",
                  "Door jambs cleaned",
                  "Interior vacuum (thorough)",
                  "All interior panels, compartments, and console cleaned",
                ],
              },
              {
                frequency: "Monthly",
                label: "Monthly",
                price: "$120",
                note: "More buildup. More thorough.",
                featured: true,
                items: [
                  "Hand wash & dry",
                  "Wheels, rims, & fender wells cleaned",
                  "Tire dressing",
                  "Windows (interior & exterior)",
                  "Door jambs cleaned",
                  "Interior vacuum (thorough)",
                  "All interior panels, compartments, and console cleaned",
                ],
              },
              {
                frequency: "Every 2 Months",
                label: "Bimonthly",
                price: "$200",
                note: "Significant buildup. Refresh needed.",
                items: [
                  "Hand wash & dry",
                  "Decontamination wash",
                  "Wheels, rims, & fender wells cleaned",
                  "Tire dressing",
                  "Windows (interior & exterior)",
                  "Door jambs cleaned",
                  "Interior vacuum (thorough)",
                  "All interior panels, compartments, and console cleaned",
                ],
              },
              {
                frequency: "Quarterly",
                label: "Quarterly",
                price: "$300",
                note: "3 months of buildup. Refresh needed.",
                items: [
                  "Hand wash & dry",
                  "Decontamination wash",
                  "Wheels, rims, & fender wells cleaned",
                  "Tire dressing",
                  "Windows (interior & exterior)",
                  "Door jambs cleaned",
                  "Interior vacuum (thorough)",
                  "All interior panels, compartments, and console cleaned",
                ],
              },
            ].map(({ frequency, label, price, note, items, featured }) => (
              <div
                key={label}
                className={`relative flex flex-col rounded-2xl p-7 gap-5 ${
                  featured
                    ? "border-2 border-brand-yellow bg-white/[0.03]"
                    : "border border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                {featured && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <div className="bg-brand-yellow py-1.5 px-4 rounded-full">
                      <span className="text-black text-xs font-black tracking-widest uppercase">Most Common</span>
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-1">{frequency}</p>
                  <div className="text-4xl font-bold text-brand-yellow font-numeric">{price}</div>
                  <p className="text-xs text-white/40 mt-2 leading-snug">{note}</p>
                </div>
                <ul className="flex flex-col gap-2 flex-1 border-t border-white/[0.06] pt-5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/65 leading-snug">
                      <span className="text-brand-yellow mt-0.5 shrink-0">&mdash;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-8 leading-relaxed max-w-xl">
            Pick a frequency that fits your schedule. We hold your recurring slot and charge per visit after each job is complete. No contracts. Cancel anytime.
          </p>
        </div>
      </section>

      <CTABanner />
      <EstimateCartBar />

    </main>
  );
}
