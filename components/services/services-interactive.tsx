"use client";

import { motion } from "framer-motion";
import { staggerContainerMount, staggerItem } from "@/lib/motion";
import { Section, SectionLabel } from "@/components/ui/section";
import { LightCard } from "@/components/ui/cards";
import { SizeProvider } from "./size-context";
import { VehicleSizeSelector } from "./vehicle-size-selector";
import { ServicePackageCard } from "./service-package-card";
import { ServicePrice } from "./service-price";
import { SERVICES, MAINTENANCE_PLANS, ADDONS } from "./services-data";

export function ServicesInteractive() {
  return (
    <SizeProvider>
      <VehicleSizeSelector />

      {/* The Essentials */}
      <Section className="py-16">
        <SectionLabel
          label="The Essentials"
          heading="Clean, refreshed, or completely reset."
          sub="Every exterior package includes paint protection. Clay n Seal is the only one with decontamination."
        />
        <motion.div {...staggerContainerMount} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div key={service.slug} variants={staggerItem}>
              <ServicePackageCard service={service} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Add-Ons (light cards) */}
      <Section className="py-16">
        <SectionLabel label="Add-Ons" heading="Stack these onto any package." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADDONS.map((addon) => (
            <LightCard key={addon.name} className="flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-black uppercase tracking-tight text-brand-black leading-tight">
                  {addon.name}
                </h3>
                <span className="shrink-0 font-numeric font-black tabular-nums text-base bg-brand-yellow text-black rounded-full px-3 py-1">
                  +${addon.price}
                </span>
              </div>
              <p className="text-base text-black/55 mt-3 leading-relaxed">{addon.blurb}</p>
            </LightCard>
          ))}
        </div>
      </Section>

      {/* Maintenance Plans */}
      <Section className="py-16">
        <SectionLabel
          label="Maintenance Plans"
          heading="The longer you wait, the more work it takes."
          sub="Plans start after your first service. We keep that same service going on the schedule you choose, and the more often we come out, the less each visit costs. No contracts, cancel anytime."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MAINTENANCE_PLANS.map((plan) => (
            <LightCard key={plan.name} featured={plan.mostCommon} className="relative flex flex-col p-6">
              {plan.mostCommon && (
                <span className="absolute -top-3 left-6 bg-brand-yellow text-black text-[11px] font-black tracking-[0.14em] uppercase px-3 py-1 rounded-full">
                  Most Common
                </span>
              )}
              <h3 className="text-xl font-black uppercase tracking-tight text-brand-black">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mt-4 mb-1">
                <ServicePrice prices={plan.prices} className="text-3xl text-brand-black" />
                <span className="text-sm text-black/40">/ visit</span>
              </div>
              <p className="text-base text-black/60 mt-3 leading-snug">{plan.note}</p>
            </LightCard>
          ))}
        </div>
      </Section>
    </SizeProvider>
  );
}
