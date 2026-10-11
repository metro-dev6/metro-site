import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Sitewide layout kit. One source of truth for section width, eyebrows, and page headers.
// Change these once and every page that composes from them follows.

// Standard content section: horizontal padding + the 1600px max-width container.
// Vertical padding is passed per use (py-16, py-10, etc.).
export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("px-6 lg:px-10", className)}>
      <div className="mx-auto max-w-[1600px]">{children}</div>
    </section>
  );
}

// Section eyebrow: short yellow rule + Fraunces label + heading. Light default, dark for use inside DarkCard.
export function SectionLabel({
  label,
  heading,
  sub,
  theme = "light",
}: {
  label: string;
  heading: string;
  sub?: string;
  theme?: "light" | "dark";
}) {
  const dark = theme === "dark";
  return (
    <div className="mb-10">
      <div className="h-[3px] w-10 bg-brand-yellow mb-4" />
      <div
        className={cn(
          "font-accent text-xs font-medium tracking-[0.25em] uppercase mb-3 not-italic",
          dark ? "text-brand-yellow" : "text-brand-black"
        )}
      >
        {label}
      </div>
      <h2
        className={cn(
          "text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight",
          dark ? "text-white" : "text-brand-black"
        )}
      >
        {heading}
      </h2>
      {sub && (
        <p className={cn("text-sm mt-3 max-w-2xl leading-relaxed", dark ? "text-white/60" : "text-black/60")}>
          {sub}
        </p>
      )}
    </div>
  );
}

// Page header: eyebrow + h1 (pass a node so an accent span can be included) + subcopy.
export function PageHeader({
  eyebrow,
  title,
  sub,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Section className={cn("pt-20 pb-10", centered && "text-center", className)}>
      {eyebrow && (
        <span className="block text-xs font-extrabold tracking-[0.24em] uppercase text-black/55 mb-4">{eyebrow}</span>
      )}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-brand-black leading-[0.98]">
        {title}
      </h1>
      {sub && (
        <p className={cn("text-lg text-black/60 max-w-xl leading-relaxed mt-5", centered && "mx-auto")}>{sub}</p>
      )}
    </Section>
  );
}
