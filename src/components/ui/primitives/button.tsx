"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "subtle";
type Size = "sm" | "md";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  asChild?: boolean; // reserved for future polymorphic use
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition shadow-sm hover:-translate-y-0.5 hover:shadow-md";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-strong)]",
  ghost:
    "border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground)] hover:border-[color:var(--accent)]",
  subtle:
    "bg-[color:var(--background)] text-[color:var(--foreground)] hover:border hover:border-[color:var(--border)]",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

export function Button({
  variant = "ghost",
  size = "md",
  icon,
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
