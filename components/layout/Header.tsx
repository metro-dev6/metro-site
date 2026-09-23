"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShinyButton } from "@/components/ui/shiny-button";
import { PhoneLink } from "@/components/PhoneLink";

const navLinks = [
  { label: "Home",     href: "/"         },
  { label: "Services", href: "/services" },
  { label: "FAQ",      href: "/#faq"     },
];

function handleHomeClick(e: React.MouseEvent) {
  if (window.location.pathname === "/") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function handleFaqClick(e: React.MouseEvent) {
  e.preventDefault();
  (document.getElementById("mobile-nav") as HTMLDetailsElement | null)?.removeAttribute("open");
  if (window.location.pathname === "/") {
    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.assign("/#faq");
  }
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const heroMode = isHome && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 44);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed z-40 transition-[background-color,box-shadow,inset,top] duration-300",
        heroMode
          ? "top-11 inset-x-4 sm:inset-x-10 bg-transparent"
          : scrolled
          ? "top-0 inset-x-0 bg-site-bg"
          : "top-11 inset-x-0 bg-site-bg",
        scrolled && "shadow-[0_1px_0_0_rgba(255,255,255,0.08)]"
      )}
    >
      <div className="flex h-16 items-center justify-between px-6 lg:px-25">

        {/* Left: logo + nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/metro_v3_5.png"
              alt="Metro Auto Detailing"
              width={150}
              height={80}
              priority
              style={{ filter: "drop-shadow(0 1px 6px rgba(0,0,0,1))" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={
                  link.label === "HOME" ? handleHomeClick
                  : link.label === "FAQ" ? handleFaqClick
                  : undefined
                }
                style={{ textShadow: "0 1px 6px rgba(0,0,0,1.0)" }}
                className="text-xl font-medium text-brand-white transition-colors hover:text-brand-yellow"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <Link href="/estimate">
              <ShinyButton className="bg-brand-yellow text-brand-black font-black tracking-widest h-12 px-7 text-lg border border-brand-yellow hover:shadow-[0_0_20px_5px_rgba(250,194,5,0.45),0_0_0_5px_rgba(255,255,255,0.15),0_0_0_6px_rgba(255,255,255,0.2)] hover:translate-y-0">
                Book Now
              </ShinyButton>
            </Link>
            <PhoneLink className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full border-2 border-white bg-black/40 backdrop-blur-sm px-6 text-base font-bold uppercase tracking-widest text-brand-white shadow-lg transition-colors duration-700 hover:border-4 hover:border-brand-black">
              <span className="absolute inset-0 origin-left scale-x-0 bg-brand-white transition-transform duration-700 ease-out group-hover:scale-x-100" />
              <Phone className="relative z-10 h-4 w-4 shrink-0 transition-colors duration-700 group-hover:text-brand-black" strokeWidth={2.5} />
              <span className="relative z-10 transition-colors duration-700 group-hover:text-brand-black">
                (661) 368-5165
              </span>
            </PhoneLink>
          </div>

          {/* Mobile nav — pure HTML details, no React state */}
          <details id="mobile-nav" className="md:hidden group">
            <summary className="flex items-center list-none [&::-webkit-details-marker]:hidden cursor-pointer text-brand-white select-none touch-manipulation">
              <Menu size={22} className="group-open:hidden" />
              <X size={22} className="hidden group-open:block" />
            </summary>
            {/* Fixed dropdown below header — matches whichever top offset the header is currently using */}
            <div
              className={cn(
                "fixed left-0 right-0 z-40 bg-site-bg border-t border-white/10 px-6 pb-6 pt-4",
                heroMode ? "top-[128px]" : scrolled ? "top-16" : "top-[108px]"
              )}
            >
              <nav className="flex flex-col gap-4 mx-auto max-w-7xl items-end">
                <a
                  href="/"
                  onClick={(e) => {
                    handleHomeClick(e);
                    (document.getElementById("mobile-nav") as HTMLDetailsElement | null)?.removeAttribute("open");
                  }}
                  className="text-xl font-medium text-brand-white hover:text-brand-yellow"
                >
                  HOME
                </a>
                <Link
                  href="/services"
                  onClick={() => (document.getElementById("mobile-nav") as HTMLDetailsElement | null)?.removeAttribute("open")}
                  className="text-xl font-medium text-brand-white hover:text-brand-yellow"
                >
                  SERVICES
                </Link>
                <a
                  href="/#faq"
                  onClick={handleFaqClick}
                  className="text-xl font-medium text-brand-white hover:text-brand-yellow"
                >
                  FAQ
                </a>
                <Link
                  href="/estimate"
                  onClick={() => (document.getElementById("mobile-nav") as HTMLDetailsElement | null)?.removeAttribute("open")}
                  className="mt-2"
                >
                  <ShinyButton className="bg-brand-yellow text-brand-black font-black tracking-widest h-12 px-7 text-sm">
                    GET A FREE ESTIMATE
                  </ShinyButton>
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
