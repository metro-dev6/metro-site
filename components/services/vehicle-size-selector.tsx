"use client";

import { motion } from "framer-motion";
import { useVehicleSize } from "./size-context";
import { VEHICLE_CLASSES } from "./services-data";

// Vehicle-size selector. Pick once, every price on the page reacts.
// Motion #2 (press feedback) + #3 (sliding selected indicator via layoutId).
export function VehicleSizeSelector() {
  const { size, setSize } = useVehicleSize();

  return (
    <div className="py-6 border-b border-black/10">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-black/55 mb-3">
          Pick your vehicle size, prices update below
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="group" aria-label="Vehicle size">
          {VEHICLE_CLASSES.map((vc) => {
            const active = vc.id === size;
            return (
              <button
                key={vc.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSize(vc.id)}
                className="relative text-left rounded-2xl border-2 border-black/10 bg-[#faf9f7] px-4 py-3 transition-[transform,border-color] duration-150 active:scale-[0.97] hover:border-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-yellow"
              >
                {active && (
                  <motion.span
                    layoutId="size-active"
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="absolute inset-0 rounded-2xl border-2 border-brand-yellow bg-brand-yellow/[0.06] pointer-events-none"
                  />
                )}
                <span className="relative block font-extrabold text-sm uppercase tracking-tight text-brand-black">
                  {vc.label}
                </span>
                <span className="relative block text-xs text-black/45 mt-1">{vc.example}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
