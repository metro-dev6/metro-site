"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { GOOGLE_RATING_VALUE, GOOGLE_REVIEW_COUNT, GoogleIcon, Stars } from "@/components/ui/google-rating";
import { fadeUpMount } from "@/lib/motion";
import { PhoneLink } from "@/components/PhoneLink";
import Link from "next/link";

const USE_VIDEO = false;
const VIDEO_SRC = "/hero/mobile-auto-detailing-bakersfield.mp4";
const FALLBACK_IMG = "/hero/exterior-paint-detail-bakersfield.webp";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col bg-brand-black overflow-hidden -mt-[68px] mb-4 sm:mb-10 mx-4 sm:mx-10 rounded-[50px]">

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
            poster="/hero/mobile-auto-detailing-bakersfield-poster.jpg"
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
          style={{ objectFit: "cover", objectPosition: "center 45%" }}
        />
      )}

      {/* Dark overlay — heavier left (text side) fading lighter right (car side), lightened for more visible background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.45) 20%, rgba(0,0,0,0.06) 100%)" }}
      />
      {/* Dim layer — activates when CTA button is hovered */}
      <div className="hero-dim-layer absolute inset-0" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col md:items-start md:justify-center w-full px-6 sm:px-10 lg:px-16 pt-[120px] md:pt-0">

        {/* Text block — fills space on mobile, centers within that zone; left-anchored on desktop */}
        <div className="flex-1 md:flex-none flex items-start md:items-center justify-center md:justify-start w-full">
          <motion.div
            {...fadeUpMount}
            className="max-w-6xl w-full text-center md:text-left mt-0"
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[0.03em] uppercase mb-5 sm:mb-16"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              <span className="text-brand-white">Bakersfield&apos;s Premier</span>{" "}<br />
              <span className="text-brand-yellow">Mobile Detailing</span>
              <span className="text-brand-white"> Service</span>
            </h1>

            <p
              className="text-lg sm:text-xl md:text-xl text-brand-white/90 max-w-2x1 mx-auto md:mx-0 mb-16 leading-relaxed font-normal"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
            >
              Professional detailing at your door because your time is <span className="font-accent font-medium">worth it</span>. <br/ >
              Proudly serving Bakersfield and surrounding areas.
            </p>

            {/* Google rating badge */}
            <Link
              href={`#reviews`}
              className="inline-flex items-center gap-4 bg-brand-white border border-white/20 rounded-full pl-5 pr-7 py-3 mb-6 sm:mb-10 shadow-lg hover:shadow-xl transition-[transform,box-shadow] duration-150 active:scale-[0.98]"
            >
              <GoogleIcon className="w-5 h-5" />
              <span className="text-md sm:text-xl font-bold text-brand-black">
                {GOOGLE_RATING_VALUE}
              </span>
              <Stars className="w-5.5 h-5.5" />
              <span className="text-brand-black/80">&bull;</span>
              <span className="text-md sm:text-md text-brand-black font-medium">
                {GOOGLE_REVIEW_COUNT} reviews
              </span>
            </Link>

            {/* Desktop CTA — inline with text */}
            <div className="hidden md:flex flex-wrap gap-4 justify-start">
              <Link href="/estimate" className="hero-cta">
                <ShinyButton
                  className="bg-brand-yellow text-brand-black font-black tracking-widest h-16 px-11 text-lg border border-brand-yellow hover:shadow-[0_0_20px_5px_rgba(250,194,5,0.45),0_0_0_5px_rgba(255,255,255,0.15),0_0_0_6px_rgba(255,255,255,0.2)] hover:translate-y-0"
                  style={{ "--primary": "46 96% 50%" } as React.CSSProperties}
                >
                  Book Now
                </ShinyButton>
              </Link>
              <PhoneLink className="group relative inline-flex h-16 items-center gap-2.5 overflow-hidden rounded-full border-2 border-white bg-black/40 backdrop-blur-sm px-8 text-sm font-bold uppercase tracking-widest text-brand-white shadow-lg transition-colors duration-700 hover:border-4 hover:border-brand-black">
                <span className="absolute inset-0 origin-left scale-x-0 bg-brand-white transition-transform duration-700 ease-out group-hover:scale-x-100" />
                <Phone className="relative z-10 h-5 w-5 shrink-0 transition-colors duration-700 group-hover:text-brand-black" strokeWidth={2.5} />
                <span className="relative z-10 transition-colors duration-700 group-hover:text-brand-black">
                  (661) 368-5165
                </span>
              </PhoneLink>
            </div>

          </motion.div>
        </div>

        {/* Mobile CTA — separate zone, pinned below text */}
        <div className="md:hidden flex flex-col items-center gap-3 pb-20">
          <Link href="/estimate" className="hero-cta">
            <ShinyButton
              className="bg-brand-yellow text-brand-black font-black tracking-widest h-14 px-9 text-base border border-brand-yellow hover:shadow-[0_0_20px_5px_rgba(250,194,5,0.45),0_0_0_5px_rgba(255,255,255,0.15),0_0_0_6px_rgba(255,255,255,0.2)] hover:translate-y-0"
              style={{ "--primary": "46 96% 50%" } as React.CSSProperties}
            >
              Book Now
            </ShinyButton>
          </Link>
          <PhoneLink className="group relative inline-flex h-14 items-center gap-2.5 overflow-hidden rounded-full border-2 border-white bg-black/40 backdrop-blur-sm px-8 text-sm font-bold uppercase tracking-widest text-brand-white shadow-lg transition-colors duration-700 hover:border-4 hover:border-brand-black">
            <span className="absolute inset-0 origin-left scale-x-0 bg-brand-white transition-transform duration-700 ease-out group-hover:scale-x-100" />
            <Phone className="relative z-10 h-5 w-5 shrink-0 transition-colors duration-700 group-hover:text-brand-black" strokeWidth={2.5} />
            <span className="relative z-10 transition-colors duration-700 group-hover:text-brand-black">
              (661) 368-5165
            </span>
          </PhoneLink>
        </div>

      </div>

    </section>
  );
}
