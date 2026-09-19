"use client";

import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorDetailsProps {
  error?: Error & {
    digest?: string;
  };
  requestId?: string;
  details?: unknown;
}

export function ErrorDetails({ error, requestId, details }: ErrorDetailsProps) {
  const t = useTranslations("errors.details");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (process.env.NODE_ENV !== "development" && !requestId) {
    return null;
  }

  const content = JSON.stringify(
    {
      message: error?.message,
      stack: process.env.NODE_ENV === "development" ? error?.stack : undefined,
      digest: error?.digest,
      requestId,
      details,
    },
    null,
    2,
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-muted/30 text-start">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex w-full items-center justify-between gap-4",
          "px-4 py-3 text-sm font-medium",
          "transition-colors hover:bg-muted/70",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-primary focus-visible:ring-inset",
        )}
      >
        <span>{t("title")}</span>

        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="border-t border-border">
          <div className="flex justify-end px-3 pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}

              {copied ? t("copied") : t("copy")}
            </Button>
          </div>

          <pre
            dir="ltr"
            className="max-h-72 overflow-auto whitespace-pre-wrap break-words p-4 text-left font-mono text-xs leading-6 text-muted-foreground"
          >
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}
