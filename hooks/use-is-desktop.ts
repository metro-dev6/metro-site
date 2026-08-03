"use client";

import { useEffect, useState } from "react";

export function useIsDesktop(breakpointPx: number = 768): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpointPx}px)`);

    const updateMatch = () => setIsDesktop(mediaQuery.matches);
    updateMatch();

    mediaQuery.addEventListener("change", updateMatch);
    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, [breakpointPx]);

  return isDesktop;
}
