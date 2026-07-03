import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PHOTOS = [
  { src: "/metro_v3_2.jpg", alt: "Full detail result — Metro Auto Detailing, Bakersfield CA" },
  { src: "/metro_v3_4.jpg", alt: "Exterior detail — Metro Auto Detailing, Bakersfield CA" },
  { src: "/metro_v3_5.jpg", alt: "Mobile detail — Metro Auto Detailing, Bakersfield CA" },
  { src: "/hero-car-enhanced.jpg", alt: "After detail — Metro Auto Detailing, Bakersfield CA" },
];

export function Gallery() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-site-bg">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <span className="inline-flex items-center text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase border border-brand-yellow/50 rounded-full px-5 py-1.5 mb-4">
            After Photos Only
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-normal leading-tight">
            The Work
          </h2>
          <p className="text-white/50 text-sm mt-2 max-w-md">
            No filters. No stock. Every shot is from a job in Bakersfield.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-xl bg-zinc-900 group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-brand-yellow text-black font-black text-sm tracking-wide hover:bg-brand-yellow/90 transition-colors"
          >
            Book a Detail
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
