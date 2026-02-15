"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useUserPrefs } from "@/hooks/use-user-prefs";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { prefs, setPrefs, ready } = useUserPrefs();
  const options: Array<{ value: "system" | "light" | "dark"; label: string }> = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Sync from saved prefs into next-themes once on load.
  useEffect(() => {
    if (!ready) return;
    if (prefs.theme && prefs.theme !== theme) {
      setTheme(prefs.theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]); // run once when prefs ready

  const current = theme === "system" ? resolvedTheme : theme;

  if (!mounted) {
    return (
      <div className="pill flex items-center gap-2">
        <Sun size={14} />
        <span>…</span>
      </div>
    );
  }

  return (
    <div className="pill flex items-center gap-2 hover:shadow-md">
      {current === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      <select
        className="bg-transparent text-xs font-semibold uppercase tracking-wide outline-none"
        value={prefs.theme}
        onChange={(e) => {
          const val = e.target.value as typeof prefs.theme;
          setPrefs({ theme: val });
          setTheme(val);
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
