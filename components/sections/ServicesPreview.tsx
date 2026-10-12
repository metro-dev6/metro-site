"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

const MotionLink = motion.create(Link);

const services = [
  {
    name: "Exterior Refresh",
    alt: "Exterior Refresh mobile wash and spray wax in Bakersfield, CA",
    price: "$80",
    description: "A two-step exterior wash finished with a spray wax for shine, plus wheels, tires, and door jambs. For a maintained car that just needs the outside cleaned.",
    photo: "/services/exterior-refresh-bakersfield.webp",
    imageStyle: { objectFit: "cover" as const, objectPosition: "center" },
  },
  {
    name: "Signature Detail",
    alt: "Signature Detail mobile detail in Bakersfield, CA",
    price: "$150",
    description: "A full exterior wash finished with a ceramic sealant that beads off water and keeps the paint slick and glossy for up to 3 months, plus a full interior clean inside. Recommended every 2 to 4 weeks.",
    photo: "/services/signature-detail-bakersfield.webp",
    imageStyle: { objectFit: "cover" as const, objectPosition: "75% center" },
  },
  {
    name: "Clay n Seal",
    alt: "Clay n Seal decontamination and ceramic sealant in Bakersfield, CA",
    price: "$150",
    description: "When your paint feels rough or looks hazy, this strips it clean. An iron and clay decontamination pulls bonded iron, tar, and road grime off the paint and leaves it smooth to the touch. Then a ceramic sealant goes on for a slick, high-gloss surface that lasts 6+ months.",
    photo: "/services/clay-n-seal-bakersfield.webp",
    imageStyle: { objectFit: "cover" as const, objectPosition: "center" },
  },
  {
    name: "Interior Detail",
    alt: "Interior Detail deep clean in Bakersfield, CA",
    price: "$200",
    description: "A full reset for an interior worn down by kids, pets, or daily life. Seats and carpets are shampooed and extracted, every panel is deep cleaned, all surfaces are UV protected, and your interior is back to normal.",
    photo: "/services/interior-detail-bakersfield.webp",
    imageStyle: { objectFit: "cover" as const, objectPosition: "center" },
  },
  {
    name: "Full Detail",
    alt: "Full Detail, exterior and interior service in Bakersfield, CA",
    price: "$350",
    description: "The complete reset, inside and out. A full exterior wash sealed with a 3-month ceramic sealant that beads off water and keeps the paint slick and glossy, plus a deep interior clean with carpets and seats shampooed and extracted. Our pick when a car hasn't been detailed in a while and needs attention everywhere.",
    photo: "/services/full-detail-bakersfield.webp",
    imageStyle: { objectFit: "cover" as const, objectPosition: "center" },
  },
];

export function ServicesPreview() {
  return (
    <section className="bg-site-surface pt-16 pb-24 px-6 lg:px-10">
      <div className="mx-auto max-w-[1600px]">

        {/* Header */}
        <motion.div {...fadeUp} className="mb-16">
          <div className="h-[3px] w-10 bg-brand-yellow mb-4" />
          <div className="font-accent text-xs font-medium tracking-[0.25em] uppercase text-brand-black mb-3 not-italic">
            What We Do
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-brand-black tracking-normal">
              Services
            </h2>
            <Link
              href="/services#essentials"
              className="text-xs font-bold uppercase tracking-widest text-black/55 hover:text-brand-yellow transition-colors flex items-center gap-2"
            >
              Full pricing &amp; add-ons
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="mt-4 h-px bg-black/15" />
        </motion.div>

        {/* Cards */}
        <motion.div {...staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const isBestValue = service.name === "Full Detail";
            return (
            <MotionLink
              key={service.name}
              variants={staggerItem}
              href="/services#essentials"
              className={`hover-lift group relative min-h-[380px] flex flex-col justify-end rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.13)] border ${isBestValue ? "border-brand-yellow" : "border-black/15"}`}
            >
              {/* Image wrapper */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={service.photo}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={service.imageStyle}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/0 group-hover:from-black group-hover:via-black/80 transition-colors duration-300" />

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col gap-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-black uppercase tracking-wide text-brand-white leading-tight" style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 2px 16px rgba(0,0,0,0.9)" }}>
                    {service.name}
                  </h3>
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-brand-yellow transition-colors shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                <p className="text-sm text-white/80 leading-relaxed" style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 1px 12px rgba(0,0,0,0.9)" }}>
                  {service.description}
                </p>

                <p className="text-2xl font-accent text-brand-yellow" style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 2px 16px rgba(0,0,0,0.8)" }}>
                  Starting at {service.price}
                </p>
              </div>
            </MotionLink>
            );
          })}

          {/* 6th cell — Add-ons */}
          <MotionLink
            variants={staggerItem}
            href="/services#essentials"
            className="hover-lift group bg-[#141414] border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.18)] rounded-2xl min-h-[380px] flex flex-col justify-start p-8 hover:border-white/25 transition-colors"
          >
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-black uppercase tracking-wide text-brand-white leading-tight">
                Add-Ons
              </h3>

              <ul className="flex flex-col gap-2">
                {[
                  { name: "Headlight Restoration", price: "$100" },
                  { name: "Trim Restoration", price: "$100" },
                  { name: "Water Spot Removal", price: "$50" },
                  { name: "Pet Hair and/or Sand Removal", price: "$50" },
                  { name: "Engine Bay", price: "$50" },
                  { name: "Leather Conditioning", price: "$50" },
                ].map((addon) => (
                  <li key={addon.name} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-white/70">{addon.name}</span>
                    <span className="text-sm font-accent text-brand-yellow">{addon.price}</span>
                  </li>
                ))}
              </ul>

              <span
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-yellow group-hover:gap-4 transition-all duration-200 pt-1"
              >
                See all services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </MotionLink>
        </motion.div>

      </div>
    </section>
  );
}
