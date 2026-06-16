import React from "react";
import Image from "next/image";
import { ShinyButton } from "@/components/ui/shiny-button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col bg-zinc-950 overflow-hidden">

      {/* Background photo */}
      <Image
        src="/hero-car-enhanced.jpg"
        alt=""
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
      />

      {/* Dark overlay — heavier left (text side) fading lighter right (car side) */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.70) 40%, rgba(0,0,0,0.40) 100%)" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center mx-auto w-full max-w-7xl px-6 lg:px-8 pt-16 md:pt-0">
        <div className="max-w-4xl w-full text-center mx-auto">

          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase border border-brand-yellow/50 rounded-full px-5 py-1.5">
              Bakersfield, CA&nbsp;&nbsp;·&nbsp;&nbsp;Fully Mobile
            </span>
          </div>

          <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1] tracking-tight uppercase mb-6">
            <span className="text-brand-white">Bakersfield&apos;s Premier</span><br />
            <span className="text-brand-yellow">Mobile Detailing</span>
            <span className="text-brand-white"> Service</span>
          </h1>

          <p className="text-base md:text-lg text-brand-white/60 max-w-md mx-auto mb-10 leading-relaxed">
            Professional detailing at your door because your time is worth it.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/estimate">
              <ShinyButton
                className="bg-brand-yellow text-brand-black font-black tracking-widest h-12 px-7"
                style={{ "--primary": "46 96% 50%" } as React.CSSProperties}
              >
                Get a Free Estimate
              </ShinyButton>
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center rounded-md border border-white/20 px-7 text-xs font-bold text-brand-white uppercase tracking-widest transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Our Services
            </Link>
          </div>

        </div>
      </div>

      {/* Stat bar */}
      <div className="relative z-10 overflow-hidden bg-black">

        {/* Yellow accent line — top, fades at edges */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent 0%, #fac205 25%, #fac205 75%, transparent 100%)" }} />

        {/* Top-down gradient wash */}
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(250,194,5,0.06) 0%, transparent 100%)" }} />

        {/* Yellow accent line — bottom, fades at edges */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent 0%, #fac205 25%, #fac205 75%, transparent 100%)" }} />

        {/* Bottom-up gradient wash */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(250,194,5,0.04) 0%, transparent 100%)" }} />

        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">

          {/* Years Experience */}
          <div className="flex flex-col items-center gap-3 px-6 py-6 border-r border-b md:border-b-0 border-white/[0.07]">
            <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 8px rgba(250,194,5,0.7))" }}>
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className="text-4xl font-black text-white font-dm-sans leading-none" style={{ textShadow: "0 0 24px rgba(250,194,5,0.25)" }}>5+</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 text-center">Years Experience</span>
          </div>

          {/* Star Rating */}
          <div className="flex flex-col items-center gap-3 px-6 py-6 border-b md:border-b-0 md:border-r border-white/[0.07]">
            <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 8px rgba(250,194,5,0.7))" }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-4xl font-black text-white font-dm-sans leading-none" style={{ textShadow: "0 0 24px rgba(250,194,5,0.25)" }}>5.0</span>
              <div className="flex gap-0.5">
                {[0,1,2,3,4].map((i) => (
                  <svg key={i} className="w-3 h-3 text-brand-yellow" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 text-center">Star Rating</span>
          </div>

          {/* Mobile Service */}
          <div className="flex flex-col items-center gap-3 px-6 py-6 border-r border-white/[0.07]">
            <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 8px rgba(250,194,5,0.7))" }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="text-4xl font-black text-white font-dm-sans leading-none" style={{ textShadow: "0 0 24px rgba(250,194,5,0.25)" }}>100%</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 text-center">Mobile Service</span>
          </div>

          {/* Free Estimates */}
          <div className="flex flex-col items-center gap-3 px-6 py-6">
            <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 8px rgba(250,194,5,0.7))" }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span className="text-4xl font-black text-white font-dm-sans leading-none" style={{ textShadow: "0 0 24px rgba(250,194,5,0.25)" }}>24/7</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 text-center">Free Estimates</span>
          </div>

        </div>
      </div>

    </section>
  );
}
