import type { Metadata } from "next";
import { Suspense } from "react";
import { EstimateForm } from "./EstimateForm";

export const metadata: Metadata = {
  title: "Book a Detail | Metro Auto Detailing",
  description:
    "Request mobile detailing in Bakersfield, CA. I come to you.",
};

export default function EstimatePage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Dot grid texture */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      {/* Yellow glow — subtle, letters carry the color */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(250,194,5,0.06),transparent)]" />

      <div className="relative px-4 pt-14 pb-24">
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <div className="mb-8 text-center">
            <span className="inline-flex items-center text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase border border-brand-yellow/50 rounded-full px-5 py-1.5 mb-6">
              Bakersfield, CA&nbsp;&nbsp;·&nbsp;&nbsp;Fully Mobile
            </span>
            <h1 className="text-5xl sm:text-6xl font-black leading-[1] tracking-tight uppercase mb-4">
              <span className="text-white block">Book Your</span>
              <span
                className="text-brand-yellow block"
                style={{ textShadow: "0 0 24px rgba(250,194,5,0.55), 0 0 60px rgba(250,194,5,0.25)" }}
              >
                Detail
              </span>
            </h1>
            <p className="text-white/50 text-base max-w-xs mx-auto">
              I come to you. Tell me what you need and I&apos;ll reach out to confirm.
            </p>
          </div>

          {/* Yellow accent line */}
          <div
            className="h-px w-full mb-8"
            style={{ background: "linear-gradient(to right, transparent 0%, #fac205 25%, #fac205 75%, transparent 100%)" }}
          />

          {/* Trust strip */}
          <div className="flex justify-center items-center gap-6 sm:gap-10 mb-10 text-center">
            <div>
              <div className="text-2xl font-black text-brand-yellow font-dm-sans leading-none mb-1">100%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Mobile</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-2xl font-black text-brand-yellow font-dm-sans leading-none mb-1">5.0</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Star Rating</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-2xl font-black text-brand-yellow font-dm-sans leading-none mb-1">FREE</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Estimates</div>
            </div>
          </div>

          <Suspense fallback={<div className="h-96 rounded-2xl bg-white/[0.03] animate-pulse" />}>
            <EstimateForm />
          </Suspense>

        </div>
      </div>
    </div>
  );
}
