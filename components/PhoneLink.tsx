"use client";

import type { ReactNode } from "react";

type Gtag = (...args: unknown[]) => void;

function trackPhoneClick() {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", "phone_click");
}

export function PhoneLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a href="tel:6613685165" className={className} onClick={trackPhoneClick}>
      {children}
    </a>
  );
}
