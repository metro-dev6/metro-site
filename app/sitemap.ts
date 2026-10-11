import type { MetadataRoute } from "next";

const BASE = "https://metroautodetailing.pro";

// Service detail pages (/services/[slug]) currently redirect to /services (not built yet,
// see app/services/[slug]/page.tsx), so they are intentionally excluded from the sitemap.
// Add them here once the detail pages render instead of redirecting.

// Keep these in sync when locations or blog posts are added.
const LOCATION_SLUGS = [
  "bakersfield",
  "southwest-bakersfield",
  "stockdale",
  "seven-oaks",
  "rosedale",
  "terra-vista",
];

// Blog is parked pre-launch: the one post was pulled to content/_parked/ and
// /blog is noindex with no posts, so neither is advertised here. Re-add the
// /blog static entry and a BLOG_SLUGS loop when real posts go live.

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/estimate", priority: 0.9 },
    { path: "/maintenance-terms", priority: 0.4 },
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));

  for (const slug of LOCATION_SLUGS) {
    entries.push({ url: `${BASE}/locations/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }

  return entries;
}
