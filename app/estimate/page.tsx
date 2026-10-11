import type { Metadata } from "next";
import { Suspense } from "react";
import { EstimateForm } from "./EstimateForm";
import { WhatHappensNext } from "./WhatHappensNext";
import { PageHeader, Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: { absolute: "Book Mobile Detailing in Bakersfield, CA | Metro Auto Detailing" },
  description: "Request mobile detailing in Bakersfield, CA. We come to you. No drop-off required.",
  alternates: { canonical: "https://metroautodetailing.pro/estimate" },
};

export default function EstimatePage() {
  return (
    <main className="min-h-screen bg-site-surface text-brand-black">
      <PageHeader
        align="center"
        eyebrow="Bakersfield, Fully Mobile"
        title={<>Book Your <span className="font-accent text-brand-yellow">Detail</span></>}
        sub="We come to you. Tell us what you need and we'll reach out to confirm your appointment."
      />

      <Section className="pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Trust strip */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10">
            <TrustStat value="100%" label="Mobile" />
            <div className="h-8 w-px bg-black/10" />
            <TrustStat value="5.0" label="Star Rating" />
            <div className="h-8 w-px bg-black/10" />
            <TrustStat value="FREE" label="Estimates" />
          </div>

          <Suspense fallback={<div className="h-96 rounded-2xl bg-black/[0.03] animate-pulse" />}>
            <EstimateForm />
          </Suspense>
        </div>

        <div className="max-w-4xl mx-auto">
          <WhatHappensNext />
        </div>
      </Section>
    </main>
  );
}

function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-black text-brand-yellow font-dm-sans leading-none mb-1">{value}</div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">{label}</div>
    </div>
  );
}
