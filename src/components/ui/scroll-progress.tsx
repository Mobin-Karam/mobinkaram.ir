"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const pct = height ? Math.min((scrolled / height) * 100, 100) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none absolute left-0 top-0 h-0.5 w-full overflow-hidden rounded-full bg-transparent">
      <div
        className="h-full bg-[color:var(--accent-strong)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
