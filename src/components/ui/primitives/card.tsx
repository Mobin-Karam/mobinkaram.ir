"use client";

import clsx from "clsx";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "card rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--glow)]",
        className,
      )}
      {...props}
    />
  );
}
