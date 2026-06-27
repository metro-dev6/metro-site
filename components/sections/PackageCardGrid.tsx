"use client";

import { Check, Plus, X } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";
import { useEstimateCart } from "@/hooks/use-estimate-cart";

export interface MetroPlan {
  name: string;
  price: number;
  largerVehicle?: string;
  description: string;
  features: string[];
  buttonText: string;
  href: string;
  featured?: boolean;
  note?: string;
}

function MetroPricingCard({ plan, index }: { plan: MetroPlan; index: number }) {
  const { has, toggle } = useEstimateCart();
  const inCart = has(plan.name);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl p-8 gap-6",
        plan.featured
          ? "border-2 border-brand-yellow bg-white/[0.03]"
          : "border border-white/[0.08] bg-white/[0.02]"
      )}
    >
      {plan.featured && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-brand-yellow py-1.5 px-4 rounded-full">
            <span className="text-black text-xs font-black tracking-widest uppercase">
              Best Value
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col text-center">
        <h3 className="text-xl font-black uppercase text-white tracking-tight">
          {plan.name}
        </h3>
        <p className="mt-2 text-sm text-white/50 leading-snug">{plan.description}</p>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-5xl font-bold text-brand-yellow font-numeric">
          <NumberFlow
            value={plan.price}
            format={{ style: "currency", currency: "USD", minimumFractionDigits: 0 }}
          />
        </span>
        {plan.largerVehicle && (
          <span className="text-xs text-white/40 mt-1">{plan.largerVehicle} larger vehicles</span>
        )}
      </div>

      <ul className="flex flex-col gap-2.5 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-white/70 leading-snug">
            <Check className="h-4 w-4 text-brand-yellow mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {plan.note && (
        <p className="text-xs text-white/40 leading-relaxed border-t border-white/[0.06] pt-4">
          {plan.note}
        </p>
      )}

      <button
        onClick={() => toggle({ name: plan.name, price: plan.price, type: "package" })}
        className={cn(
          "flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-black tracking-wide transition-colors mt-auto",
          inCart
            ? "border border-red-500/20 text-red-400/50 hover:border-red-500/40 hover:text-red-400/80"
            : plan.featured
            ? "bg-brand-yellow text-black hover:bg-brand-yellow/90"
            : "border border-brand-yellow/40 text-brand-yellow hover:bg-brand-yellow hover:text-black"
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

interface PackageCardGridProps {
  plans: MetroPlan[];
  columns?: 2 | 3;
}

export function PackageCardGrid({ plans, columns = 3 }: PackageCardGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6",
        columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      )}
    >
      {plans.map((plan, index) => (
        <MetroPricingCard key={plan.name} plan={plan} index={index} />
      ))}
    </div>
  );
}
