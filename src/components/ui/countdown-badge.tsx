"use client";

import { useEffect, useState } from "react";

export function CountdownBadge({
  seconds,
  onComplete,
}: {
  seconds: number;
  onComplete?: () => void;
}) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete?.();
      return;
    }
    const id = window.setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [remaining, onComplete]);

  const mins = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");

  return <span className="pill text-[11px]">{mins}:{secs}</span>;
}
