import Link from "next/link";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.74a8.2 8.2 0 0 0 4.79 1.52V6.81a4.84 4.84 0 0 1-1.02-.12z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: "https://instagram.com/metroautodetailingca", Icon: InstagramIcon },
  { label: "Facebook",  href: "https://facebook.com/metroautodetailing",  Icon: FacebookIcon  },
  { label: "TikTok",    href: "https://tiktok.com/@metroautodetailing",   Icon: TikTokIcon    },
];

export function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-11 bg-brand-black border-b border-white/10 flex items-center">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 flex items-center justify-between">
        <Link href="/estimate" className="group flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="hidden sm:block text-sm font-bold tracking-[0.12em] uppercase text-brand-yellow">
            15% Off Your First Detail
          </span>
          <span className="hidden sm:block text-sm font-bold tracking-[0.12em] uppercase text-brand-white/40">
            ·&nbsp;&nbsp;Book Online to Redeem
          </span>
          <span className="sm:hidden text-sm font-bold tracking-[0.12em] uppercase text-brand-yellow">
            15% Off First Detail
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="tel:6613685165"
            className="text-sm font-bold tracking-wide hover:text-brand-white transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline text-brand-white/60">Call or Text:&nbsp;</span><span className="text-brand-yellow font-bold">(661) 368-5165</span>
          </a>
          <div className="hidden sm:flex items-center gap-3 text-brand-white/50">
            {socials.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-brand-white transition-colors"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
