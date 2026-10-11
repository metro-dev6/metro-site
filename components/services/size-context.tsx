"use client";

import { createContext, useContext, useState } from "react";
import type { VehicleClass } from "./services-data";

type SizeContextValue = { size: VehicleClass; setSize: (s: VehicleClass) => void };

const SizeContext = createContext<SizeContextValue | null>(null);

export function SizeProvider({ children }: { children: React.ReactNode }) {
  const [size, setSize] = useState<VehicleClass>("sedan");
  return <SizeContext.Provider value={{ size, setSize }}>{children}</SizeContext.Provider>;
}

export function useVehicleSize(): SizeContextValue {
  const ctx = useContext(SizeContext);
  if (!ctx) throw new Error("useVehicleSize must be used within <SizeProvider>");
  return ctx;
}
