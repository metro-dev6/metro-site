"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

const LOCATIONS = [
  {
    name: "Home",
    description: "Your driveway is the shop for the day. No need to go anywhere.",
    icon: (
      <path d="M3 10.5L12 3l9 7.5M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5" />
    ),
  },
  {
    name: "Apartment",
    description: "Covered garage or open lot, we make it work wherever you park.",
    icon: (
      <path d="M4 21V5a1 1 0 011-1h6a1 1 0 011 1v16M4 21h8m8 0v-8a1 1 0 00-1-1h-6v9m8 0h-8M7 7h1m3 0h1m-5 4h1m3 0h1m-5 4h1m3 0h1" />
    ),
  },
  {
    name: "Office",
    description: "Get detailed while you're at work. We handle everything in the lot.",
    icon: (
      <path d="M3 21h18M6 21V8l6-4 6 4v13M9 21v-5h6v5M9 12h.01M15 12h.01M9 9h.01M15 9h.01" />
    ),
  },
  {
    name: "Business",
    description: "One vehicle or a full fleet, on your schedule, at your lot.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </>
    ),
  },
];

export function WeComeToYou() {
  return (
    <section className="bg-site-surface py-24 px-6 lg:px-10">
      <div className="mx-auto max-w-[1600px]">

        <motion.div {...fadeUp} className="mb-16">
          <div className="font-accent text-xs font-medium tracking-[0.25em] uppercase text-brand-black mb-3 not-italic">
            We Come To You
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-brand-black tracking-tight">
            Wherever The Car Is Parked
          </h2>
          <p className="text-black/80 text-sm mt-2 sm:whitespace-nowrap">
            Fully mobile and self-contained. We bring the water, power, and equipment needed to finish the job.
          </p>
          <div className="mt-4 h-px bg-black/20" />
        </motion.div>

        <motion.div {...staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {LOCATIONS.map((location) => (
            <motion.div
              key={location.name}
              variants={staggerItem}
              className="hover-lift flex flex-col gap-4 rounded-2xl bg-site-bg p-8"
            >
              <svg
                className="w-8 h-8 text-brand-yellow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {location.icon}
              </svg>
              <h3 className="text-base font-black uppercase tracking-wide text-brand-white">
                {location.name}
              </h3>
              <p className="text-sm text-brand-white/65 leading-relaxed">
                {location.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
