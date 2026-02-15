"use client";

import { useState } from "react";

/**
 * Small helper to show a transient "copied" status/toast.
 */
export function useCopyToast(timeoutMs = 1800) {
  const [status, setStatus] = useState<string | null>(null);

  const show = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(null), timeoutMs);
  };

  return { status, show };
}
