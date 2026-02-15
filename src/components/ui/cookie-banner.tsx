"use client";

import { ShieldCheck, XCircle } from "lucide-react";
import { useUserPrefs } from "@/hooks/use-user-prefs";
import clsx from "clsx";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const { prefs, setPrefs, ready } = useUserPrefs();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    setOpen(prefs.cookieConsent === "unset");
  }, [prefs.cookieConsent, ready]);

  const handleChoice = (choice: "accepted" | "declined") => {
    setPrefs({ cookieConsent: choice });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed left-1/2 bottom-[calc(110px+env(safe-area-inset-bottom))] z-40 w-[min(96vw,1100px)] -translate-x-1/2 animate-[fadeIn_220ms_ease] rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/95 p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-white/10 md:px-6"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-[color:var(--accent)]/15 text-[color:var(--accent-strong)]">
            <span className="absolute inset-0 animate-ping rounded-2xl bg-[color:var(--accent)]/20" />
            <ShieldCheck size={18} className="relative" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[color:var(--foreground)]">
              Cookies for preferences & notifications
            </p>
            <p className="text-xs text-[color:var(--muted)]">
              I store your theme, language, and notification choices locally. No ads, just UX.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleChoice("declined")}
            className="pill nav-btn border-red-200 text-red-600 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:shadow-md transition"
          >
            <XCircle size={16} />
            Decline
          </button>
          <button
            onClick={() => handleChoice("accepted")}
            className={clsx(
              "pill nav-btn bg-[color:var(--accent)] text-white hover:-translate-y-0.5 hover:shadow-md transition",
            )}
          >
            Allow cookies
          </button>
        </div>
      </div>
    </div>
  );
}
