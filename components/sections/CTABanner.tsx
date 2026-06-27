import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShinyButton } from "@/components/ui/shiny-button";

export function CTABanner() {
  return (
    <section className="relative bg-black pt-20 pb-20 sm:pt-32 sm:pb-32 px-6 lg:px-8 overflow-hidden">
      <style>{`
        .cta-dim-layer { transition: background-color 0.5s ease; }
        section:has(.cta-btn:hover) .cta-dim-layer {
          background-color: rgba(0,0,0,0.35);
        }
      `}</style>

      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src="/25663209928_93902fe741_k.jpg"
          alt=""
          fill
          className="object-cover object-[center_95%]"
          aria-hidden="true"
        />
        {/* Radial gradient — darkens center for text readability, keeps edges bright */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.05) 75%)" }}
        />
        {/* Hover dim layer */}
        <div className="cta-dim-layer absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col items-center text-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <h2
            className="text-2xl sm:text-4xl font-black uppercase text-brand-white tracking-tight"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}
          >
            Book online. Get 10% off your first detail.
          </h2>
        </div>

        <Link href="/estimate" className="cta-btn">
          <ShinyButton
            className="bg-brand-yellow text-brand-black font-black tracking-widest h-12 px-7"
            style={{ "--primary": "46 96% 50%" } as React.CSSProperties}
          >
            Get a Free Estimate
          </ShinyButton>
        </Link>
      </div>

    </section>
  );
}
