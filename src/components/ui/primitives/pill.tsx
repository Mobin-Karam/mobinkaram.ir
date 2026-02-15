"use client";

import clsx from "clsx";
import type { HTMLAttributes } from "react";

type Variant = "default" | "success" | "warning" | "info";

export function Pill({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border px-3 py-[6px] text-[11px] font-semibold uppercase tracking-wide",
        variant === "default" && "border-[color:var(--border)] text-[color:var(--muted)] bg-[color:var(--background)]",
        variant === "success" && "border-emerald-300 text-emerald-700 bg-emerald-50",
        variant === "warning" && "border-amber-300 text-amber-700 bg-amber-50",
        variant === "info" && "border-blue-300 text-blue-700 bg-blue-50",
        className,
      )}
      {...props}
    />
  );
}
