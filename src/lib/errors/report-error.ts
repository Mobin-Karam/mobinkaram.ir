"use client";

import type { NormalizedAppError } from "./error-types";

interface ReportErrorOptions {
  source?: string;
  pathname?: string;
  metadata?: Record<string, unknown>;
}

export function reportError(
  error: unknown,
  normalizedError?: NormalizedAppError,
  options: ReportErrorOptions = {},
) {
  const payload = {
    timestamp: new Date().toISOString(),
    source: options.source ?? "client",
    pathname:
      options.pathname ??
      (typeof window !== "undefined"
        ? window.location.pathname
        : undefined),
    userAgent:
      typeof navigator !== "undefined"
        ? navigator.userAgent
        : undefined,
    normalizedError,
    originalError: error,
    metadata: options.metadata,
  };

  if (process.env.NODE_ENV === "development") {
    console.error("[Application Error]", payload);
  }

  /*
   * Production integrations:
   *
   * Sentry.captureException(error, {
   *   extra: payload,
   * });
   *
   * fetch("/api/client-errors", {
   *   method: "POST",
   *   headers: { "Content-Type": "application/json" },
   *   body: JSON.stringify(payload),
   *   keepalive: true,
   * }).catch(() => undefined);
   */
}