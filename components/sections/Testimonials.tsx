"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import {
  GOOGLE_PROFILE_URL,
  GOOGLE_REVIEW_URL,
  GOOGLE_RATING_VALUE,
  GOOGLE_REVIEW_COUNT,
  GoogleIcon,
  Stars,
} from "@/components/ui/google-rating";

type Review = { name: string; body: string; time: string };

const reviews: Review[] = [
  {
    name: "Dennis Hannum",
    body: "Devin was really great. He is very knowledgeable about detailing cars. He was punctual as well as polite. I will be using him again in the future.",
    time: "1 week ago",
  },
  {
    name: "Kris Chav",
    body: "I recommend Metro to anyone looking for an honest company to perform quality work. I scheduled Metro to come to me while I was at work to do a refresh detail with sand removal on my 15 year old car. This was my first professional detail and wow — I was impressed with the attention given to every crevice. The carpet? Spotless. The vents? Free of dust. Even the tiny cracks where dust and dirt accumulate were cleaned. I couldn't be happier with the results!",
    time: "4 weeks ago",
  },
  {
    name: "Braden Baptista",
    body: "Damian did an incredible job on my Mazda. He was very professional and I am very satisfied with his services. There is no doubt in my mind that I will go Metro Auto again for any detailing needs!",
    time: "11 weeks ago",
  },
  {
    name: "Mary Grigoryan",
    body: "I wish I had taken a before and after picture! My car looks BRAND NEW!! I heard about Damian through word of mouth and I'll be doing the same! I'll be sending him to everyone I know 🙌🏻 🙌🏻",
    time: "",
  },
  {
    name: "Jimmy Wilson",
    body: "",
    time: "",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="hover-lift bg-black/[0.02] border border-black/10 rounded-2xl p-8 flex flex-col gap-4">
      {review.body && (
        <div className="font-accent text-5xl text-brand-yellow leading-none -mb-2">&ldquo;</div>
      )}
      <div className="flex items-center justify-between">
        <Stars />
        <div className="flex items-center gap-1.5 text-black/30">
          <GoogleIcon />
          <span className="text-xs font-medium">Google</span>
        </div>
      </div>
      {review.body ? (
        <p className="text-base text-black/65 leading-relaxed flex-1">&ldquo;{review.body}&rdquo;</p>
      ) : (
        <div className="flex-1" />
      )}
      <div className="pt-2 border-t border-black/[0.08]">
        <span className="text-sm font-black text-brand-black">{review.name}</span>
      </div>
    </div>
  );
}

// direction "down" is wired for the future two-column (B) layout; only "up" is used today.
// Flipping to B: render two ReviewColumns with sliced arrays and opposite directions,
// and add an `animate-scroll-vertical-reverse` keyframe in globals.css.
function ReviewColumn({ items, direction = "up" }: { items: Review[]; direction?: "up" | "down" }) {
  const doubled = [...items, ...items];
  const anim = direction === "up" ? "animate-scroll-vertical" : "animate-scroll-vertical-reverse";
  return (
    <div
      className="relative h-[500px] lg:h-[640px] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className={`${anim} flex flex-col gap-4`}>
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="bg-site-surface py-24 px-6 lg:px-10 scroll-mt-[100px]">
      <div className="mx-auto max-w-[1600px] grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center">

        <motion.div {...fadeUp}>
          <div className="font-accent text-xs font-medium tracking-[0.25em] uppercase text-brand-black mb-3 not-italic">
            Reviews
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-brand-black tracking-normal mb-4">
            Straight From Our Clients
          </h2>
          <p className="text-black/65 text-base leading-relaxed max-w-sm mb-6">
            No paid actors, no stock quotes. Every review here came from a real job in Bakersfield.
          </p>

          <div className="inline-flex items-center gap-2.5 border border-black/10 rounded-full pl-3 pr-4 py-2 mb-6">
            <GoogleIcon className="w-4 h-4" />
            <Stars className="w-3.5 h-3.5" />
            <span className="text-sm font-bold text-brand-black">{GOOGLE_RATING_VALUE}</span>
            <span className="text-sm text-black/50">({GOOGLE_REVIEW_COUNT} reviews)</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-brand-yellow hover:text-brand-black transition-colors inline-flex items-center gap-2"
              style={{ textShadow: "0 1px 1px rgba(0,0,0,0.2)" }}
            >
              See all on Google
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-brand-black bg-brand-yellow rounded-full px-4 py-2 hover:bg-brand-black hover:text-brand-yellow transition-[color,background-color,transform] duration-150 active:scale-[0.97]"
            >
              Leave a review
            </Link>
          </div>
        </motion.div>

        <motion.div {...fadeUp}>
          <ReviewColumn items={reviews} direction="up" />
        </motion.div>

      </div>
    </section>
  );
}
