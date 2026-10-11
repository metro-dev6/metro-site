"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { useVehicleSize } from "./size-context";
import type { PriceSet } from "./services-data";

// Reactive price. Reads the selected vehicle size and animates the value in on change (Motion #1).
// Oversized renders "Custom" (quoted separately). Reduced-motion handled globally by MotionConfig.
export function ServicePrice({
  prices,
  index = 0,
  className = "",
}: {
  prices: PriceSet;
  index?: number;
  className?: string;
}) {
  const { size } = useVehicleSize();
  const isCustom = size === "oversized";
  const value = isCustom ? "Custom" : `$${prices[size]}`;

  return (
    <motion.span
      key={size}
      initial={{ opacity: 0.5, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: EASE_OUT, delay: index * 0.03 }}
      className={`font-numeric font-bold tabular-nums ${isCustom ? "text-[0.65em]" : ""} ${className}`}
    >
      {value}
    </motion.span>
  );
}
