import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: { absolute: "Auto Detailing Tips & Guides | Metro Auto Detailing" },
  description: "Educational guides on car detailing, paint protection, and car care for Bakersfield, CA vehicle owners. Written by Metro Auto Detailing.",
  robots: { index: false },
  alternates: { canonical: "https://www.metroautodetailing.pro/blog" },
  openGraph: {
    title: "Auto Detailing Tips & Guides | Metro Auto Detailing",
    description: "Car care and detailing guides for Bakersfield, CA vehicle owners.",
    url: "https://www.metroautodetailing.pro/blog",
    siteName: "Metro Auto Detailing",
    type: "website",
  },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="relative pt-20 pb-16 px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase border border-brand-yellow/50 rounded-full px-5 py-1.5 mb-6">
            Bakersfield, CA
          </span>
          <h1 className="text-5xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[1] mb-4">
            Detailing<br />
            <span className="text-brand-yellow">Guides</span>
          </h1>
          <p className="text-white/50 text-base max-w-lg">
            Real information on car care, paint protection, and detailing — written for Bakersfield vehicle owners.
          </p>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-3xl">
          {posts.length === 0 ? (
            <p className="text-white/40 text-sm">No posts yet. Check back soon.</p>
          ) : (
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {posts.map((post) => (
                <article key={post.slug} className="py-8 group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <p className="text-xs text-white/40 font-mono mb-3">
                      {formatDate(post.date)}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-brand-yellow transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>
                    <p className="text-white/55 text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-yellow group-hover:gap-2.5 transition-all">
                      Read
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
