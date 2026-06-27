import { BGPattern } from "@/components/bg-pattern";

const faqs = [
  {
    q: "What's the difference between a detail and a regular car wash?",
    a: "A car wash is automated and surface level. It wets the car, runs generic brushes over it, and sends you out. Detailing is different. Every surface gets worked by hand, inside and out. We clean what a car wash misses and protect what a car wash leaves behind.",
  },
  {
    q: "What do I need to provide?",
    a: "Just your vehicle. We bring everything: water tank, generator, all equipment and products. You don't need to do anything except make the car accessible.",
  },
  {
    q: "How should I prepare my car before the appointment?",
    a: "Remove any personal items from the interior, especially anything large or valuable. Make sure the vehicle is parked somewhere we can access it: driveway, parking lot, or street. That's it.",
  },
  {
    q: "Do I need to be home during the appointment?",
    a: "No. We just need the keys and access to the vehicle. You don't need to be present. If you want to be there for a before-and-after walkthrough, that's always welcome and a good time to talk maintenance. But it's not required.",
  },
  {
    q: "How long does a detail take?",
    a: "Depends on the service and the condition of the vehicle. A Signature Wash takes about an hour. A Full Detail runs 4-6+ hours. We'll give you a time estimate when we confirm the booking.",
  },
  {
    q: "What areas do you service?",
    a: "Bakersfield, CA and surrounding areas within 15 miles. Submit an estimate with your location and we'll confirm availability. Travel fees apply beyond that range.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards, cash, Zelle, and Apple Pay / tap to pay. Payment is collected at the end of the appointment after you've seen the finished result.",
  },
  {
    q: "Is a deposit required to book?",
    a: "Yes. A $20 deposit secures your appointment and applies toward the total. It's refundable if you cancel with enough notice.",
  },
  {
    q: "What if my vehicle is in rough condition?",
    a: "We handle it. If the condition calls for extra time or an upcharge after assessing the car, we'll tell you before we start. Nothing changes without your sign-off.",
  },
  {
    q: "What if it rains on my appointment day?",
    a: "We'll reach out to reschedule. Interior work can sometimes still happen depending on conditions. We'll figure it out on a case-by-case basis.",
  },
  {
    q: "Do you offer recurring appointments?",
    a: "Yes. We offer biweekly, monthly, bimonthly, and quarterly maintenance plans. Regular bookings keep the car in better condition between visits and cost less per service than starting from a dirty baseline. Ask about maintenance options when booking.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative bg-black py-20 px-6 lg:px-8 scroll-mt-[100px]">
      <BGPattern variant="grid" mask="fade-center" fill="rgba(255,255,255,0.05)" size={32} className="z-0" />
      <div className="relative z-[1] mx-auto max-w-3xl">

        <div className="text-center mb-12">
          <span className="inline-flex items-center text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase border border-brand-yellow/50 rounded-full px-5 py-1.5 mb-4">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-brand-white tracking-tight">
            Common Questions
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] [&[open]]:border-brand-yellow/40 [&[open]]:bg-white/[0.03] transition-colors duration-200"
            >
              <summary className="w-full px-6 pt-5 pb-5 flex items-center justify-between gap-6 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden touch-manipulation select-none">
                <span className="text-base font-bold text-brand-white group-open:text-brand-yellow transition-colors duration-200">
                  {faq.q}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-brand-yellow transition-transform duration-500 ease-in-out group-open:rotate-180"
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="px-6 pb-5 text-base text-brand-white/55 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
