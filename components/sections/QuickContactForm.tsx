"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

interface QuickContactFormProps {
  service: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export function QuickContactForm({ service }: QuickContactFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setFormState("success");
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
      <div className="rounded-2xl bg-white/[0.04] border border-brand-yellow/30 p-7 flex flex-col gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center">
          <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-white font-bold text-base">Got it. We&apos;ll call you back.</p>
        <p className="text-white/55 text-sm leading-relaxed">
          Or reach us directly at (661) 368-5165.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6 flex flex-col gap-4">
      <input type="hidden" name="service" value={service} />

      <p className="text-xs font-black text-brand-yellow uppercase tracking-[0.15em]">
        Quick Contact
      </p>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="qc-name" className="text-sm font-bold text-white/90">
          Name <span className="text-brand-yellow">*</span>
        </label>
        <input
          id="qc-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="First and last name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="qc-phone" className="text-sm font-bold text-white/90">
          Phone <span className="text-brand-yellow">*</span>
        </label>
        <input
          id="qc-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(661) 000-0000"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="qc-notes" className="text-sm font-bold text-white/90">
          Anything to know? <span className="text-white/40 font-normal">(optional)</span>
        </label>
        <textarea
          id="qc-notes"
          name="notes"
          rows={3}
          placeholder="Vehicle, condition, preferred day..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {formState === "error" && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-brand-yellow text-black font-black text-sm tracking-wide hover:bg-brand-yellow/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? "Sending..." : "Get a Callback"}
        {formState !== "submitting" && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="text-center text-xs text-white/40">
        Or call directly: (661) 368-5165
      </p>
    </form>
  );
}

const inputClass =
  "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow/60 focus:ring-1 focus:ring-brand-yellow/30 transition-colors";
