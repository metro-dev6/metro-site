import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Request Received | Metro Auto Detailing" },
  description: "Your estimate request was received. We'll reach out within 2 hours to confirm.",
  robots: { index: false, follow: false },
};

function Divider() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(to right, transparent 0%, #fac205 25%, #fac205 75%, transparent 100%)",
      }}
    />
  );
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-site-bg">

      <div className="relative px-4 pt-14 pb-24">
        <div className="mx-auto max-w-lg flex flex-col items-center gap-10 text-center">

          {/* Confirmation */}
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="h-12 w-12 text-brand-yellow" />
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white leading-tight">
              Request<br />
              <span className="text-brand-yellow">Received.</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed">
              We&apos;ll text you within 2 hours to schedule your appointment.
            </p>
            <p className="text-white/35 text-sm">
              Need it sooner? Call or text{" "}
              <a
                href="tel:6613685165"
                className="text-white/55 hover:text-white transition-colors"
              >
                (661) 368-5165
              </a>
              .
            </p>
          </div>

          <Divider />

          {/* Guarantee */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-black text-brand-yellow uppercase tracking-[0.15em]">
              Our Guarantee
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              If anything&apos;s off after the job, text us within 24 hours.
              We come back and fix it. No questions. No charge.
            </p>
          </div>

          <Divider />

          {/* Referral */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-black text-brand-yellow uppercase tracking-[0.15em]">
              Know Someone?
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              Refer a friend to Metro. When they book and complete a detail,
              you get $20 off your next service. They get $20 off their first.
            </p>
            <p className="text-white/40 text-sm">
              No codes. They just mention your name when they reach out.
            </p>
          </div>

          <Divider />

          {/* CTA */}
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
