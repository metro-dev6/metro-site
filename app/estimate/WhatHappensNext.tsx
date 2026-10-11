"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: 1,
    title: "We reach out",
    body: "We call or text within a few hours of your request. We go over your vehicle, what it needs, and your starting price. No pressure. Just a straight answer.",
  },
  {
    n: 2,
    title: "We lock in a time",
    body: "We pick a day that works and you tell us where it's parked. Home, work, your apartment lot, wherever. You get a confirmation with the details, plus a reminder the day before.",
  },
  {
    n: 3,
    title: "We show up and detail",
    body: "We arrive on time and do a quick walk-around with you first, so we agree on the work and the price before we start. Then we get to it. We bring our own water, power, and equipment.",
  },
  {
    n: 4,
    title: "You see the difference",
    body: "When it's done, we walk the finished car with you and send your before and after photos. Want to keep it looking this way? Ask about a maintenance plan.",
  },
];

export function WhatHappensNext() {
  const reduce = useReducedMotion();

  return (
    <section className="mt-20">
      {/* Header */}
      <motion.div {...(reduce ? {} : fadeUp)} className="text-center mb-12">
        <div className="font-accent text-xs font-medium tracking-[0.25em] uppercase text-brand-black mb-3 not-italic">
          What Happens Next
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase text-brand-black tracking-tight">
          After You Hit Send
        </h2>
        <p className="text-sm text-black/60 mt-3 max-w-md mx-auto leading-relaxed">
          No guessing. Here&apos;s exactly how it goes from your request to a clean car.
        </p>
        <div className="mx-auto mt-5 h-[3px] w-10 bg-brand-yellow" />
      </motion.div>

      {/* Alternating timeline */}
      <div className="relative">
        {/* Spine: left-anchored on mobile, centered on desktop */}
        <div className="absolute top-2 bottom-2 left-[18px] sm:left-1/2 w-px -translate-x-1/2 bg-black/15" />

        <motion.div {...(reduce ? {} : staggerContainer)} className="flex flex-col gap-10">
          {STEPS.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={step.n}
                variants={reduce ? undefined : staggerItem}
                className="relative sm:grid sm:grid-cols-2 sm:items-center"
              >
                {/* Number node on the spine */}
                <div className="absolute left-[18px] sm:left-1/2 top-1 sm:top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 sm:-translate-y-1/2 items-center justify-center rounded-full bg-brand-yellow font-numeric text-sm font-black text-black shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                  {step.n}
                </div>

                {/* Content, alternating sides on desktop */}
                <div
                  className={cn(
                    "pl-14 sm:pl-0",
                    left
                      ? "sm:col-start-1 sm:pr-14"
                      : "sm:col-start-2 sm:pl-14"
                  )}
                >
                  <h3 className="text-lg font-black uppercase tracking-wide text-brand-black">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-black/60 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
