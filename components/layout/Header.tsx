"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "HOME",     href: "/"         },
  { label: "SERVICES", href: "/services" },
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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-11 z-40 bg-brand-black transition-shadow duration-200",
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

          {/* Mobile nav — pure HTML details, no React state */}
          <details id="mobile-nav" className="md:hidden group">
            <summary className="flex items-center list-none [&::-webkit-details-marker]:hidden cursor-pointer text-brand-white select-none touch-manipulation">
              <Menu size={22} className="group-open:hidden" />
              <X size={22} className="hidden group-open:block" />
            </summary>
            {/* Fixed dropdown below announcement bar (44px) + header (64px) = 108px */}
            <div className="fixed left-0 right-0 top-[108px] z-40 bg-brand-black border-t border-white/10 px-6 pb-6 pt-4">
              <nav className="flex flex-col gap-4 mx-auto max-w-7xl">
                <a
                  href="/"
                  onClick={(e) => {
                    handleHomeClick(e);
                    (document.getElementById("mobile-nav") as HTMLDetailsElement | null)?.removeAttribute("open");
                  }}
                  className="text-base font-medium text-brand-white/80 hover:text-brand-white"
                >
                  HOME
                </a>
                <Link
                  href="/services"
                  onClick={() => (document.getElementById("mobile-nav") as HTMLDetailsElement | null)?.removeAttribute("open")}
                  className="text-base font-medium text-brand-white/80 hover:text-brand-white"
                >
                  SERVICES
                </Link>
                <a
                  href="/#faq"
                  onClick={handleFaqClick}
                  className="text-base font-medium text-brand-white/80 hover:text-brand-white"
                >
                  FAQ
                </a>
                <Link
                  href="/estimate"
                  onClick={() => (document.getElementById("mobile-nav") as HTMLDetailsElement | null)?.removeAttribute("open")}
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-brand-yellow px-4 text-sm font-semibold text-brand-black"
                >
                  BUILD YOUR ESTIMATE
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
