"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEstimateCart } from "@/hooks/use-estimate-cart";
import { ChevronUp, X, ArrowRight } from "lucide-react";

export function EstimateCartBar() {
  const { items, remove, clear, total } = useEstimateCart();
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none"
        >
          <div className="mx-auto max-w-2xl pointer-events-auto">
            <div className="rounded-2xl bg-zinc-900 border border-white/[0.12] shadow-2xl overflow-hidden">

              {/* Expanded list */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pt-4 pb-2 flex flex-col gap-1">
                      {items.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between py-2.5 border-b border-white/[0.06]"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-white/80 font-medium">{item.name}</span>
                            <span className="text-xs text-white/40 uppercase tracking-wide">
                              {item.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-brand-yellow font-numeric">
                              ${item.price}
                            </span>
                            <button
                              onClick={() => remove(item.name)}
                              className="text-white/30 hover:text-red-400 transition-colors"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between px-5 py-3">
                      <button
                        onClick={clear}
                        className="text-xs text-white/30 hover:text-white/60 transition-colors"
                      >
                        Clear all
                      </button>
                      <span className="text-xs text-white/40">
                        Est. starting price. Larger vehicles may vary.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Collapsed bar */}
              <div className="flex items-center gap-4 px-5 py-4">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="flex items-center gap-3 flex-1 min-w-0 text-left"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-yellow text-black font-black text-xs shrink-0">
                    {items.length}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white/80 truncate font-medium">
                      {items.map((i) => i.name).join(", ")}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronUp className="h-4 w-4 text-white/40" />
                  </motion.div>
                </button>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-brand-yellow font-black text-lg font-numeric">
                    ${total.toLocaleString()}
                  </span>
                  <Link
                    href={`/estimate?services=${encodeURIComponent(items.map((i) => i.name).join(","))}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-yellow text-black text-sm font-black tracking-wide hover:bg-brand-yellow/90 transition-colors whitespace-nowrap"
                  >
                    Start Estimate
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
