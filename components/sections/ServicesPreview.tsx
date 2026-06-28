import Link from "next/link";
import Image from "next/image";

const services = [
  {
    name: "Signature Wash",
    price: "$80",
    description: "Hand wash, wheels, tire dressing, wax coat, and interior vacuum. Keeps the paint clean and protected between details.",
    photo: "/wash-bg-3.JPEG",
    imageStyle: { objectFit: "cover" as const, objectPosition: "75% center" },
  },
  {
    name: "Exterior Detail",
    price: "$150",
    description: "Full paint decontamination and ceramic sealant. 4-6 months of protection bonded to dry paint.",
    photo: "/exterior-bg.JPEG",
    imageStyle: { objectFit: "cover" as const, objectPosition: "center" },
  },
  {
    name: "Interior Detail",
    price: "$200",
    description: "Built for interiors that need more than a vacuum. Seats shampooed, carpet extracted, every surface deep cleaned and UV protected.",
    photo: "/interior-bg.JPEG",
    imageStyle: { objectFit: "cover" as const, objectPosition: "center" },
  },
  {
    name: "Refresh Detail",
    price: "$250",
    description: "For when the car needs attention inside and out but not a full decon. Exterior washed and sealed with wax. Interior deep cleaned, spot treated, and UV protected.",
    photo: "/refresh-bg.JPEG",
    imageStyle: { objectFit: "cover" as const, objectPosition: "center bottom" },
  },
  {
    name: "Full Detail",
    price: "$400",
    description: "Complete exterior decontamination and ceramic sealant outside. Seats shampooed, carpet extracted, every surface UV protected inside.",
    photo: "/full-detail-bg.JPEG",
    imageStyle: { objectFit: "cover" as const, objectPosition: "center" },
  },
];

export function ServicesPreview() {
  return (
    <section className="bg-black pt-14 pb-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-brand-white leading-tight">
              Services
            </h2>
            <Link
              href="/services#essentials"
              className="text-xs font-bold uppercase tracking-widest text-brand-white/40 hover:text-brand-yellow transition-colors flex items-center gap-2"
            >
              Full pricing &amp; add-ons
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="mt-4 h-px bg-white/[0.07]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.07]">
          {services.map((service) => (
            <Link
              key={service.name}
              href="/services#essentials"
              className="group relative min-h-[300px] flex flex-col justify-end"
            >
              {/* Image wrapper */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={service.photo}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={service.imageStyle}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/0 group-hover:from-black group-hover:via-black/75 transition-colors duration-300" />

              {/* Border */}
              <div
                className="absolute inset-0 pointer-events-none z-30"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), inset 1px 0 0 rgba(255,255,255,0.08), inset -1px 0 0 rgba(255,255,255,0.08)" }}
              />

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col gap-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-black uppercase tracking-wide text-brand-white leading-tight" style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 2px 16px rgba(0,0,0,0.9)" }}>
                    {service.name}
                  </h3>
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-brand-yellow transition-colors shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                <p className="text-sm text-white/80 leading-relaxed" style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 1px 12px rgba(0,0,0,0.9)" }}>
                  {service.description}
                </p>

                <p className="text-2xl font-black text-brand-yellow font-dm-sans" style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 2px 16px rgba(0,0,0,0.8)" }}>
                  Starting at {service.price}
                </p>
              </div>
            </Link>
          ))}

          {/* 6th cell — Add-ons */}
          <Link
            href="/services#essentials"
            className="group bg-zinc-950 min-h-[300px] flex flex-col justify-start p-8 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-black uppercase tracking-wide text-brand-white leading-tight">
                Add-Ons
              </h3>

              <ul className="flex flex-col gap-2">
                {[
                  { name: "Headlight Restoration", price: "$80" },
                  { name: "Trim Restoration", price: "$100" },
                  { name: "Water Spot Removal", price: "$100" },
                  { name: "Pet Hair and/or Sand Removal", price: "$80" },
                  { name: "Carpet & Seat Extraction", price: "$70" },
                  { name: "Engine Bay", price: "$50" },
                  { name: "Leather Conditioning", price: "$40" },
                ].map((addon) => (
                  <li key={addon.name} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-white/60">{addon.name}</span>
                    <span className="text-sm font-black text-brand-yellow font-dm-sans">{addon.price}</span>
                  </li>
                ))}
              </ul>

              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-yellow group-hover:gap-4 transition-all duration-200 pt-1">
                See all services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
