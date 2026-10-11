"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { QuickContactForm } from "@/components/sections/QuickContactForm";

export function CTABanner() {
  return (
    <section id="book" className="py-12 lg:py-16 scroll-mt-[100px]">
      <div className="relative overflow-hidden rounded-[50px] mx-4 sm:mx-10 px-6 lg:px-12 py-16 lg:py-20">

        {/* Background photo */}
        <Image
          src="/cta/mobile-detailing-bakersfield-cta.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-[center_90%]"
        />
        {/* Gradient — heavier on the left (copy side), lighter right */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.30) 100%)" }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1600px] grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center">

          {/* Left: copy */}
          <motion.div {...fadeUp}>
            <div className="font-accent text-xs font-medium tracking-[0.25em] uppercase text-brand-yellow mb-3 not-italic">
              Book Now
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black uppercase text-brand-white tracking-normal leading-[0.95] mb-4"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}
            >
              We come to <span className="text-brand-yellow">you.</span>
            </h2>
            <p
              className="text-brand-white/85 text-base leading-relaxed max-w-sm mb-6"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
            >
              Leave your name and number. We&apos;ll call you back with a time and a quote. No drop-off, no shop, we detail it where it&apos;s parked.
            </p>
            <a
              href="tel:+16613685165"
              className="inline-flex items-center gap-2 text-base font-black uppercase tracking-widest text-brand-white hover:text-brand-yellow transition-colors"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
            >
              Or call now: (661) 368-5165
            </a>
          </motion.div>

          {/* Right: quick contact form in a solid dark card */}
          <motion.div {...fadeUp}>
            <div className="rounded-3xl bg-[#141414] p-4 sm:p-6 shadow-2xl">
              <QuickContactForm service="Homepage - Book Now" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
