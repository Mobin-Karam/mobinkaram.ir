"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import clsx from "clsx";

export type Slide = {
  id: string;
  content: React.ReactNode;
};

export function AnnouncementBanner({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [playing, slides.length]);

  if (!slides.length) return null;

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--glow)]">
      <div className="relative flex items-center">
        <button
          className="hidden p-3 text-[color:var(--muted)] transition hover:text-[color:var(--foreground)] md:block"
          onClick={prev}
          aria-label="Previous announcement"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1 px-4 py-3">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={clsx(
                "transition-opacity duration-500",
                i === index ? "opacity-100" : "opacity-0 hidden",
              )}
            >
              {slide.content}
            </div>
          ))}
        </div>
        <button
          className="hidden p-3 text-[color:var(--muted)] transition hover:text-[color:var(--foreground)] md:block"
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
                "h-2 w-2 rounded-full transition",
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
