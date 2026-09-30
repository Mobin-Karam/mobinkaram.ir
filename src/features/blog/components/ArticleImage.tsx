"use client";

import { Expand, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ArticleImage({ src, alt }: { src?: string; alt: string }) {
  const [canExpand, setCanExpand] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const update = () => setCanExpand(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const image = (
    // Content is intentionally hosted in the trusted GitHub content repository.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="h-auto w-full rounded-xl border border-border bg-muted object-cover sm:max-w-xl"
    />
  );

  if (!canExpand) {
    return <figure className="my-8">{image}</figure>;
  }

  return (
    <Dialog>
      <figure className="group relative my-9 flex justify-center">
        <DialogTrigger asChild>
          <button
            type="button"
            className="relative block cursor-zoom-in text-start outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Open image: ${alt}`}
          >
            {image}
            <span className="absolute bottom-3 end-3 inline-flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
              <Expand className="size-4" aria-hidden="true" />
            </span>
          </button>
        </DialogTrigger>
      </figure>
      <DialogContent className="max-h-[94dvh] max-w-[min(96vw,1100px)] overflow-auto bg-background p-2 sm:max-w-[min(96vw,1100px)]" showCloseButton={false}>
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogClose asChild>
          <button type="button" className="absolute end-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-background/90 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Close image">
            <X className="size-4" aria-hidden="true" />
          </button>
        </DialogClose>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-auto w-full rounded-lg" />
      </DialogContent>
    </Dialog>
  );
}
