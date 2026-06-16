"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "HOME",                href: "/"         },
  { label: "FAQ",                 href: "/faq"      },
  { label: "SERVICES",            href: "/services" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-9 z-40 bg-brand-black transition-shadow duration-200",
        scrolled && "shadow-[0_1px_0_0_rgba(255,255,255,0.08)]"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        <Link href="/" className="flex items-center">
          <Image
            src="/metro_v3_5.png"
            alt="Metro Auto Detailing"
            width={120}
            height={51}
            priority
          />
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-white/80 transition-colors hover:text-brand-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/estimate"
            className="hidden md:inline-flex h-9 items-center rounded-md bg-brand-yellow px-4 text-sm font-semibold text-brand-black transition-opacity hover:opacity-90"
          >
            BUILD YOUR ESTIMATE
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden text-brand-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-brand-black border-t border-white/10 px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-brand-white/80 hover:text-brand-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/estimate"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-brand-yellow px-4 text-sm font-semibold text-brand-black"
            >
              BUILD YOUR ESTIMATE
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
