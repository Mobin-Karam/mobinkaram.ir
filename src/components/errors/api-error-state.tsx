"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { normalizeError } from "@/lib/errors/normalize-error";
import { cn } from "@/lib/utils";

interface ApiErrorStateProps {
  error: unknown;
  onRetry?: () => void;
  className?: string;
  compact?: boolean;
}

export function ApiErrorState({
  error,
  onRetry,
  className,
  compact = false,
}: ApiErrorStateProps) {
  const t = useTranslations("errors.api");
  const normalized = normalizeError(error);

  const translationKey =
    normalized.type === "offline"
      ? "offline"
      : normalized.type === "network"
        ? "network"
        : normalized.type === "forbidden"
          ? "forbidden"
          : normalized.type === "unauthorized"
            ? "unauthorized"
            : normalized.type === "timeout"
              ? "timeout"
              : "default";

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 text-center",
        compact ? "min-h-40 p-5" : "min-h-64 p-8",
        className,
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-5" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-foreground">
        {t(`${translationKey}.title`)}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {normalized.message || t(`${translationKey}.description`)}
      </p>

      {normalized.requestId && (
        <p dir="ltr" className="mt-3 font-mono text-xs text-muted-foreground">
          ID: {normalized.requestId}
        </p>
      )}

      {onRetry && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-5 gap-2"
        >
          <RefreshCw className="size-4" />
          {t("retry")}
        </Button>
      )}
    </div>
  );
}
