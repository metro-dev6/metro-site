import Link from "next/link";

const GOOGLE_PROFILE_URL = "https://share.google/ggiBdFRwhkILjiw87"; // TODO: replace with real URL

const reviews = [
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
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function Testimonials() {
  return (
    <section className="bg-black py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="text-center mb-12">
          <span className="inline-flex items-center text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase border border-brand-yellow/50 rounded-full px-5 py-1.5 mb-4">
            Reviews
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-brand-white tracking-tight">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
          {reviews.map((review) => (
            <div key={review.name} className="bg-zinc-950 p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Stars />
                <div className="flex items-center gap-1.5 text-white/30">
                  <GoogleIcon />
                  <span className="text-xs font-medium">Google</span>
                </div>
              </div>
              <p className="text-base text-brand-white/70 leading-relaxed flex-1">
                "{review.body}"
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <span className="text-sm font-black text-brand-white">{review.name}</span>
                <span className="text-xs text-brand-white/30">{review.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-white/50 hover:text-brand-white transition-colors"
          >
            <GoogleIcon />
            See all reviews on Google
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
