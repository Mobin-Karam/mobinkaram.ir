"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import { getErrorPath } from "@/lib/errors/error-navigation";
import { normalizeError } from "@/lib/errors/normalize-error";
import { reportError } from "@/lib/errors/report-error";

interface HandleApiErrorOptions {
  redirect?: boolean;
  source?: string;
  metadata?: Record<string, unknown>;
}

export function useApiErrorHandler() {
  const locale = useLocale();
  const router = useRouter();

  return useCallback(
    (
      error: unknown,
      options: HandleApiErrorOptions = {},
    ) => {
      const normalized = normalizeError(error);

      reportError(error, normalized, {
        source: options.source ?? "api-request",
        metadata: options.metadata,
      });

      if (options.redirect === false) {
        return normalized;
      }

      if (
        normalized.type === "validation" ||
        normalized.type === "network"
      ) {
        return normalized;
      }

      router.push(
        getErrorPath(normalized.type, locale),
      );

      return normalized;
    },
    [locale, router],
  );
}