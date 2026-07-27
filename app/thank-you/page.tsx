import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import ConversionEvent from "./ConversionEvent";

export const metadata: Metadata = {
  title: { absolute: "Request Received | Metro Auto Detailing" },
  description: "Your estimate request was received. We'll reach out within 2 hours to confirm.",
  robots: { index: false, follow: false },
};

function Divider() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(to right, transparent 0%, #fac205 25%, #fac205 75%, transparent 100%)",
      }}
    />
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-black tracking-[0.15em] uppercase text-brand-yellow text-center">
      {label}
    </p>
  );
}

const STEPS = [
  {
    n: "1",
    title: "I text you within 2 hours",
    desc: "Confirm your vehicle and what you need. If you have questions, I can call.",
  },
  {
    n: "2",
    title: "We lock in a price and date",
    desc: "You know the total before I show up. No surprises.",
  },
  {
    n: "3",
    title: "I come to your location",
    desc: "Home, work, wherever your car is. You don't go anywhere.",
  },
];

const CONTRASTS = [
  {
    q: "Most detailers charge extra for decontamination.",
    a: "Metro includes it in every full detail.",
  },
  {
    q: "A car wash rinses the surface.",
    a: "A detail removes what the wash leaves behind.",
  },
  {
    q: "No shop. No drop-off. No waiting.",
    a: "Metro comes to you.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-site-bg">
      <ConversionEvent />
      <div className="relative px-4 pt-14 pb-24">
        <div className="mx-auto max-w-lg flex flex-col items-center gap-10 text-center">

          {/* Section 1 — Confirmation */}
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="h-12 w-12 text-brand-yellow" />
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white leading-tight">
              REQUEST<br />
              <span className="text-brand-yellow">RECEIVED.</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed">
              I&apos;ll text you within 2 hours to confirm.
            </p>
            <p className="text-white/35 text-sm">
              Need it sooner? Call or text{" "}
              <a
                href="tel:6613685165"
                className="text-white/55 hover:text-white transition-colors"
              >
                (661) 368-5165
              </a>
              .
            </p>
          </div>

          <Divider />

          {/* Section 2 — What Happens Next */}
          <div className="flex flex-col gap-5 w-full text-left">
            <SectionLabel label="What Happens Next" />
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-3 items-start">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-brand-yellow text-brand-black font-black text-sm flex items-center justify-center">
                  {n}
                </div>
                <div className="flex flex-col gap-0.5 pt-0.5">
                  <p className="text-white font-bold text-[13px] leading-snug">{title}</p>
                  <p className="text-white/60 text-[12px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Divider />

          {/* Section 3 — Why Metro */}
          <div className="flex flex-col gap-4 w-full">
            <SectionLabel label="Why Metro" />
            {CONTRASTS.flatMap(({ q, a }, i) => [
              ...(i > 0
                ? [<div key={`d${i}`} className="h-px w-full bg-white/10" />]
                : []),
              <div key={i} className="flex flex-col gap-1 text-left">
                <p className="text-white/70 text-[12px]">{q}</p>
                <p className="text-white font-semibold text-[12px]">{a}</p>
              </div>,
            ])}
          </div>

          <Divider />

          {/* Section 4 — From a Client */}
          <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="From a Client" />
            <div
              className="bg-[#0f0f0f] rounded py-[14px] px-[16px] text-left"
              style={{ borderLeft: "3px solid #fac205" }}
            >
              <p className="text-white/80 text-[12px] italic leading-[1.7]">
                &ldquo;I scheduled Metro to come to me while I was at work. The carpet?
                Spotless. The vents? Free of dust. Even the tiny cracks where dust
                and dirt accumulate were cleaned. I couldn&apos;t be happier.&rdquo;
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-white/55 text-[11px]">— Kris C., Bakersfield</p>
                <p className="text-brand-yellow text-[12px]">★★★★★</p>
              </div>
            </div>
          </div>

          <Divider />

          {/* Section 5 — Metro Loyalty */}
          <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="Metro Loyalty" />
            <p className="text-white font-bold text-[13px] leading-snug">
              Book a qualifying detail. Start a maintenance plan.{" "}
              Every 3 visits, pick a free add-on.
            </p>
            <p className="text-brand-yellow font-bold text-[13px]">
              Engine bay. Hand wax. Headlight restoration. Your pick.
            </p>
            <p className="text-white/60 text-[12px]">
              No expiration. No code. I keep track.
            </p>
          </div>

          <Divider />

          {/* Section 6 — Our Guarantee */}
          <div className="flex flex-col items-center gap-3 w-full">
            <SectionLabel label="Our Guarantee" />
            <p className="text-white/70 text-[12px] leading-relaxed">
              Anything off after the job? Text within 24 hours.
              <br />
              I come back and fix it. No charge.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
