// "Who does the work" trust block. Answers Google's "Who." Operator photo is a placeholder.
// Year count tagged {{UNVALIDATED}} for the operator to fill. Metro voice, no dealership angle.

import { Section } from "@/components/ui/section";
import { LightCard } from "@/components/ui/cards";

export function WhoDoesTheWork() {
  return (
    <Section className="py-12">
      <LightCard className="grid md:grid-cols-[260px_1fr] gap-8 items-center p-6 md:p-8">
          {/* Operator photo (placeholder until supplied) */}
          <div className="w-full aspect-square md:aspect-auto md:h-56 rounded-xl flex items-center justify-center bg-black/[0.06] text-black/35 text-xs uppercase tracking-wide">
            Photo: operator (placeholder)
          </div>

          <div>
            <span className="inline-block text-xs font-extrabold tracking-[0.2em] uppercase text-black/55 mb-3">
              Who does the work
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-brand-black leading-tight">
              The person who quotes your car is the one who details it.
            </h2>
            <p className="text-black/60 mt-4 leading-relaxed max-w-2xl">
              Owner-operated and fully mobile, with {"{{UNVALIDATED}}"} years of hands-on detailing in Bakersfield.
              I bring the water, power, and products to your driveway. You see the car before I start and sign off on the
              price. No crew, no handoff, no shop markup.
            </p>
          </div>
      </LightCard>
    </Section>
  );
}
