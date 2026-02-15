"use client";

import { useEffect, useRef, useState } from "react";
import {
  Clipboard,
  Download,
  FileText,
  Share2,
  MessageSquare,
  FileDown,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useCopyToast } from "@/hooks/use-copy-toast";
import { useShare } from "@/hooks/use-share";
import { slugify, escapeHtml } from "@/lib/strings";

function grabPostText() {
  const el = document.querySelector(".mdx-content");
  return (el?.textContent || "").trim();
}

export function PostActions({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const { status, show } = useCopyToast();
  const { share } = useShare();
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setOpen(false));

  const copyText = async (asMd = false) => {
    const text = grabPostText();
    if (!text) return;
    await navigator.clipboard.writeText(asMd ? text : text);
    show("Copied to clipboard");
  };

  const download = (ext: "txt" | "md") => {
    const text = grabPostText();
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(title || "post")}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openChatGPT = () => {
    const text = grabPostText();
    if (!text) return;
    const url = `https://chat.openai.com/?q=${encodeURIComponent(
      text.slice(0, 4000),
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openClaude = () => {
    const text = grabPostText();
    if (!text) return;
    const url = `https://claude.ai/new?q=${encodeURIComponent(
      text.slice(0, 4000),
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const exportPdf = () => {
    const text = grabPostText();
    if (!text) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(
      `<html><head><title>${title}</title></head><body><pre style="font-family:Inter,system-ui,monospace;white-space:pre-wrap">${escapeHtml(
        text,
      )}</pre><script>window.print();</script></body></html>`,
    );
    win.document.close();
  };

  const shareSocial = (platform: "x" | "telegram" | "reddit") => {
    share(platform, title);
  };

  return (
    <div
      className="relative mb-3 flex flex-wrap items-center gap-2 text-xs"
      data-post-actions
      ref={containerRef}
    >
      <button
        onClick={() => copyText(true)}
        className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition text-[11px]"
      >
        <Clipboard size={14} />
        Copy
      </button>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen((o) => !o)}
          className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition text-[11px]"
        >
          <MoreHorizontal size={14} />
          More
        </button>
      </div>

      {open ? (
        <div className="absolute z-20 mt-2 w-56 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2 shadow-lg">
          <ActionButton onClick={() => download("md")} icon={Download} label="Download .md" />
          <ActionButton onClick={() => download("txt")} icon={FileText} label="Download .txt" />
          <ActionButton onClick={exportPdf} icon={FileDown} label="Export PDF" />
          <ActionButton onClick={openChatGPT} icon={Share2} label="Open in ChatGPT" />
          <ActionButton onClick={openClaude} icon={MessageSquare} label="Open in Claude" />
          <ActionButton onClick={() => shareSocial("x")} icon={Send} label="Share to X" />
          <ActionButton onClick={() => shareSocial("telegram")} icon={Send} label="Share to Telegram" />
          <ActionButton onClick={() => shareSocial("reddit")} icon={Send} label="Share to Reddit" />
        </div>
      ) : null}

      {status ? (
        <div className="fixed bottom-16 right-6 z-40 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-300/50">
          {status}
        </div>
      ) : null}
    </div>
  );
}

function ActionButton({
  onClick,
  icon: Icon,
  label,
}: {
  onClick: () => void;
  icon: typeof Clipboard;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition text-[11px]"
    >
      <Icon size={14} />
      {label}
    </button>
  );
}
