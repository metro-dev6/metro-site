import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Maintenance Plan Terms | Metro Auto Detailing" },
  description: "Terms for Metro Auto Detailing's Maintenance Plan — fixed schedule and on-call. Pricing, cancellation, and how the recurring relationship works.",
  alternates: { canonical: "https://www.metroautodetailing.pro/maintenance-terms" },
};

function Divider() {
  return <div className="h-px w-full bg-white/[0.08] my-10" />;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-black uppercase tracking-wide text-brand-yellow">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-white/70 text-[15px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function MaintenanceTermsPage() {
  return (
    <main className="min-h-screen">
      <div className="px-6 lg:px-8 pt-20 pb-24">
        <div className="mx-auto max-w-3xl">

          <header className="mb-10 pb-10 border-b border-white/[0.08]">
            <p className="text-xs text-white/40 font-mono mb-4">
              Metro Auto Detailing, Bakersfield CA
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase leading-tight tracking-tight">
              Maintenance Plan Terms
            </h1>
            <p className="text-white/50 text-sm mt-4">
              Covers both plan structures — Fixed Schedule and On-Call. This is separate
              from the Service Agreement you sign at your first visit, which covers
              per-appointment terms like payment and liability. Both apply.
            </p>
          </header>

          <div className="flex flex-col gap-10">

            <Section title="What the Plan Is">
              <p>
                Every Maintenance Plan visit restores your vehicle to like-new condition,
                on a schedule you pick. Two structures:
              </p>
              <p>
                <strong className="text-white">Fixed Schedule</strong> — you hold a
                recurring slot. Monthly ($110), Bimonthly ($180), or Quarterly ($225).
                Billed per visit after the job is done, not up front.
              </p>
              <p>
                <strong className="text-white">On-Call</strong> — no fixed schedule, no
                held slot. Call or text when you want the next detail. Price scales with
                time since your last visit: $80 at 2 weeks, up to $225 at 3 months. Book
                between two tiers and the price lands at the midpoint.
              </p>
              <p>
                Both structures include protection product refresh (sealant or spray
                coating) and spot correction on minor scuffs and scratches, every visit,
                at no extra charge. Full multi-stage paint correction is never included —
                that&apos;s quoted separately.
              </p>
            </Section>

            <Divider />

            <Section title="Signing Up">
              <p>
                The Service Agreement is signed once, at your very first Metro service,
                and covers every appointment after that — Fixed Schedule, On-Call, or
                one-time. It is not resigned when you join a plan later or switch between
                plan types.
              </p>
            </Section>

            <Divider />

            <Section title="Payment &amp; Cancellation">
              <p>
                No deposit on plan visits — it&apos;s an ongoing relationship, not a
                one-off booking. Instead:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>
                  Cancelling or rescheduling with less than <strong className="text-white">24
                  hours</strong> notice triggers a $30 late-cancel fee.
                </li>
                <li>
                  Payment is due in full at time of service — cash, card, or Zelle.
                  Nothing is billed automatically between visits.
                </li>
              </ul>
            </Section>

            <Divider />

            <Section title="If You Pause or Stop">
              <p>
                Notice and going silent are treated differently.
              </p>
              <p>
                Tell Metro you want to pause, skip, or cancel — no penalty beyond the
                24-hour cancellation terms above. The relationship stays open. Come back
                to the plan whenever.
              </p>
              <p>
                Go silent around your expected visit with no notice at all, and that&apos;s
                treated as the relationship ending — your slot isn&apos;t held or
                re-offered. For On-Call clients, there&apos;s no fixed next visit to miss,
                so if it&apos;s been more than 3 months since your last visit, your plan is
                considered inactive and the next booking is priced at standard one-time
                rates instead of the plan scale.
              </p>
            </Section>

            <Divider />

            <Section title="Price &amp; Cadence Changes">
              <p>
                Your rate is set individually when you join and doesn&apos;t change
                underneath you. If Metro&apos;s published rates change later, that
                doesn&apos;t retroactively reprice your plan — your rate only changes if
                discussed with you directly.
              </p>
              <p>
                Changing your cadence — switching frequency, or moving between Fixed
                Schedule and On-Call — is free and doesn&apos;t need approval. It&apos;s
                your plan to loosen or tighten.
              </p>
            </Section>

            <Divider />

            <Section title="No Minimum Engagement">
              <p>
                No contracts. Cancel anytime.
              </p>
            </Section>

          </div>

          <div className="mt-16 pt-10 border-t border-white/[0.08]">
            <div className="rounded-2xl bg-brand-yellow/5 border border-brand-yellow/20 p-8 text-center">
              <p className="text-white font-black text-xl uppercase mb-2">
                Questions about your plan?
              </p>
              <p className="text-white/50 text-sm mb-6">
                Text or call and I&apos;ll walk you through it.
              </p>
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-brand-yellow text-black font-black text-sm tracking-wide hover:bg-brand-yellow/90 transition-colors"
              >
                Get a Free Estimate
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-white/30 mt-4">
                Or call / text (661) 368-5165
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
