"use client";

import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";

import { normalizeError } from "@/lib/errors/normalize-error";
import { reportError } from "@/lib/errors/report-error";
import { ErrorPage } from "@/lib/errors";

interface RouteErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function RouteError({ error, reset }: RouteErrorProps) {
  const t = useTranslations("errors.server");

  const normalized = useMemo(() => normalizeError(error), [error]);

  useEffect(() => {
    reportError(error, normalized, {
      source: "route-error-boundary",
    });
  }, [error, normalized]);

  return (
    <ErrorPage
      type={normalized.type}
      code={normalized.status ?? "500"}
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      error={error}
      requestId={normalized.requestId ?? error.digest}
      details={normalized.details}
      showRetry
      showBack
      showHome
      showContact
      onRetry={reset}
    />
  );
}
