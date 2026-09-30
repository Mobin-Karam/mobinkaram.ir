"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  images: string[];
  alt: string;
  children: React.ReactNode;
  initialIndex?: number;
};

export function ImageLightbox({
  images = [],
  alt,
  children,
  initialIndex = 0,
}: Props) {
  const safeImages = React.useMemo(
    () => (images?.length ? images : ["/placeholder.png"]),
    [images],
  );

  const [index, setIndex] = React.useState(initialIndex);
  const [open, setOpen] = React.useState(false);

  const current = safeImages[index];

  const next = React.useCallback(() => {
    setIndex((i) => (i + 1 < safeImages.length ? i + 1 : 0));
  }, [safeImages.length]);

  const prev = React.useCallback(() => {
    setIndex((i) => (i - 1 >= 0 ? i - 1 : safeImages.length - 1));
  }, [safeImages.length]);

  /* Reset index every time dialog opens */
  React.useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  /* Keyboard navigation only when open */
  React.useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-6xl p-0 overflow-hidden bg-black/95 border-none rounded-2xl">
        {/* IMAGE VIEW */}
        <div className="relative w-full h-[80vh] flex items-center justify-center group">
          <Image
            src={current}
            alt={alt}
            fill
            className="object-contain transition-opacity duration-300"
            priority
          />

          {/* LEFT BUTTON */}
          {safeImages.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-3 md:left-5 text-white text-4xl opacity-40 hover:opacity-100 transition
                         bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur"
            >
              ‹
            </button>
          )}

          {/* RIGHT BUTTON */}
          {safeImages.length > 1 && (
            <button
              onClick={next}
              className="absolute right-3 md:right-5 text-white text-4xl opacity-40 hover:opacity-100 transition
                         bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur"
            >
              ›
            </button>
          )}
        </div>

        {/* THUMBNAILS */}
        {safeImages.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto bg-black/80 border-t border-white/10">
            {safeImages.map((img, i) => (
              <button
                key={img}
                onClick={() => setIndex(i)}
                className={`relative w-16 h-16 shrink-0 rounded-md overflow-hidden border transition
                ${
                  i === index
                    ? "border-white scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${alt}-${i}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
