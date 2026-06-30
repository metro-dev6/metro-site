import type { Metadata } from "next";
import { notFound } from "next/navigation";

const SERVICES: Record<string, {
  name: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  "signature-wash": {
    name: "Signature Wash",
    metaTitle: "Mobile Signature Wash in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Hand wash, light wax, and interior wipe-down. Mobile service — we come to you in Bakersfield, CA. Starting at $80.",
  },
  "exterior-detail": {
    name: "Exterior Detail",
    metaTitle: "Mobile Exterior Detailing in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Full exterior decontamination, clay bar, and paint protection. Mobile service in Bakersfield, CA. Starting at $150.",
  },
  "interior-detail": {
    name: "Interior Detail",
    metaTitle: "Mobile Interior Detailing in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Deep interior cleaning — vacuumed, wiped, dressed, and protected. Mobile service in Bakersfield, CA. Starting at $200.",
  },
  "refresh-detail": {
    name: "Refresh Detail",
    metaTitle: "Mobile Refresh Detail in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Interior and exterior refresh for vehicles that need more than a wash. Mobile service in Bakersfield, CA. Starting at $250.",
  },
  "full-detail": {
    name: "Full Detail",
    metaTitle: "Mobile Full Detail in Bakersfield, CA | Metro Auto Detailing",
    metaDescription: "Complete interior and exterior detail with full decontamination, clay bar, and paint protection. Mobile service in Bakersfield, CA. Starting at $400.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `https://www.metroautodetailing.pro/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://www.metroautodetailing.pro/services/${slug}`,
      siteName: "Metro Auto Detailing",
      images: [{ url: "https://www.metroautodetailing.pro/hero-car-enhanced.jpg", width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-black" />
  );
}
