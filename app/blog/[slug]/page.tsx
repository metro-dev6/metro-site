import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPosts, getPost, getHeadings, renderPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | Metro Auto Detailing` },
    description: post.description,
    keywords: post.keywords,
    robots: { index: false },
    alternates: { canonical: `https://www.metroautodetailing.pro/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.metroautodetailing.pro/blog/${slug}`,
      siteName: "Metro Auto Detailing",
      images: [{ url: "https://www.metroautodetailing.pro/hero-car-enhanced.jpg", width: 1200, height: 630 }],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = renderPost(post.content);
  const headings = getHeadings(post.content);

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="px-6 lg:px-8 pt-20 pb-24">
        <div className="mx-auto max-w-4xl">

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            All guides
          </Link>

          <header className="mb-10 pb-10 border-b border-white/[0.08]">
            <p className="text-xs text-white/40 font-mono mb-4">
              {formatDate(post.date)} · Metro Auto Detailing, Bakersfield CA
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase leading-tight tracking-tight">
              {post.title}
            </h1>
          </header>

          <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-12 lg:items-start">

            <div>
              {headings.length > 0 && (
                <details className="lg:hidden mb-8 border border-white/[0.08] rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/40 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
                    Contents
                    <span className="text-white/20 font-normal normal-case tracking-normal">+</span>
                  </summary>
                  <nav className="px-4 pb-4 pt-1 border-t border-white/[0.06]">
                    <ol className="flex flex-col gap-2.5 mt-3">
                      {headings.map((h) => (
                        <li key={h.slug}>
                          <a
                            href={`#${h.slug}`}
                            className="text-sm text-white/50 hover:text-brand-yellow transition-colors"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </details>
              )}

              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              <div className="mt-16 pt-10 border-t border-white/[0.08]">
                <div className="rounded-2xl bg-brand-yellow/5 border border-brand-yellow/20 p-8 text-center">
                  <p className="text-white font-black text-xl uppercase mb-2">
                    Ready to book?
                  </p>
                  <p className="text-white/50 text-sm mb-6">
                    We come to you. No drop-off, no waiting.
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

              <div className="mt-10">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All guides
                </Link>
              </div>
            </div>

            {headings.length > 0 && (
              <aside className="hidden lg:block sticky top-32 self-start">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">
                  Contents
                </p>
                <nav>
                  <ol className="flex flex-col gap-3">
                    {headings.map((h) => (
                      <li key={h.slug}>
                        <a
                          href={`#${h.slug}`}
                          className="text-xs text-white/40 hover:text-white transition-colors leading-snug block"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
