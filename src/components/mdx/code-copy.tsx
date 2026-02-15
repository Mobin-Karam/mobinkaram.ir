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
      className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1 text-[11px] font-semibold text-[color:var(--muted)] opacity-0 shadow-sm transition hover:-translate-y-0.5 hover:text-[color:var(--foreground)] group-hover:opacity-100"
      aria-label="Copy code"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
