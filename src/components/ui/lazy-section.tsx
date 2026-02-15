"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  minHeight?: number;
  shimmer?: boolean;
  skeleton?: React.ReactNode;
};

export function LazySection({ children, minHeight = 240, shimmer = true, skeleton }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "160px 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={!visible ? { minHeight } : undefined}
      className="w-full"
    >
      {visible ? (
        children
      ) : skeleton ? (
        skeleton
      ) : shimmer ? (
        <div className="animate-pulse rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-sm text-[color:var(--muted)]">
          Loading section…
        </div>
      ) : null}
    </div>
  );
}
