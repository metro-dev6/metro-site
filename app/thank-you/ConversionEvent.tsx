"use client";

import { useEffect } from "react";

type Gtag = (...args: unknown[]) => void;

export default function ConversionEvent() {
  useEffect(() => {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    gtag?.("event", "estimate_submitted");
  }, []);

  return null;
}
