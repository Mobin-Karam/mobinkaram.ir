"use client";

import { useToast } from "@/components/ui/toast-provider";

export function useCopyToast(timeoutMs = 1800) {
  const toast = useToast();
  const show = (message: string) => {
    toast(message, { variant: "success", durationMs: timeoutMs });
  };
  return { status: null, show };
}
