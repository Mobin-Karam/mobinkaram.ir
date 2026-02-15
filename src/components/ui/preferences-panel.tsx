"use client";

import { useUserPrefs } from "@/hooks/use-user-prefs";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

export function PreferencesPanel() {
  const { prefs, setPrefs, ready } = useUserPrefs();
  const { setTheme } = useTheme();

  if (!ready) return <Skeleton className="h-32" />;

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[color:var(--foreground)]">
          Preferences (stored in cookies)
        </p>
        <span className="text-[11px] text-[color:var(--muted)]">Private to your browser</span>
      </div>
      <div className="space-y-3 text-sm text-[color:var(--foreground)]">
        <label className="flex items-center justify-between gap-3">
          <span>Theme</span>
          <select
            className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-2 py-1 text-sm"
            value={prefs.theme}
            onChange={(e) => {
              const val = e.target.value as typeof prefs.theme;
              setPrefs({ theme: val });
              setTheme(val);
            }}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <label className="flex items-center justify-between gap-3">
          <span>Preferred language</span>
          <select
            className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-2 py-1 text-sm"
            value={prefs.locale}
            onChange={(e) => setPrefs({ locale: e.target.value as typeof prefs.locale })}
          >
            <option value="en">English</option>
            <option value="fa">Persian</option>
          </select>
        </label>
        <label className="flex items-center justify-between gap-3">
          <span>Banner autoplay</span>
          <input
            type="checkbox"
            className="h-4 w-4 accent-[color:var(--accent-strong)]"
            checked={prefs.bannerAutoplay}
            onChange={(e) => setPrefs({ bannerAutoplay: e.target.checked })}
          />
        </label>
        <label className="flex items-center justify-between gap-3">
          <span>Show notice</span>
          <input
            type="checkbox"
            className="h-4 w-4 accent-[color:var(--accent-strong)]"
            checked={!prefs.noticeDismissed}
            onChange={(e) => setPrefs({ noticeDismissed: !e.target.checked })}
          />
        </label>
      </div>
    </div>
  );
}
