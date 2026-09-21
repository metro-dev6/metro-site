"use client";

import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";
const COUPON_CODE = "WELCOME10";

type FormState = "idle" | "submitting" | "success" | "error";

export function AnnouncementBar() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || formState === "submitting") return;
    setFormState("submitting");

    const formData = new FormData();
    formData.set("email", email);
    formData.set("source", "announcement-bar-coupon");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="w-full h-11 flex items-center justify-center bg-brand-white border-b border-black/10 px-4">
        <p className="text-xs sm:text-sm font-bold text-brand-black text-center">
          Your code:{" "}
          <span className="text-brand-black bg-brand-yellow px-2 py-0.5 rounded">
            {COUPON_CODE}
          </span>
          . Mention it when you book.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-11 flex items-center justify-center gap-2 bg-brand-white border-b border-black/10 px-3 sm:px-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
        <p className="hidden sm:block text-sm font-bold text-brand-black whitespace-nowrap">
          New clients: 10% off your first detail
        </p>
        <p className="sm:hidden text-xs font-bold text-brand-black whitespace-nowrap">
          10% off first detail
        </p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={formState === "submitting"}
          className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full border border-black/20 text-brand-black bg-brand-white focus:outline-none focus:border-brand-black w-24 sm:w-56"
        />
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="text-xs sm:text-sm font-bold text-brand-white bg-brand-black px-3 sm:px-4 py-1 rounded-full hover:bg-black/80 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {formState === "submitting" ? "..." : "Get Code"}
        </button>
      </form>
      {formState === "error" && (
        <span className="text-xs text-red-600 whitespace-nowrap">Try again</span>
      )}
    </div>
  );
}
