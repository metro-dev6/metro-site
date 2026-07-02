import type { MetadataRoute } from "next";

const BASE = "https://www.metroautodetailing.pro";

const LOCATION_SLUGS = [
  "bakersfield",
  "southwest-bakersfield",
  "stockdale",
  "seven-oaks",
  "terra-vista",
  "rosedale",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locationPages = LOCATION_SLUGS.map((slug) => ({
    url: `${BASE}/locations/${slug}`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date("2026-07-01"), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/services`, lastModified: new Date("2026-07-01"), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE}/estimate`, lastModified: new Date("2026-07-01"), changeFrequency: "monthly" as const, priority: 0.9 },
    ...locationPages,
  ];
}
