import { BGPattern } from "@/components/bg-pattern";

const reasons = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    headline: "We Come to You",
    body: "No driving across town. No dropping it off and waiting. You book a time, we bring everything needed, and the car stays put until it's clean.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    headline: "No Surprise Pricing",
    body: "Every service has a listed price. Once we assess the car, we give you the final number before we start. Nothing happens without your sign-off. No shop adding fees at the end because the car was dirtier than expected.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    headline: "Not a Volume Shop",
    body: "A full detail done right takes 3-5 hours. There's no next car waiting, no quota to hit. We take one job at a time. Your car gets the full window, not whatever's left after the rush.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" ry="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
    headline: "You Know What You're Getting",
    body: "Most clients don't know what a detail involves until they see one. We tell you what's getting done and in what order before we touch anything.",
  },
];

export function WhyMetro() {
  return (
    <section className="relative bg-black py-20 px-6 lg:px-8">
      <BGPattern variant="dots" mask="fade-edges" fill="rgba(255,255,255,0.05)" size={24} className="z-0" />
      <div className="relative z-[1] mx-auto max-w-7xl">

        <div className="text-center mb-14">
          <span className="inline-flex items-center text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase border border-brand-yellow/50 rounded-full px-5 py-1.5 mb-4">
            Why Metro
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-brand-white tracking-tight">
            A Car Wash Rinses.<br />
            <span className="text-brand-yellow">A Detail Cleans.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
          {reasons.map(({ icon, headline, body }) => (
            <div
              key={headline}
              className="bg-zinc-950 px-8 py-10 flex flex-col gap-5"
            >
              <div
                className="text-brand-yellow w-fit"
                style={{ filter: "drop-shadow(0 0 8px rgba(250,194,5,0.5))" }}
              >
                {icon}
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-wide text-brand-white mb-2">
                  {headline}
                </h3>
                <p className="text-base text-brand-white/50 leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
