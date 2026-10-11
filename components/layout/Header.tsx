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
  const pillIsLight = false; // toggle while comparing glass tints: true = light frosted, false = dark + yellow glow

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 44);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed z-40 transition-[background-color,box-shadow,inset,top,border-radius] duration-300",
        heroMode
          ? "top-11 inset-x-4 sm:inset-x-10 bg-transparent"
          : cn(
              scrolled ? "top-8" : "top-[52px]",
              "left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-5xl rounded-full bg-[rgba(20,21,23,0.5)] backdrop-blur-xl backdrop-saturate-150 border border-[rgba(250,194,5,0.25)]"
            ),
        !heroMode && "shadow-[0_0_0_1px_rgba(250,194,5,0.08),0_4px_24px_rgba(250,194,5,0.1),inset_0_1px_0_rgba(255,255,255,0.15)]"
      )}
    >
      <div className={cn("flex items-center justify-between", heroMode ? "h-28 px-6 lg:px-25" : "h-16 px-6")}>

        {/* Left: logo + nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            {heroMode ? (
              <Image
                src="/brand/metro-auto-detailing-wordmark.png"
                alt="Metro Auto Detailing"
                width={150}
                height={80}
                priority
                style={{ filter: "drop-shadow(0 1px 6px rgba(0,0,0,1))" }}
              />
            ) : (
              <Image src="/brand/metro-auto-detailing-logo.png" alt="Metro Auto Detailing" width={54} height={54} priority />
            )}
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
                style={!heroMode && pillIsLight ? undefined : { textShadow: "0 1px 6px rgba(0,0,0,1.0)" }}
                className={cn(
                  "text-md font-medium transition-colors hover:text-brand-yellow",
                  !heroMode && pillIsLight ? "text-brand-black" : "text-brand-white"
                )}
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
              <ShinyButton className={cn(
                "bg-brand-yellow text-brand-black font-black tracking-widest border border-brand-yellow hover:shadow-[0_0_20px_5px_rgba(250,194,5,0.45),0_0_0_5px_rgba(255,255,255,0.15),0_0_0_6px_rgba(255,255,255,0.2)] hover:translate-y-0",
                heroMode ? "h-12 px-7 text-lg" : "h-9 px-5 text-sm"
              )}>
                Book Now
              </ShinyButton>
            </Link>
            <PhoneLink className={cn(
              "group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-white bg-black/40 backdrop-blur-sm font-bold uppercase tracking-widest text-brand-white shadow-lg transition-colors duration-700 hover:border-4 hover:border-brand-black",
              heroMode ? "h-12 px-6 text-base" : "h-9 px-4 text-xs"
            )}>
              <span className="absolute inset-0 origin-left scale-x-0 bg-brand-white transition-transform duration-700 ease-out group-hover:scale-x-100" />
              <Phone className="relative z-10 h-4 w-4 shrink-0 transition-colors duration-700 group-hover:text-brand-black" strokeWidth={2.5} />
              <span className="relative z-10 transition-colors duration-700 group-hover:text-brand-black">
                (661) 368-5165
              </span>
            </PhoneLink>
          </div>

          {/* Mobile nav — pure HTML details, no React state */}
          <details id="mobile-nav" className="md:hidden group">
            <summary className={cn(
              "flex items-center list-none [&::-webkit-details-marker]:hidden cursor-pointer select-none touch-manipulation",
              !heroMode && pillIsLight ? "text-brand-black" : "text-brand-white"
            )}>
              <Menu size={22} className="group-open:hidden" />
              <X size={22} className="hidden group-open:block" />
            </summary>
            {/* Fixed dropdown below header — matches whichever top offset the header is currently using */}
            <div
              className={cn(
                "fixed inset-x-0 bottom-0 z-40 bg-site-bg flex flex-col",
                heroMode ? "top-[128px]" : scrolled ? "top-[96px]" : "top-[116px]"
              )}
            >
              <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
                <a
                  href="/"
                  onClick={(e) => {
                    handleHomeClick(e);
                    (document.getElementById("mobile-nav") as HTMLDetailsElement | null)?.removeAttribute("open");
                  }}
                  className="[font-family:var(--font-heading)] text-4xl font-bold uppercase tracking-wide text-brand-white hover:text-brand-yellow transition-colors"
                >
                  Home
                </a>
                <Link
                  href="/services"
                  onClick={() => (document.getElementById("mobile-nav") as HTMLDetailsElement | null)?.removeAttribute("open")}
                  className="[font-family:var(--font-heading)] text-4xl font-bold uppercase tracking-wide text-brand-white hover:text-brand-yellow transition-colors"
                >
                  Services
                </Link>
                <a
                  href="/#faq"
                  onClick={handleFaqClick}
                  className="[font-family:var(--font-heading)] text-4xl font-bold uppercase tracking-wide text-brand-white hover:text-brand-yellow transition-colors"
                >
                  FAQ
                </a>
                <Link
                  href="/estimate"
                  onClick={() => (document.getElementById("mobile-nav") as HTMLDetailsElement | null)?.removeAttribute("open")}
                  className="mt-4"
                >
                  <ShinyButton className="bg-brand-yellow text-brand-black font-black tracking-widest h-14 px-9 text-base">
                    GET A FREE ESTIMATE
                  </ShinyButton>
                </Link>
              </nav>
              <div className="pb-12 flex flex-col items-center gap-2">
                <a
                  href="tel:+16613685165"
                  className="text-brand-white text-lg font-semibold tracking-wide hover:text-brand-yellow transition-colors"
                >
                  (661) 368-5165
                </a>
                <p className="text-brand-yellow/90 text-[11px] uppercase tracking-[0.25em]">
                  We Come to You. Driven by Detail.
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
