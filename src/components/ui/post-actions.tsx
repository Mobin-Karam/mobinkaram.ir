"use client";

import { useEffect, useState } from "react";
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

function grabPostText() {
  const el = document.querySelector(".mdx-content");
  return (el?.textContent || "").trim();
}

export function PostActions({ title }: { title: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest?.("[data-post-actions]")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const copyText = async (asMd = false) => {
    const text = grabPostText();
    if (!text) return;
    await navigator.clipboard.writeText(asMd ? text : text);
    setStatus("Copied to clipboard");
    setTimeout(() => setStatus(null), 1800);
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
    const text = `${title} — ${shareUrl}`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);
    let url = "";
    if (platform === "x") {
      url = `https://twitter.com/intent/tweet?text=${encodedText}`;
    } else if (platform === "telegram") {
      url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    } else {
      url = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="relative mb-3 flex flex-wrap items-center gap-2 text-xs"
      data-post-actions
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
        <button
          onClick={() => shareSocial("x")}
          className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition text-[11px]"
        >
          <Send size={14} />
          Share
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

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
