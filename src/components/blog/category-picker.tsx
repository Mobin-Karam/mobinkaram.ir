"use client";

import { useRouter } from "next/navigation";

type Props = {
  locale: string;
  engineeringCount: number;
  islamCount: number;
};

export function CategoryPicker({ locale, engineeringCount, islamCount }: Props) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--glow)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase text-[color:var(--muted)]">Categories</p>
          <p className="text-sm font-semibold text-[color:var(--foreground)]">Choose a track</p>
        </div>
        <select
          className="rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm text-[color:var(--foreground)]"
          onChange={(e) => {
            const value = e.target.value;
            if (value) router.push(`/${locale}/blog/${value}`);
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="engineering">Engineering ({engineeringCount})</option>
          <option value="islam">Islam ({islamCount})</option>
        </select>
      </div>
    </div>
  );
}
