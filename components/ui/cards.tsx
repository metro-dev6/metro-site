import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Sitewide card kit. Two surfaces that float on the off-white ground.

// Dark floating card: the #141414 rounded surface (add-ons, trust, CTA, gallery).
// Self-insets with mx-4 sm:mx-10 and caps its content at 1600px, matching the homepage.
export function DarkCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("bg-[#141414] rounded-[40px] mx-4 sm:mx-10 px-6 lg:px-12 py-12 lg:py-14", className)}>
      <div className="mx-auto max-w-[1600px]">{children}</div>
    </div>
  );
}

// Light info card: the #faf9f7 shadowed surface (service, maintenance, who).
// featured = yellow border for the Most Popular / Most Common card.
export function LightCard({
  children,
  className = "",
  featured = false,
}: {
  children: ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-[#faf9f7] shadow-[0_12px_30px_rgba(0,0,0,0.10)]",
        featured ? "border-2 border-brand-yellow" : "border border-black/15",
        className
      )}
    >
      {children}
    </div>
  );
}
