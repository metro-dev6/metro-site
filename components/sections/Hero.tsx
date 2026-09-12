import React from "react";
import Image from "next/image";
import { ShinyButton } from "@/components/ui/shiny-button";
import Link from "next/link";

const USE_VIDEO = true;
const VIDEO_SRC = "/hero-bg.mp4";
const FALLBACK_IMG = "/exterior-bg.JPEG";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-site-bg overflow-hidden">

      {/* Background — video or photo */}
      {USE_VIDEO ? (
        <>
          <style>{`
            .hero-dim-layer { transition: background-color 0.5s ease; }
            section:has(.hero-cta:hover) .hero-dim-layer {
              background-color: rgba(0,0,0,0.35);
            }
          `}</style>
          {/* Static image on mobile — div avoids Next.js Image override on objectPosition */}
          <div
            className="md:hidden absolute inset-0"
            style={{ backgroundImage: `url(${FALLBACK_IMG})`, backgroundSize: "contain", backgroundPosition: "center top", backgroundRepeat: "no-repeat" }}
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: "center",
            }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </>
      ) : (
        <Image
          src={FALLBACK_IMG}
          alt=""
          aria-hidden="true"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
      )}

      {/* Dark overlay — heavier left (text side) fading lighter right (car side) */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 40%, rgba(0,0,0,0.12) 100%)" }}
      />
      {/* Dim layer — activates when CTA button is hovered */}
      <div className="hero-dim-layer absolute inset-0" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col md:items-center md:justify-center mx-auto w-full max-w-7xl px-6 lg:px-8">

        {/* Text block — fills space on mobile, centers within that zone */}
        <div className="flex-1 md:flex-none flex items-center justify-center w-full">
          <div className="max-w-4xl w-full text-center mx-auto -mt-4 md:mt-0">

            <div
              className="font-accent text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-brand-yellow mb-4 sm:mb-5 not-italic"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
            >
              Bakersfield &middot; Fully Mobile
            </div>

            <h1
              className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] sm:leading-[1] tracking-tight uppercase mb-4 sm:mb-6"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              <span className="text-brand-white">Bakersfield&apos;s Premier</span><br />
              <span className="font-accent normal-case text-brand-yellow">{" "}Mobile Detailing</span>
              <span className="text-brand-white"> Service</span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg text-brand-white/70 max-w-md mx-auto mb-6 sm:mb-10 leading-relaxed"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
            >
              Professional detailing at your door because your time is worth it.
            </p>

            {/* Desktop CTA — inline with text */}
            <div className="hidden md:flex flex-wrap gap-4 justify-center">
              <Link href="/estimate" className="hero-cta">
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

        {/* Mobile CTA — separate zone, pinned below text */}
        <div className="md:hidden flex justify-center pb-20">
          <Link href="/estimate" className="hero-cta">
            <ShinyButton
              className="bg-brand-yellow text-brand-black font-black tracking-widest h-12 px-7"
              style={{ "--primary": "46 96% 50%" } as React.CSSProperties}
            >
              Get a Free Estimate
            </ShinyButton>
          </Link>
        </div>

      </div>

      {/* Trust strip — full-bleed yellow band */}
      <div className="relative z-10 bg-brand-yellow py-10 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-3 gap-6 text-center">

          <div className="flex flex-col items-center gap-1">
            <span className="font-accent text-4xl sm:text-5xl text-brand-black leading-none">5+</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-black/70">Years Experience</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="font-accent text-4xl sm:text-5xl text-brand-black leading-none">5.0</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-black/70">Google Rating</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="font-accent text-4xl sm:text-5xl text-brand-black leading-none">100%</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-black/70">Mobile Service</span>
          </div>

        </div>
      </div>

    </section>
  );
}
