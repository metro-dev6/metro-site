"use client";

import { useEstimateCart } from "@/hooks/use-estimate-cart";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddonCardProps {
  name: string;
  price: string;
  priceValue: number;
  description: string;
}

export function AddonCard({ name, price, priceValue, description }: AddonCardProps) {
  const { has, toggle } = useEstimateCart();
  const inCart = has(name);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-black uppercase text-white leading-tight">{name}</h3>
        <span className="text-brand-yellow font-bold text-xl shrink-0 font-numeric">{price}</span>
      </div>
      <p className="text-sm text-white/60 leading-relaxed flex-1">{description}</p>
      <button
        onClick={() => toggle({ name, price: priceValue, type: "addon" })}
        className={cn(
          "mt-1 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-black tracking-wide transition-colors",
          inCart
            ? "border border-red-500/20 text-red-400/50 hover:border-red-500/40 hover:text-red-400/80"
            : "border border-brand-yellow/40 text-brand-yellow hover:bg-brand-yellow/10"
        )}
      >
        {inCart ? (
          <>
            <X className="h-4 w-4" />
            Remove from Estimate
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            Add to Estimate
          </>
        )}
      </button>
    </div>
  );
}
