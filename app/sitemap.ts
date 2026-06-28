import type { MetadataRoute } from "next";

const BASE = "https://metroautodetailing.pro";

const LOCATION_SLUGS = [
  "bakersfield",
  "southwest-bakersfield",
  "stockdale",
  "seven-oaks",
  "oleander",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locationPages = LOCATION_SLUGS.map((slug) => ({
    url: `${BASE}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/estimate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...locationPages,
  ];
}
