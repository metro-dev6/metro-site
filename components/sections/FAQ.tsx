"use client";

import { useState } from "react";
import { BGPattern } from "@/components/bg-pattern";

const faqs = [
  {
    q: "What's the difference between a detail and a regular car wash?",
    a: "A car wash runs your vehicle through automated equipment that scratches and swirls the paint with generic chemicals. Detailing is hands-on. We clean, protect, and preserve every surface — inside and out — at a pace that actually does the job right.",
  },
  {
    q: "What do I need to provide?",
    a: "Just your vehicle. We bring everything — water tank, generator, all equipment and products. You don't need to do anything except make the car accessible.",
  },
  {
    q: "How should I prepare my car before the appointment?",
    a: "Remove any personal items you want to keep out of the way. Make sure the vehicle is parked somewhere we can access it — driveway, parking lot, or street. That's it.",
  },
  {
    q: "Do I need to be home during the appointment?",
    a: "Not the whole time. You should be available at the start for a quick walk-around and at the end for the final presentation. In between, you're free to go about your day.",
  },
  {
    q: "How long does a detail take?",
    a: "Depends on the service and the vehicle's condition. A Signature Wash takes about an hour. A Full Detail runs 4-6 hours. We'll give you a time estimate when we confirm the booking.",
  },
  {
    q: "What areas do you service?",
    a: "Bakersfield, CA and the greater Bakersfield area. Submit an estimate with your location — travel fees may apply for areas outside the city.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards, and cash. Payment is collected at the end of the appointment after you've seen the finished result.",
  },
  {
    q: "Is a deposit required to book?",
    a: "Yes. A $20 deposit secures your appointment and applies toward the total. It's refundable if you cancel with enough notice.",
  },
  {
    q: "What if my vehicle is in rough condition?",
    a: "We handle it. If the condition calls for extra time or an upcharge after we assess the car, we tell you before we start. Nothing changes without your sign-off.",
  },
  {
    q: "What if it rains on my appointment day?",
    a: "We'll reach out to reschedule. Interior work can sometimes still happen depending on conditions — we'll figure it out on a case-by-case basis.",
  },
  {
    q: "Do you offer recurring appointments?",
    a: "Yes. We can set up a recurring schedule to keep your vehicle protected and maintained year-round.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-zinc-950 py-20 px-6 lg:px-8">
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
            <div
              key={index}
              className={`rounded-xl border px-6 py-5 cursor-pointer transition-colors duration-200 ${
                openIndex === index
                  ? "border-brand-yellow/40 bg-white/[0.03]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
              }`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between gap-6">
                <h3 className={`text-base font-bold transition-colors duration-200 ${openIndex === index ? "text-brand-yellow" : "text-brand-white"}`}>
                  {faq.q}
                </h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`shrink-0 text-brand-yellow transition-transform duration-500 ease-in-out ${openIndex === index ? "rotate-180" : ""}`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className={`text-base text-brand-white/55 leading-relaxed transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                    : "opacity-0 max-h-0 -translate-y-2"
                }`}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
