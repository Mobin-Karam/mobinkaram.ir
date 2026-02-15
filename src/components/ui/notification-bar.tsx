"use client";

import { useEffect, useState } from "react";
import { BellDot, XCircle } from "lucide-react";
import { useUserPrefs } from "@/hooks/use-user-prefs";
import clsx from "clsx";
import { CountdownBadge } from "@/components/ui/countdown-badge";

export function NotificationBar({
  message,
  cta,
  image,
  countdownSeconds,
}: {
  message: string;
  cta?: React.ReactNode;
  image?: string;
  countdownSeconds?: number;
}) {
  const { prefs, setPrefs, ready } = useUserPrefs();
  const [open, setOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(countdownSeconds);

  useEffect(() => {
    if (!ready) return;
    const allowed = prefs.cookieConsent === "accepted";
    setOpen(allowed && !prefs.noticeDismissed);
  }, [prefs.noticeDismissed, prefs.cookieConsent, ready]);

  useEffect(() => {
    if (!open || !countdownSeconds) return;
    setSecondsLeft(countdownSeconds);
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s === undefined) return s;
        if (s <= 1) {
          dismiss();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, countdownSeconds]);

  const dismiss = () => {
    setOpen(false);
    setPrefs({ noticeDismissed: true });
  };

  if (!open) return null;

  return (
    <div className="mb-4 flex animate-[fadeIn_280ms_ease] flex-wrap items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 shadow-[var(--glow)] transition-all duration-300 ease-out will-change-transform">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt="Notice"
          className="h-12 w-12 rounded-xl border border-[color:var(--border)] object-cover"
          loading="lazy"
        />
      ) : null}
      <div className="relative flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]">
        <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center">
          <span className="absolute inline-flex h-3.5 w-3.5 animate-ping rounded-full bg-amber-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500 shadow" />
        </span>
        <BellDot size={16} className="text-amber-600" />
        <span>{message}</span>
      </div>
      {cta ? <div className="flex items-center gap-2 text-sm">{cta}</div> : null}
      {countdownSeconds && secondsLeft !== undefined ? (
        <CountdownBadge
          seconds={secondsLeft}
          onComplete={() => dismiss()}
        />
      ) : null}
      <button
        onClick={dismiss}
        className="pill nav-btn border-red-200 text-red-600 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:shadow-md transition"
        aria-label="Dismiss notification"
      >
        <XCircle size={16} />
        Dismiss
      </button>
    </div>
  );
}
