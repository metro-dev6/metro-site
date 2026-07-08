"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";

const SLIDES = [
  // Slide 1 — Video hero
  [
    {
      id: 1,
      type: "image" as const,
      title: "Exterior Detail",
      desc: "Decontaminated & Protected",
      url: "/gallery/Slide%201/IMG_5804.JPEG",
      span: "col-span-1 row-span-6 md:col-span-2 md:row-span-7 lg:col-span-2 lg:row-span-4",
    },
    {
      id: 2,
      type: "image" as const,
      title: "Maintenance Detail",
      desc: "Back to New Every Month",
      url: "/gallery/Slide%201/IMG_6214.JPEG",
      span: "col-span-1 row-span-3 md:col-span-2 md:row-span-3 lg:col-span-2 lg:row-span-4",
    },
    {
      id: 3,
      type: "image" as const,
      title: "Deep Cleaned Wheel",
      desc: "Brake Dust Safely Removed",
      url: "/gallery/Slide%201/IMG_6026.JPEG",
      span: "col-span-1 row-span-3 md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-4",
    },
    {
      id: 5,
      type: "image" as const,
      title: "Mirror Finish",
      desc: "2018 Silverado — 2-Step Paint Correction",
      url: "/gallery/Slide%201/IMG_6297.JPEG",
      span: "col-span-1 row-span-3 md:col-span-2 md:row-span-3 lg:col-span-3 lg:row-span-5",
    },
    {
      id: 6,
      type: "comparison" as const,
      title: "Headlight Restoration",
      desc: "",
      url: "",
      beforeUrl: "/gallery/Slide%201/IMG_6170.JPEG",
      afterUrl: "/gallery/Slide%201/IMG_6195.JPEG",
      span: "col-span-1 row-span-4 md:col-span-2 md:row-span-5 lg:col-span-3 lg:row-span-5",
    },
  ],
  // Slide 2 — Inverted: 2 large sliders on top, 3 small tiles on bottom
  [
    {
      id: 1,
      type: "comparison" as const,
      title: "Seat Shampoo",
      desc: "Deep extracted, not wiped",
      url: "",
      beforeUrl: "/gallery/Slide%202/IMG_6321.JPEG",
      afterUrl: "/gallery/Slide%202/IMG_6348.JPEG",
      span: "col-span-2 row-span-5 sm:col-span-3 sm:row-span-5 md:col-span-2 md:row-span-5 lg:col-span-3 lg:row-span-5",
    },
    {
      id: 2,
      type: "comparison" as const,
      title: "Headlight Restoration",
      desc: "$80 — book it on its own",
      url: "",
      beforeUrl: "/gallery/Slide%202/IMG_6346.JPEG",
      afterUrl: "/gallery/Slide%202/IMG_6367.JPEG",
      afterObjectPosition: "center calc(50% + 25px)",
      span: "col-span-2 row-span-4 sm:col-span-3 sm:row-span-5 md:col-span-2 md:row-span-5 lg:col-span-3 lg:row-span-5",
    },
    {
      id: 3,
      type: "image" as const,
      title: "Interior Detail",
      desc: "Toyota Corolla - Spot Stain Treatment",
      url: "/gallery/Slide%202/toyota-corolla-interior-detail-bakersfield.JPEG",
      span: "col-span-1 row-span-3 sm:col-span-1 sm:row-span-3 md:col-span-2 md:row-span-3 lg:col-span-2 lg:row-span-4",
    },
    {
      id: 4,
      type: "image" as const,
      title: "Exterior Detail",
      desc: "Decontaminated, 1-Step Paint Enhancement, Protected",
      url: "/gallery/Slide%202/IMG_6158.JPEG",
      span: "col-span-1 row-span-3 sm:col-span-1 sm:row-span-3 md:col-span-1 md:row-span-3 lg:col-span-2 lg:row-span-4",
    },
    {
      id: 5,
      type: "image" as const,
      title: "Full Detail",
      desc: "Large 3-Row SUV Received The Works, Inside & Out",
      url: "/gallery/Slide%202/IMG_5922.JPEG",
      span: "col-span-1 row-span-3 sm:col-span-1 sm:row-span-3 md:col-span-1 md:row-span-3 lg:col-span-2 lg:row-span-4",
    },
  ],
];

export function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const multiSlide = SLIDES.length > 1;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <section className="py-24 px-6 lg:px-8 bg-site-bg">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-normal leading-tight">
            The Work
          </h2>
          <p className="text-white/50 text-sm mt-2 max-w-md">
            No filters. No stock. Every shot is from a real job in Bakersfield.
          </p>
        </div>

        <div className="relative">
          {/* Left arrow */}
          {multiSlide && (
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/90 transition-colors"
              aria-label="Previous slide"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Bento grid — fades between slides */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <InteractiveBentoGallery mediaItems={SLIDES[currentSlide]} />
            </motion.div>
          </AnimatePresence>

          {/* Right arrow */}
          {multiSlide && (
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/90 transition-colors"
              aria-label="Next slide"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Slide dots */}
        {multiSlide && (
          <div className="flex justify-center gap-2 mt-6">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-6 bg-yellow-400" : "w-2 bg-white/20"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
