import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Request Received | Metro Auto Detailing" },
  description: "Your estimate request was received. We'll reach out within a few hours to confirm.",
  robots: { index: false, follow: false },
};

const GALLERY = [
  { src: "/IMG_6184.JPEG",    alt: "Exterior detail — paint correction and sealant" },
  { src: "/full-detail-bg.JPEG", alt: "Full detail finish" },
  { src: "/interior-bg.JPEG", alt: "Interior detail — panels and console" },
  { src: "/refresh-bg.JPEG",  alt: "Refresh detail result" },
];

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(250,194,5,0.06),transparent)]" />

      <div className="relative px-4 pt-14 pb-24">
        <div className="mx-auto max-w-2xl">

          {/* Confirmation */}
          <div className="text-center mb-14">
            <CheckCircle className="mx-auto mb-5 h-12 w-12 text-brand-yellow" />
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white leading-tight mb-4">
              Request<br />
              <span className="text-brand-yellow">Received.</span>
            </h1>
            <p className="text-white/55 text-base max-w-xs mx-auto leading-relaxed">
              We&apos;ll reach out within a few hours to confirm your appointment and get you on the schedule.
            </p>
            <p className="mt-3 text-white/30 text-sm">
              Questions? Call or text (661) 368-5165.
            </p>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full mb-14"
            style={{ background: "linear-gradient(to right, transparent 0%, #fac205 25%, #fac205 75%, transparent 100%)" }}
          />

          {/* Gallery */}
          <p className="text-xs font-black text-brand-yellow uppercase tracking-[0.2em] mb-6 text-center">
            Recent Work
          </p>
          <div className="grid grid-cols-2 gap-3 mb-14">
            {GALLERY.map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 400px"
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-md bg-brand-yellow px-7 text-sm font-black tracking-widest text-brand-black"
            >
              BACK TO HOME
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
