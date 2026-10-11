"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Paperclip, ChevronDown, Plus, X } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type VehicleClass = "sedan" | "suv5" | "suv7";

const VEHICLE_CLASSES: { value: VehicleClass; label: string; hint: string }[] = [
  { value: "sedan", label: "Sedan/Coupe", hint: "Standard passenger car" },
  { value: "suv5", label: "5-Seat SUV/Truck", hint: "Mid-size SUV, half-ton truck" },
  { value: "suv7", label: "7-Seat SUV/Van", hint: "3-row SUV, minivan" },
];

const PACKAGES = [
  { name: "Exterior Refresh", prices: { sedan: 80, suv5: 100, suv7: 120 } },
  { name: "Signature Wash", prices: { sedan: 150, suv5: 180, suv7: 210 } },
  { name: "Clay n Seal", prices: { sedan: 200, suv5: 230, suv7: 260 } },
  { name: "Interior Detail", prices: { sedan: 200, suv5: 230, suv7: 260 } },
  { name: "Full Detail", prices: { sedan: 350, suv5: 380, suv7: 410 } },
] as const;

const ADDONS = [
  { name: "Headlight Restoration", prices: { sedan: 100, suv5: 100, suv7: 100 } },
  { name: "Trim Restoration", prices: { sedan: 100, suv5: 100, suv7: 100 } },
  { name: "Water Spot Removal", prices: { sedan: 50, suv5: 50, suv7: 50 } },
  { name: "Pet Hair & Sand Removal", prices: { sedan: 50, suv5: 50, suv7: 50 } },
  { name: "Engine Bay", prices: { sedan: 50, suv5: 50, suv7: 50 } },
  { name: "Leather Conditioning", prices: { sedan: 50, suv5: 50, suv7: 50 } },
] as const;

const ALL_SERVICES = [...PACKAGES, ...ADDONS];

function priceFor(name: string, vehicleClass: VehicleClass): number {
  return ALL_SERVICES.find((s) => s.name === name)?.prices[vehicleClass] ?? 0;
}

const RELEVANT_ADDONS: Record<string, string[]> = {
  "Exterior Refresh": ["Headlight Restoration", "Trim Restoration", "Water Spot Removal", "Engine Bay"],
  "Signature Wash": ["Headlight Restoration", "Trim Restoration", "Water Spot Removal", "Engine Bay"],
  "Clay n Seal": ["Headlight Restoration", "Trim Restoration", "Water Spot Removal", "Engine Bay"],
  "Interior Detail": ["Pet Hair & Sand Removal", "Leather Conditioning"],
  "Full Detail": ["Headlight Restoration", "Trim Restoration", "Pet Hair & Sand Removal", "Engine Bay", "Leather Conditioning"],
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
  vehicleClass: VehicleClass;
};

function newVehicle(): Vehicle {
  return {
    id: Math.random().toString(36).slice(2),
    year: "",
    make: "",
    model: "",
    vehicleClass: "sedan",
  };
}

// Reveal motion for the sections that unlock when a vehicle size is picked.
// Critically damped spring (no overshoot) per apple-design; children stagger so
// packages and add-ons arrive separately. Reduced motion falls back to a cross-fade.
const revealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 35 } },
};

const revealItemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
};

export function EstimateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<Set<string>>(() => {
    const param = searchParams.get("services");
    if (!param) return new Set();
    return new Set(param.split(",").map((s) => s.trim()).filter(Boolean));
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const sizeParam = searchParams.get("size");
    const validSizes: VehicleClass[] = ["sedan", "suv5", "suv7"];
    const v = newVehicle();
    if (sizeParam && validSizes.includes(sizeParam as VehicleClass)) {
      v.vehicleClass = sizeParam as VehicleClass;
    }
    return [v];
  });
  const [sizeChosen, setSizeChosen] = useState<boolean>(() => {
    const sizeParam = searchParams.get("size");
    const validSizes: VehicleClass[] = ["sedan", "suv5", "suv7"];
    return (!!sizeParam && validSizes.includes(sizeParam as VehicleClass)) || !!searchParams.get("services");
  });
  // Only animate the reveal when the user picks a size here, not when arriving pre-selected.
  const wasPreSelected = useRef(sizeChosen).current;
  const reduce = useReducedMotion();
  const revealInitial = wasPreSelected ? false : "hidden";
  const itemVariants = reduce ? revealItemReduced : revealItem;
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

  const grandTotal = vehicles.reduce((sum, v) => {
    const vehicleTotal = [...selected].reduce((s, name) => s + priceFor(name, v.vehicleClass), 0);
    return sum + vehicleTotal;
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
        const classLabel = VEHICLE_CLASSES.find((c) => c.value === v.vehicleClass)?.label ?? "";
        return `${prefix}${v.year} ${v.make} ${v.model} (${classLabel})`;
      })
      .join("\n");
    formData.set("vehicles", vehiclesText);
    if (vehicles.length > 1) {
      formData.set("vehicle_count", String(vehicles.length));
    }
    formData.delete("vehicle_year");
    formData.delete("vehicle_make");
    formData.delete("vehicle_model");

    const effectiveGrand = vehicles.reduce((sum, v) => {
      const vehicleTotal = effectiveSelected.reduce((s, name) => s + priceFor(name, v.vehicleClass), 0);
      return sum + vehicleTotal;
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
        setSelected(new Set());
        setVehicles([newVehicle()]);
        setFileNames([]);
        formRef.current?.reset();
        router.push("/thank-you");
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

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Services */}
      <div className="rounded-2xl bg-[#faf9f7] border border-black/15 shadow-[0_12px_30px_rgba(0,0,0,0.10)] p-5">
        <div className="mb-4">
          <div className="h-[3px] w-10 bg-brand-yellow mb-3" />
          <p className="font-accent text-sm font-medium uppercase tracking-[0.1em] text-brand-black">
            Services
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-black text-black/55 uppercase tracking-[0.12em] mb-2">
              Vehicle Size
            </p>
            <VehicleClassSelector
              value={sizeChosen ? vehicles[0].vehicleClass : null}
              onChange={(val) => {
                updateVehicle(vehicles[0].id, { vehicleClass: val });
                setSizeChosen(true);
              }}
            />
            {!sizeChosen && (
              <p className="text-xs text-black/45 mt-2">Pick your vehicle size to see packages and pricing.</p>
            )}
          </div>

          {sizeChosen && (
            <motion.div
              variants={revealContainer}
              initial={revealInitial}
              animate="show"
              className="flex flex-col gap-5"
            >
              <motion.p variants={itemVariants} className="text-xs text-black/55">
                Select a package, then add any relevant extras.
              </motion.p>

              <motion.div variants={itemVariants}>
                <ServiceGroup
                  label="Packages"
                  services={PACKAGES}
                  selected={selected}
                  disabled={disabledPackages}
                  onToggle={toggleService}
                  vehicleClass={vehicles[0].vehicleClass}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <ServiceGroup
                  label="Add-ons"
                  services={ADDONS}
                  selected={selected}
                  disabled={disabledAddons}
                  onToggle={toggleService}
                  vehicleClass={vehicles[0].vehicleClass}
                />
              </motion.div>

              {selected.size > 0 && (
                <div className="flex justify-between items-center pt-1 border-t border-black/10">
                  <span className="text-xs text-black/55">
                    {selected.size} selected
                    {vehicles.length > 1 && ` · ${vehicles.length} vehicles`}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-black text-brand-black font-numeric">
                      Est. ${grandTotal.toLocaleString()}
                    </span>
                    <p className="text-xs text-black/45 mt-0.5">Final price confirmed at booking.</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {sizeChosen && (
        <motion.div
          variants={itemVariants}
          initial={revealInitial}
          animate="show"
          className="flex flex-col gap-6"
        >
      {/* Contact + vehicles */}
      <div className="rounded-2xl bg-[#faf9f7] border border-black/15 shadow-[0_12px_30px_rgba(0,0,0,0.10)] p-5 flex flex-col gap-5">
        <div>
          <div className="h-[3px] w-10 bg-brand-yellow mb-3" />
          <p className="font-accent text-sm font-medium uppercase tracking-[0.1em] text-brand-black">
            Your Info
          </p>
        </div>

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
          <p className="text-sm font-bold text-brand-black">
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
                showClassSelector={i > 0}
                onUpdate={(patch) => updateVehicle(vehicle.id, patch)}
                onRemove={() => removeVehicle(vehicle.id)}
              />
            ))}
          </div>

          {vehicles.length < 5 && (
            <button
              type="button"
              onClick={addVehicle}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-black/20 text-sm text-black/55 hover:border-brand-yellow/40 hover:text-brand-black/70 transition-colors"
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
            className={`${inputClass} [color-scheme:light]`}
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
          <label className="text-sm font-bold text-brand-black">
            Condition photos{" "}
            <span className="text-black/55 font-normal">(optional)</span>
          </label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-black/20 bg-black/[0.02] text-sm text-black/60 hover:border-black/25 hover:text-brand-black/80 transition-colors text-left"
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
          <p className="text-xs text-black/45">
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

      <p className="text-center text-xs text-black/45">
        Or call / text directly: (661) 368-5165.
      </p>
        </motion.div>
      )}
    </form>
  );
}

function VehicleEntry({
  vehicle,
  index,
  showLabel,
  showRemove,
  showClassSelector,
  onUpdate,
  onRemove,
}: {
  vehicle: Vehicle;
  index: number;
  showLabel: boolean;
  showRemove: boolean;
  showClassSelector: boolean;
  onUpdate: (patch: Partial<Omit<Vehicle, "id">>) => void;
  onRemove: () => void;
}) {
  return (
    <div className={showLabel ? "rounded-xl border border-black/10 p-4 flex flex-col gap-3" : "flex flex-col gap-3"}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-black/55 uppercase tracking-[0.12em]">
            Vehicle {index + 1}
          </p>
          {showRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="flex items-center gap-1 text-xs text-black/40 hover:text-red-400 transition-colors"
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

      {showClassSelector && (
        <VehicleClassSelector
          value={vehicle.vehicleClass}
          onChange={(val) => onUpdate({ vehicleClass: val })}
        />
      )}
    </div>
  );
}

function VehicleClassSelector({
  value,
  onChange,
}: {
  value: VehicleClass | null;
  onChange: (val: VehicleClass) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Vehicle size">
      {VEHICLE_CLASSES.map((cls) => {
        const isChecked = value === cls.value;
        return (
          <label
            key={cls.value}
            className={`flex flex-col gap-1 rounded-xl border p-3 text-center cursor-pointer touch-manipulation transition duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:active:scale-[0.97] ${
              isChecked
                ? "border-brand-yellow bg-brand-yellow/5"
                : "border-black/10 hover:border-black/25"
            }`}
          >
            <input
              type="radio"
              name="vehicle_class"
              className="sr-only"
              checked={isChecked}
              onChange={() => onChange(cls.value)}
            />
            <span className="text-xs sm:text-sm font-bold text-brand-black leading-tight">
              {cls.label.split("/").map((part, i) => (
                <span key={i}>
                  {i > 0 && <>/<wbr /></>}
                  {part}
                </span>
              ))}
            </span>
            <span className="text-xs text-black/55 leading-snug">{cls.hint}</span>
          </label>
        );
      })}
    </div>
  );
}

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/55" />
    </div>
  );
}

function ServiceGroup({
  label,
  services,
  selected,
  disabled,
  onToggle,
  vehicleClass,
}: {
  label: string;
  services: readonly { name: string; prices: { sedan: number; suv5: number; suv7: number } }[];
  selected: Set<string>;
  disabled: Set<string>;
  onToggle: (name: string) => void;
  vehicleClass: VehicleClass;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-black text-black/55 uppercase tracking-[0.12em] mb-2">
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
            className={`group/svc flex items-center justify-between w-full px-3 py-3 rounded-xl border text-left transition-colors touch-manipulation ${
              isDisabled
                ? "border-black/[0.06] opacity-30 cursor-not-allowed pointer-events-none"
                : "cursor-pointer has-[:checked]:border-brand-yellow/50 has-[:checked]:bg-brand-yellow/5 border-black/10 hover:border-black/20"
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
              <div className="w-4 h-4 rounded border border-black/25 flex items-center justify-center shrink-0 transition-colors group-has-[:checked]/svc:border-brand-yellow group-has-[:checked]/svc:bg-brand-yellow">
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
              <span className="text-sm text-brand-black">{svc.name}</span>
            </div>
            <span className="text-sm font-black text-brand-yellow font-numeric shrink-0">
              ${svc.prices[vehicleClass]}
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
      <label htmlFor={htmlFor} className="text-sm font-bold text-brand-black">
        {label}
        {required && <span className="text-brand-yellow ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-white border border-black/15 rounded-xl px-4 py-3 text-base text-brand-black placeholder:text-black/40 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/40 transition-colors";

const selectClass =
  "w-full bg-white border border-black/15 rounded-xl px-4 py-3 pr-10 text-base text-brand-black focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/40 transition-colors appearance-none";
