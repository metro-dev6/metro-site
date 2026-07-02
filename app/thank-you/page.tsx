import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Request Received | Metro Auto Detailing" },
  description: "Your estimate request was received. We'll reach out within a few hours to confirm.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(250,194,5,0.06),transparent)]" />

      <div className="relative px-4 pt-14 pb-24">
        <div className="mx-auto max-w-2xl text-center">

          <CheckCircle className="mx-auto mb-5 h-12 w-12 text-brand-yellow" />
          <h1 className="text-4xl sm:text-5xl font-black uppercase text-white leading-tight mb-4">
            Request<br />
            <span className="text-brand-yellow">Received.</span>
          </h1>
          <p className="text-white/55 text-base max-w-xs mx-auto leading-relaxed mb-3">
            We&apos;ll reach out within a few hours to confirm your appointment and get you on the schedule.
          </p>
          <p className="text-white/30 text-sm mb-14">
            Questions? Call or text (661) 368-5165.
          </p>

          <div
            className="h-px w-full mb-14"
            style={{ background: "linear-gradient(to right, transparent 0%, #fac205 25%, #fac205 75%, transparent 100%)" }}
          />

          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-yellow px-7 text-sm font-black tracking-widest text-brand-black"
          >
            BACK TO HOME
          </Link>

        </div>
      </div>
    </div>
  );
}
