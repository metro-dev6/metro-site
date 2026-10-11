"use client";

import Link from "next/link";
import { useVehicleSize } from "./size-context";
import { LightCard } from "@/components/ui/cards";
import { ServicePrice } from "./service-price";
import type { Service } from "./services-data";

function Check() {
  return (
    <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-yellow">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export function ServicePackageCard({ service, index }: { service: Service; index: number }) {
  const { size } = useVehicleSize();
  const isOversized = size === "oversized";

  return (
    <LightCard featured={service.mostPopular} className="relative flex flex-col overflow-hidden">
      {service.mostPopular && (
        <span className="absolute top-4 left-5 z-10 bg-brand-yellow text-black text-[11px] font-black tracking-[0.14em] uppercase px-3 py-1.5 rounded-full">
          Most Popular
        </span>
      )}

      {/* Proof photo (placeholder until operator supplies) */}
      {service.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={service.image} alt={`${service.name} result in Bakersfield, CA`} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44 flex items-center justify-center bg-black/[0.06] text-black/35 text-xs tracking-wide uppercase">
          Photo: {service.name} (placeholder)
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-2xl font-black uppercase tracking-tight text-brand-black">{service.name}</h3>
          <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-black/45 bg-black/[0.05] rounded-full px-2.5 py-1">
            {isOversized ? "Quoted" : service.timeEstimate[size]}
          </span>
        </div>

        <p className="text-base text-black/60 mt-2 mb-4 leading-relaxed">{service.description}</p>

        <div className="flex items-baseline gap-2 pb-4 mb-4 border-b border-black/10">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-black/40">From</span>
          <ServicePrice prices={service.prices} index={index} className="text-4xl text-brand-black" />
        </div>

        <ul className="flex flex-col gap-2.5 mb-5">
          {service.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-base text-brand-black leading-snug">
              <Check />
              {f}
            </li>
          ))}
          {service.excludedFeatures?.map((f) => (
            <li key={f} className="flex gap-2.5 text-base text-black/35 line-through leading-snug">
              <span className="mt-0.5 shrink-0 w-4 h-4 inline-flex items-center justify-center text-black/30">&times;</span>
              {f}
            </li>
          ))}
        </ul>

        {service.upgrade && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-brand-yellow/50 bg-brand-yellow/10 px-3.5 py-3">
            <span className="shrink-0 font-numeric font-black text-brand-black text-sm">+${service.upgrade.price}</span>
            <span className="text-sm text-black/70 leading-snug">{service.upgrade.text}</span>
          </div>
        )}

        {isOversized ? (
          <Link
            href={`/estimate?services=${encodeURIComponent(service.name)}`}
            className="mt-auto inline-flex items-center justify-center py-3.5 rounded-xl bg-black text-white font-black text-sm uppercase tracking-wide transition-transform duration-150 active:scale-[0.97]"
          >
            Get a Quote
          </Link>
        ) : (
          <Link
            href={`/estimate?services=${encodeURIComponent(service.name)}&size=${size}`}
            className={`mt-auto inline-flex items-center justify-center py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition-transform duration-150 active:scale-[0.97] ${
              service.mostPopular ? "bg-brand-yellow text-black" : "bg-black text-white"
            }`}
          >
            Book Now
          </Link>
        )}
      </div>
    </LightCard>
  );
}
