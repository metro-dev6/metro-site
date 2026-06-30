"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useEstimateCart } from "@/hooks/use-estimate-cart";
import { ArrowRight, CheckCircle, Paperclip, ChevronDown, Plus, X } from "lucide-react";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

const PACKAGES = [
  { name: "Signature Wash", price: 80 },
  { name: "Exterior Detail", price: 150 },
  { name: "Interior Detail", price: 200 },
  { name: "Refresh Detail", price: 250 },
  { name: "Full Detail", price: 400 },
] as const;

const ADDONS = [
  { name: "Headlight Restoration", price: 80 },
  { name: "Trim Restoration", price: 100 },
  { name: "Water Spot Removal", price: 100 },
  { name: "Pet Hair & Sand Removal", price: 80 },
  { name: "Carpet & Seat Extraction", price: 70 },
  { name: "Engine Bay", price: 50 },
  { name: "Leather Conditioning", price: 40 },
] as const;

const ALL_SERVICES = [...PACKAGES, ...ADDONS];

const RELEVANT_ADDONS: Record<string, string[]> = {
  "Signature Wash": ["Headlight Restoration", "Trim Restoration", "Water Spot Removal", "Engine Bay"],
  "Exterior Detail": ["Headlight Restoration", "Trim Restoration", "Water Spot Removal", "Engine Bay"],
  "Interior Detail": ["Pet Hair & Sand Removal", "Carpet & Seat Extraction", "Leather Conditioning"],
  "Refresh Detail": ["Headlight Restoration", "Trim Restoration", "Water Spot Removal", "Pet Hair & Sand Removal", "Carpet & Seat Extraction", "Engine Bay", "Leather Conditioning"],
  "Full Detail": ["Headlight Restoration", "Trim Restoration", "Pet Hair & Sand Removal", "Carpet & Seat Extraction", "Engine Bay", "Leather Conditioning"],
};

const SURCHARGES: Record<string, number> = {
  "Signature Wash": 20,
  "Exterior Detail": 20,
  "Interior Detail": 40,
  "Refresh Detail": 40,
  "Full Detail": 40,
};

const MAKES = [
  "Acura", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler",
  "Dodge", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jeep",
  "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz",
  "Mitsubishi", "Nissan", "Ram", "Subaru", "Tesla", "Toyota",
  "Volkswagen", "Volvo", "Other",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1984 }, (_, i) => currentYear - i);

type FormState = "idle" | "submitting" | "success" | "error";

type Vehicle = {
  id: string;
  year: string;
  make: string;
  model: string;
  largerVehicle: boolean;
};

function newVehicle(): Vehicle {
  return {
    id: Math.random().toString(36).slice(2),
    year: "",
    make: "",
    model: "",
    largerVehicle: false,
  };
}

export function EstimateForm() {
  const { clear } = useEstimateCart();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<Set<string>>(() => {
    const param = searchParams.get("services");
    if (!param) return new Set();
    return new Set(param.split(",").map((s) => s.trim()).filter(Boolean));
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => [newVehicle()]);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const selectedPackage = PACKAGES.find((p) => selected.has(p.name))?.name ?? null;
  const relevantAddons = selectedPackage ? new Set(RELEVANT_ADDONS[selectedPackage] ?? []) : null;

  const disabledPackages: Set<string> = selectedPackage
    ? new Set(PACKAGES.filter((p) => p.name !== selectedPackage).map((p) => p.name))
    : new Set();

  const disabledAddons: Set<string> = relevantAddons
    ? new Set(ADDONS.filter((a) => !relevantAddons.has(a.name)).map((a) => a.name))
    : new Set();

  const perVehicleBase = [...selected].reduce((sum, name) => {
    const svc = ALL_SERVICES.find((s) => s.name === name);
    return sum + (svc?.price ?? 0);
  }, 0);

  const grandTotal = vehicles.reduce((sum, v) => {
    const vehicleSurcharge = v.largerVehicle
      ? [...selected].reduce((s, name) => s + (SURCHARGES[name] ?? 0), 0)
      : 0;
    return sum + perVehicleBase + vehicleSurcharge;
  }, 0);

  function updateVehicle(id: string, patch: Partial<Omit<Vehicle, "id">>) {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  }

  function addVehicle() {
    setVehicles((prev) => [...prev, newVehicle()]);
  }

  function removeVehicle(id: string) {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  }

  function toggleService(name: string) {
    const isPackage = PACKAGES.some((p) => p.name === name);

    setSelected((prev) => {
      const next = new Set(prev);

      if (next.has(name)) {
        next.delete(name);
      } else if (isPackage) {
        PACKAGES.forEach((p) => next.delete(p.name));
        next.add(name);
        const relevant = new Set(RELEVANT_ADDONS[name] ?? []);
        ADDONS.forEach((a) => {
          if (!relevant.has(a.name)) next.delete(a.name);
        });
      } else {
        next.add(name);
      }

      return next;
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setFileNames(files.map((f) => f.name));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const incomplete = vehicles.some((v) => !v.year || !v.make || !v.model.trim());
    if (incomplete) {
      setErrorMsg("Please complete all vehicle fields before submitting.");
      setFormState("error");
      return;
    }

    setFormState("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    const nativeSelected = formData.getAll("service_selection") as string[];
    const effectiveSelected = selected.size > 0 ? [...selected] : nativeSelected;
    const servicesList = effectiveSelected.join(", ") || "Not specified";
    formData.set("services", servicesList);
    formData.delete("service_selection");

    const vehiclesText = vehicles
      .map((v, i) => {
        const prefix = vehicles.length > 1 ? `Vehicle ${i + 1}: ` : "";
        const size = v.largerVehicle ? " (larger vehicle)" : "";
        return `${prefix}${v.year} ${v.make} ${v.model}${size}`;
      })
      .join("\n");
    formData.set("vehicles", vehiclesText);
    if (vehicles.length > 1) {
      formData.set("vehicle_count", String(vehicles.length));
    }
    formData.delete("vehicle_year");
    formData.delete("vehicle_make");
    formData.delete("vehicle_model");

    const basePerVehicle = effectiveSelected.reduce((sum, name) => {
      const svc = ALL_SERVICES.find((s) => s.name === name);
      return sum + (svc?.price ?? 0);
    }, 0);
    const effectiveGrand = vehicles.reduce((sum, v) => {
      const vehicleSurcharge = v.largerVehicle
        ? effectiveSelected.reduce((s, name) => s + (SURCHARGES[name] ?? 0), 0)
        : 0;
      return sum + basePerVehicle + vehicleSurcharge;
    }, 0);
    const estTotal = effectiveGrand > 0 ? `$${effectiveGrand}` : "TBD";
    formData.set("estimated_total", estTotal);

    const files = fileRef.current?.files;
    if (files) {
      Array.from(files).forEach((file) => formData.append("photo", file));
    }
    formData.delete("photos");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setFormState("success");
        clear();
        setSelected(new Set());
        setVehicles([newVehicle()]);
        setFileNames([]);
        formRef.current?.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error ?? "Something went wrong. Call or text (661) 368-5165.");
        setFormState("error");
      }
    } catch {
      setErrorMsg("Could not send. Call or text (661) 368-5165.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-10 text-center">
        <CheckCircle className="mx-auto mb-4 h-10 w-10 text-brand-yellow" />
        <h2 className="text-2xl font-black text-white mb-2">Got it.</h2>
        <p className="text-white/50 text-sm">
          We&apos;ll reach out within a few hours to confirm and get you on the schedule.
        </p>
        <p className="mt-4 text-white/40 text-xs">
          Questions? Call or text (661) 368-5165.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Services */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5">
        <p className="text-xs font-black text-brand-yellow uppercase tracking-[0.15em] mb-4">
          Services
        </p>
        <div className="flex flex-col gap-5">
          <p className="text-xs text-white/50">
            Select a package, then add any relevant extras.
          </p>

          <ServiceGroup
            label="Packages"
            services={PACKAGES}
            selected={selected}
            disabled={disabledPackages}
            onToggle={toggleService}
          />

          <ServiceGroup
            label="Add-ons"
            services={ADDONS}
            selected={selected}
            disabled={disabledAddons}
            onToggle={toggleService}
          />

          {selected.size > 0 && (
            <div className="flex justify-between items-center pt-1 border-t border-white/[0.06]">
              <span className="text-xs text-white/50">
                {selected.size} selected
                {vehicles.length > 1 && ` · ${vehicles.length} vehicles`}
              </span>
              <div className="text-right">
                <span className="text-sm font-black text-white font-numeric">
                  Est. ${grandTotal.toLocaleString()}
                </span>
                <p className="text-xs text-white/40 mt-0.5">Final price confirmed at booking.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact + vehicles */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 flex flex-col gap-5">
        <p className="text-xs font-black text-brand-yellow uppercase tracking-[0.15em]">
          Your Info
        </p>

        <Field label="Name" htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="First and last name"
            className={inputClass}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(661) 000-0000"
            className={inputClass}
          />
        </Field>

        <Field label="Email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={inputClass}
          />
        </Field>

        <Field label="ZIP Code" htmlFor="zip" required>
          <input
            id="zip"
            name="zip_code"
            type="text"
            required
            inputMode="numeric"
            maxLength={5}
            pattern="[0-9]{5}"
            autoComplete="postal-code"
            placeholder="93301"
            className={inputClass}
          />
        </Field>

        {/* Vehicles */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-white/90">
            Vehicle <span className="text-brand-yellow">*</span>
          </p>

          <div className="flex flex-col gap-4">
            {vehicles.map((vehicle, i) => (
              <VehicleEntry
                key={vehicle.id}
                vehicle={vehicle}
                index={i}
                showLabel={vehicles.length > 1}
                showRemove={vehicles.length > 1}
                selectedServices={selected}
                onUpdate={(patch) => updateVehicle(vehicle.id, patch)}
                onRemove={() => removeVehicle(vehicle.id)}
              />
            ))}
          </div>

          {vehicles.length < 5 && (
            <button
              type="button"
              onClick={addVehicle}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/[0.12] text-sm text-white/50 hover:border-brand-yellow/40 hover:text-white/70 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add another vehicle
            </button>
          )}
        </div>

        <Field label="Preferred date" htmlFor="preferred_date">
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className={`${inputClass} [color-scheme:dark]`}
          />
        </Field>

        <Field label="Anything else?" htmlFor="notes">
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Pet hair, hard water spots, specific areas to focus on..."
            className={`${inputClass} resize-none`}
          />
        </Field>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-white/90">
            Condition photos{" "}
            <span className="text-white/50 font-normal">(optional)</span>
          </label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.03] text-sm text-white/60 hover:border-white/20 hover:text-white/80 transition-colors text-left"
          >
            <Paperclip className="h-4 w-4 shrink-0" />
            {fileNames.length > 0 ? fileNames.join(", ") : "Attach photos"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-xs text-white/40">
            Helps us understand condition before arrival.
          </p>
        </div>
      </div>

      {formState === "error" && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-brand-yellow text-black font-black text-base tracking-wide hover:bg-brand-yellow/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? "Sending..." : "Send Request"}
        {formState !== "submitting" && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="text-center text-xs text-white/40">
        Or call / text directly: (661) 368-5165.
      </p>
    </form>
  );
}

function VehicleEntry({
  vehicle,
  index,
  showLabel,
  showRemove,
  selectedServices,
  onUpdate,
  onRemove,
}: {
  vehicle: Vehicle;
  index: number;
  showLabel: boolean;
  showRemove: boolean;
  selectedServices: Set<string>;
  onUpdate: (patch: Partial<Omit<Vehicle, "id">>) => void;
  onRemove: () => void;
}) {
  const surcharge = vehicle.largerVehicle
    ? [...selectedServices].reduce((sum, name) => sum + (SURCHARGES[name] ?? 0), 0)
    : 0;

  return (
    <div className={showLabel ? "rounded-xl border border-white/[0.08] p-4 flex flex-col gap-3" : "flex flex-col gap-3"}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-white/50 uppercase tracking-[0.12em]">
            Vehicle {index + 1}
          </p>
          {showRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-1 text-xs text-white/30 hover:text-red-400 transition-colors"
            >
              <X className="h-3 w-3" />
              Remove
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <SelectWrapper>
          <select
            value={vehicle.year}
            onChange={(e) => onUpdate({ year: e.target.value })}
            className={selectClass}
          >
            <option value="" className="text-black bg-white">Year</option>
            {YEARS.map((y) => (
              <option key={y} value={y} className="text-black bg-white">{y}</option>
            ))}
          </select>
        </SelectWrapper>
        <SelectWrapper>
          <select
            value={vehicle.make}
            onChange={(e) => onUpdate({ make: e.target.value })}
            className={selectClass}
          >
            <option value="" className="text-black bg-white">Make</option>
            {MAKES.map((m) => (
              <option key={m} value={m} className="text-black bg-white">{m}</option>
            ))}
          </select>
        </SelectWrapper>
      </div>

      <input
        type="text"
        value={vehicle.model}
        onChange={(e) => onUpdate({ model: e.target.value })}
        placeholder="Model — e.g. Tacoma, F-150, Civic"
        className={inputClass}
      />

      <LargerVehicleToggle
        checked={vehicle.largerVehicle}
        onChange={(val) => onUpdate({ largerVehicle: val })}
        surcharge={surcharge}
      />
    </div>
  );
}

function LargerVehicleToggle({
  checked,
  onChange,
  surcharge,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  surcharge: number;
}) {
  return (
    <label
      className="group/lv flex items-center gap-3 w-full px-3 py-3 rounded-xl border text-left transition-colors cursor-pointer touch-manipulation has-[:checked]:border-brand-yellow/50 has-[:checked]:bg-brand-yellow/5 border-white/[0.06] hover:border-white/[0.12]"
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center shrink-0 transition-colors group-has-[:checked]/lv:border-brand-yellow group-has-[:checked]/lv:bg-brand-yellow">
        <svg className="w-2.5 h-2.5 text-black hidden group-has-[:checked]/lv:block" viewBox="0 0 10 10" fill="none">
          <path
            d="M1.5 5l2.5 2.5 4.5-4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex-1">
        <span className="text-sm text-white font-medium">Larger vehicle</span>
        <span className="text-xs text-white/50 ml-2">SUV, truck, van, full-size</span>
      </div>
      {checked && surcharge > 0 ? (
        <span className="text-sm font-black text-brand-yellow font-numeric shrink-0">
          +${surcharge}
        </span>
      ) : (
        <span className="text-xs text-white/40 shrink-0">+$20–$40</span>
      )}
    </label>
  );
}

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
    </div>
  );
}

function ServiceGroup({
  label,
  services,
  selected,
  disabled,
  onToggle,
}: {
  label: string;
  services: readonly { name: string; price: number }[];
  selected: Set<string>;
  disabled: Set<string>;
  onToggle: (name: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-black text-white/50 uppercase tracking-[0.12em] mb-2">
        {label}
      </p>
      {services.map((svc) => {
        const isChecked = selected.has(svc.name);
        const isDisabled = disabled.has(svc.name);
        const uid = `svc-${svc.name.replace(/\s+/g, "-").toLowerCase()}`;
        return (
          <label
            key={svc.name}
            htmlFor={uid}
            className={`group/svc flex items-center justify-between w-full px-3 py-2.5 rounded-xl border text-left transition-all touch-manipulation ${
              isDisabled
                ? "border-white/[0.04] opacity-30 cursor-not-allowed pointer-events-none"
                : "cursor-pointer has-[:checked]:border-brand-yellow/50 has-[:checked]:bg-brand-yellow/5 border-white/[0.06] hover:border-white/[0.12]"
            }`}
          >
            <input
              type="checkbox"
              id={uid}
              name="service_selection"
              value={svc.name}
              className="sr-only"
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => !isDisabled && onToggle(svc.name)}
            />
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center shrink-0 transition-colors group-has-[:checked]/svc:border-brand-yellow group-has-[:checked]/svc:bg-brand-yellow">
                <svg className="w-2.5 h-2.5 text-black hidden group-has-[:checked]/svc:block" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1.5 5l2.5 2.5 4.5-4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-white">{svc.name}</span>
            </div>
            <span className="text-sm font-black text-brand-yellow font-numeric shrink-0">
              ${svc.price}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-bold text-white/90">
        {label}
        {required && <span className="text-brand-yellow ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow/60 focus:ring-1 focus:ring-brand-yellow/30 transition-colors";

const selectClass =
  "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 pr-10 text-base text-white focus:outline-none focus:border-brand-yellow/60 focus:ring-1 focus:ring-brand-yellow/30 transition-colors appearance-none";
