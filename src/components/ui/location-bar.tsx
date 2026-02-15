"use client";

import { usePathname } from "next/navigation";

export function LocationBar() {
  const pathname = usePathname();
  const clean = pathname?.replace(/\/$/, "") || "/";
  return (
    <div className="mb-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-xs text-[color:var(--muted)]">
      <span className="font-semibold text-[color:var(--foreground)]">You are here:</span> {clean || "/"}
    </div>
  );
}
