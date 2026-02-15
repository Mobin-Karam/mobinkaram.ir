"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import clsx from "clsx";

export type Slide = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
};

type Props = {
  slides: Slide[];
  height?: { base: number; md: number };
  autoPlayMs?: number;
};

export function AnnouncementBanner({
  slides,
  height = { base: 220, md: 260 },
  autoPlayMs = 4200,
}: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [playing, slides.length, autoPlayMs]);

  if (!slides.length) return null;

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="mb-5 w-full overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--glow)]">
      <div className="relative">
        <div
          className="relative w-full"
          style={{
            height: `${height.base}px`,
          }}
        >
          {slides.map((slide, i) => (
            <a
              key={slide.id}
              href={slide.href || "#"}
              className={clsx(
                "absolute inset-0 block transition-all duration-500 ease-out",
                i === index
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 pointer-events-none",
              )}
              style={{ minHeight: `${height.base}px` }}
              target={slide.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.imageSrc}
                alt={slide.imageAlt}
                className="h-full w-full rounded-2xl border border-[color:var(--border)] object-cover"
                loading="lazy"
              />
            </a>
          ))}
        </div>
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 hidden rounded-full bg-[color:var(--surface)]/80 p-2 text-[color:var(--muted)] shadow-md transition hover:text-[color:var(--foreground)] md:block"
          onClick={prev}
          aria-label="Previous announcement"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 hidden rounded-full bg-[color:var(--surface)]/80 p-2 text-[color:var(--muted)] shadow-md transition hover:text-[color:var(--foreground)] md:block"
          onClick={next}
          aria-label="Next announcement"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="flex items-center justify-between px-4 py-2 text-[11px] text-[color:var(--muted)]">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={clsx(
                "h-2 w-6 rounded-full transition",
                i === index
                  ? "bg-[color:var(--accent-strong)]"
                  : "bg-[color:var(--border)]",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition"
            aria-label={playing ? "Pause rotation" : "Play rotation"}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
