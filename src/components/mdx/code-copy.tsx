"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useCopyToast } from "@/hooks/use-copy-toast";

export function CodeCopyButton() {
  const [copied, setCopied] = useState(false);
  const { show } = useCopyToast();

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const pre = e.currentTarget.closest("pre");
    const code = pre?.querySelector("code");
    const text = code?.textContent ?? "";
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    show("Code copied");
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-3 inline-flex min-h-9 items-center gap-1 rounded-full border border-white/20 bg-slate-950/90 px-2.5 py-1 text-[11px] font-semibold text-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      aria-label="Copy code"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
