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
        "relative overflow-hidden rounded-lg px-6 py-2 font-medium transition-[transform,box-shadow] duration-300 ease-in-out hover:shadow hover:-translate-y-1 active:scale-[0.97]",
        className
      )}
    >
      {/* Shiny sweep — pure CSS transform, compositor-only, zero JS */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        style={{ animation: "shiny-sweep 2.5s ease-in-out 0.5s infinite" }}
      />
      <span className="relative flex items-center justify-center size-full text-sm uppercase tracking-wide">
        {children}
      </span>
    </button>
  );
};

export default { ShinyButton };
