"use client";

import clsx from "clsx";
import type { HTMLAttributes } from "react";

type Variant = "default" | "success" | "warning" | "info";

const variantClass: Record<Variant, string> = {
  default: "border-[color:var(--border)] text-[color:var(--muted)]",
  success: "border-emerald-200 text-emerald-700",
  warning: "border-amber-200 text-amber-700",
  info: "border-blue-200 text-blue-700",
};

export function Pill({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={clsx(
        "pill inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold",
        variantClass[variant],
        className,
      )}
      {...props}
    />
  );
}
