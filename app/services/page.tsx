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
    description: "Hand wash, wheels, tire dressing, wax coat, and interior vacuum. The right call every two weeks.",
    price: 80,
    largerVehicle: "+$20",
    features: [
      "Hand wash & dry",
      "Formula 4 wax coat (protection between washes)",
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
    description: "Full exterior wash plus a thorough interior clean. Both done right in one visit.",
    price: 250,
    largerVehicle: "+$40",
    featured: true,
    features: [
      "Hand wash & dry",
      "Formula 4 wax coat",
      "Stinger 918 ceramic topper",
      "Wheel & rim clean",
      "Tire dressing",
      "Full interior vacuum (thorough)",
      "Dashboard, console & door panels cleaned",
      "Spot treatment on carpet and upholstery",
      "CarPro PERL UV interior dressing",
      "Windows (interior & exterior)",
      "Door jambs cleaned",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
  {
    name: "Full Detail",
    description: "Complete exterior decontamination and ceramic sealant outside. Seats shampooed, carpet extracted, every surface UV protected inside.",
    price: 400,
    largerVehicle: "+$40",
    features: [
      "Iron remover: dissolves bonded metallic contamination",
      "Acid wash: removes mineral deposits and water spots from paint and glass",
      "Tar and tree sap removal",
      "Clay bar: leaves paint smooth to the touch",
      "Stinger 918 ceramic spray sealant (4-6 months protection)",
      "Full interior vacuum (thorough)",
      "Dashboard, console & door panels cleaned",
      "Carpet & seat shampoo with extraction",
      "CarPro PERL UV interior dressing",
      "Windows (interior & exterior)",
      "Door jambs cleaned",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
];

const protectionPlans: MetroPlan[] = [
  {
    name: "Exterior Detail",
    description: "Decontamination and Stinger 918 ceramic sealant. 4-6 months of protection for paint that needs real work.",
    price: 150,
    largerVehicle: "+$20",
    features: [
      "Hand wash & dry",
      "Iron remover: dissolves bonded metallic contamination",
      "Tar and tree sap removal",
      "Clay bar: removes remaining contamination, leaves paint smooth to the touch",
      "Koch Chemie S003 Hydro Foam: hydrophobic wash topper applied during rinse",
      "Stinger 918 Ceramic Spray Sealant: ceramic protection layer bonded to dry paint",
      "Wheel & fender well deep clean",
      "Tire dressing",
      "Door jambs cleaned",
      "Windows (interior & exterior)",
    ],
    buttonText: "Add to Estimate",
    href: "/estimate",
  },
  {
    name: "Full Detail",
    description: "Stinger 918 ceramic protection outside. Complete interior clean inside. Every surface covered.",
    price: 400,
    largerVehicle: "+$40",
    featured: true,
    note: "The same ceramic protection as the Exterior Detail, combined with a full interior reset.",
    features: [
      "Iron remover: dissolves bonded metallic contamination",
      "Acid wash: removes mineral deposits and water spots from paint and glass",
      "Tar and tree sap removal",
      "Clay bar: leaves paint smooth to the touch",
      "Koch Chemie S003 + Stinger 918 ceramic protection (4-6 months)",
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
              Mobile detailing in Bakersfield, CA. I come to you.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
              description="Solution Finish applied to faded black plastic trim. Semi-permanent bond to the plastic, not a dressing that washes off in two weeks."
            />
            <AddonCard
              name="Water Spot Removal"
              price="$100"
              priceValue={100}
              description="Hard water minerals bond to paint and glass and cannot be removed by washing alone. Treated and removed from both surfaces with a professional-grade acid wash."
            />
            <AddonCard
              name="Leather Conditioning"
              price="$40"
              priceValue={40}
              description="Leather cleaned, conditioned, and protected against drying and cracking. The step most people skip until the damage is done."
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
              description="Hot water extraction pulls stains, odors, and ground-in dirt out of carpet and seats. Not a surface clean. A deep pull."
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
        <BGPattern variant="vertical-lines" mask="fade-edges" fill="rgba(250,194,5,0.03)" size={36} className="z-0" />
        <div className="relative z-[1] mx-auto max-w-7xl">
          <SectionLabel
            label="Maintenance Plans"
            subheadline="The less often you clean, the more work it takes."
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
                  "Wheel & rim clean",
                  "Tire dressing",
                  "Window clean (exterior)",
                  "Door jambs wiped",
                  "Interior vacuum (quick)",
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
                  "Wheel & rim deep clean",
                  "Tire dressing",
                  "Interior vacuum (thorough)",
                  "Dashboard & console wipe",
                  "Windows (interior & exterior)",
                  "Door jambs cleaned",
                ],
              },
              {
                frequency: "Every 2 Months",
                label: "Bimonthly",
                price: "$200",
                note: "Significant buildup. Full reset needed.",
                items: [
                  "Hand wash & dry",
                  "Decontamination rinse",
                  "Deep wheel & fender clean",
                  "Interior vacuum (thorough)",
                  "Dashboard, console & panels wiped",
                  "Windows (interior & exterior)",
                  "Door jambs & sills cleaned",
                ],
              },
              {
                frequency: "Quarterly",
                label: "Quarterly",
                price: "$300",
                note: "3 months of buildup. Full detail required.",
                items: [
                  "Full exterior wash & decon",
                  "Clay bar if needed",
                  "Deep wheel & fender clean",
                  "Full interior vacuum",
                  "Dashboard, console & door panels",
                  "Carpet & seat shampoo",
                  "Windows (interior & exterior)",
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
            Pick a frequency that fits your schedule. I hold your recurring slot and charge per visit after each job is complete. No contracts. Cancel anytime.
          </p>
        </div>
      </section>

      <CTABanner />
      <EstimateCartBar />

    </main>
  );
}
