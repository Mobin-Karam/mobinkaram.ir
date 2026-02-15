"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const current = theme === "system" ? resolvedTheme : theme;
  const nextTheme = current === "dark" ? "light" : "dark";

  if (!mounted) {
    return (
      <div className="pill flex items-center gap-2">
        <Sun size={14} />
        <span>…</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="pill flex items-center gap-2 hover:shadow-md"
      aria-label="Toggle theme"
    >
      {current === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      <span className="text-xs font-semibold uppercase tracking-wide">
        {nextTheme}
      </span>
    </button>
  );
}
