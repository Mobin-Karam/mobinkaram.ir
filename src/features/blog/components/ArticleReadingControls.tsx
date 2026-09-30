"use client";

import { Check, Copy, Menu, Printer, Share2, Type, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ArticleReadingControls({ locale }: { locale: "fa" | "en" }) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame: number | undefined;
    const update = () => {
      frame = undefined;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    const onScroll = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.readingSize = largeText ? "large" : "default";
    return () => { delete document.documentElement.dataset.readingSize; };
  }, [largeText]);

  async function copy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url: window.location.href }); return; } catch { return; }
    }
    await copy();
  }

  const buttonClass = "flex min-h-11 w-full items-center gap-2 border border-border bg-background px-3 text-start text-xs font-semibold shadow-sm transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return <>
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary" style={{ transform: `scaleX(${progress / 100})` }} />
    <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-4 z-50 font-mono md:bottom-6 md:left-6">
      {open ? (
        <div className="absolute bottom-14 left-0 w-40 overflow-hidden rounded-xl border border-primary/40 bg-background/95 p-1.5 shadow-[0_18px_45px_-18px_rgba(0,0,0,0.5)] backdrop-blur">
          <button type="button" onClick={() => void share()} className={buttonClass}><Share2 className="size-3.5" />{locale === "fa" ? "اشتراک‌گذاری" : "Share"}</button>
          <button type="button" onClick={() => void copy()} className={buttonClass}>{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}{copied ? (locale === "fa" ? "کپی شد" : "Copied") : (locale === "fa" ? "کپی لینک" : "Copy link")}</button>
          <button type="button" onClick={() => setLargeText((value) => !value)} aria-pressed={largeText} className={buttonClass}><Type className="size-3.5" />{locale === "fa" ? "اندازه متن" : "Text size"}</button>
          <button type="button" onClick={() => window.print()} className={buttonClass}><Printer className="size-3.5" />{locale === "fa" ? "چاپ" : "Print"}</button>
        </div>
      ) : null}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={locale === "fa" ? "ابزارهای مطالعه" : "Reading tools"} className="relative flex size-12 items-center justify-center rounded-full border border-primary/60 bg-background text-primary shadow-[0_12px_35px_-14px_rgba(0,0,0,0.6)] transition hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span aria-hidden="true" className="absolute inset-1 rounded-full border border-current/20" />
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
    </div>
  </>;
}
