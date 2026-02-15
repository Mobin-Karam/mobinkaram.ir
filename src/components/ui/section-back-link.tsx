"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";

type Props = {
  href: string;
  label?: string;
  className?: string;
};

export function SectionBackLink({ href, label = "Back", className }: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "group inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)] transition",
        className,
      )}
    >
      <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:shadow-md">
        <span className="absolute inset-0 translate-x-full bg-[color:var(--accent)]/15 transition-transform duration-200 group-hover:translate-x-0" />
        <ArrowLeft size={14} className="relative" />
      </span>
      <span className="relative">
        {label}
        <span className="absolute bottom-0 left-0 h-px w-full scale-x-0 bg-[color:var(--accent-strong)] transition-transform duration-200 group-hover:scale-x-100" />
      </span>
    </Link>
  );
}
