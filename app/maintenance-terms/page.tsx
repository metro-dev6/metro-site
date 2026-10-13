import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Maintenance Plan Terms | Metro Auto Detailing" },
  description: "Terms for Metro Auto Detailing's Maintenance Plans. How a plan starts, what it maintains, pricing by schedule, cancellation, and how the recurring relationship works.",
  alternates: { canonical: "https://metroautodetailing.pro/maintenance-terms" },
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
              How Metro&apos;s recurring Maintenance Plans work. This is separate
              from the Service Agreement you sign at your first visit, which covers
              per-appointment terms like payment and liability. Both apply.
            </p>
          </header>

          <div className="flex flex-col gap-10">

            <Section title="What the Plan Is">
              <p>
                A Maintenance Plan starts after your first service and keeps that same
                service going on a schedule you pick. Whatever you first had done is what
                we maintain. A Signature stays a Signature, an exterior wash stays exterior.
              </p>
              <p>
                You pick how often: every 2 weeks, monthly, every 2 months, or quarterly.
                Price follows the schedule, because the longer between visits, the more the
                car builds up and the more each visit takes. You&apos;re billed per visit
                after the job is done, never up front, and nothing is charged automatically
                between visits.
              </p>
              <p>
                Every visit includes a protection product refresh (sealant or spray
                coating) and spot correction on minor scuffs and scratches, at no extra
                charge. Full multi-stage paint correction is never included, that&apos;s
                quoted separately.
              </p>
            </Section>

            <Divider />

            <Section title="Signing Up">
              <p>
                The Service Agreement is signed once, at your very first Metro service,
                and covers every appointment after that, whether you&apos;re on a plan
                or booking one-time. It is not resigned when you join a plan later or
                change your schedule.
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
                treated as the relationship ending, your slot isn&apos;t held or re-offered.
                If it&apos;s been more than 3 months since your last visit, your plan is
                considered inactive and the next booking is priced at standard one-time
                rates instead of the plan rate.
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
                Changing your cadence, switching how often we come out, is free and
                doesn&apos;t need approval. It&apos;s your plan to loosen or tighten.
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
