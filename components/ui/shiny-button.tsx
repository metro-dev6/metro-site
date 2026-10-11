"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...(props as object)}
      className={cn(
        "group relative overflow-hidden rounded-full px-6 py-2 font-medium transition-[transform,box-shadow] duration-150 ease-out hover:shadow-xl hover:-translate-y-1.5 active:scale-[0.96] active:duration-75",
        className
      )}
    >
      {/* Shiny sweep: one-shot on hover, gated for reduced motion (see .shine-sweep in globals.css) */}
      <span
        aria-hidden="true"
        className="shine-sweep pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <span className="relative flex items-center justify-center size-full uppercase tracking-wide">
        {children}
      </span>
    </button>
  );
};

export default { ShinyButton };
