"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export type ToastVariant = "success" | "error" | "info" | "default";
export type ToastOptions = { variant?: ToastVariant; durationMs?: number };

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: (message: string, options?: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let idCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = ++idCounter;
      const variant = options?.variant ?? "default";
      const duration = options?.durationMs ?? 2400;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => remove(id), duration);
    },
    [remove],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined"
        ? createPortal(
            <div className="fixed bottom-16 right-4 z-50 flex max-w-sm flex-col gap-3 md:right-6">
              {toasts.map((t) => (
                <div
                  key={t.id}
                  className={clsx(
                    "rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lg shadow-black/10 backdrop-blur-md",
                    "bg-[color:var(--surface)]/95 border-[color:var(--border)] text-[color:var(--foreground)]",
                    t.variant === "success" && "border-emerald-300 bg-emerald-50/90 text-emerald-900",
                    t.variant === "error" && "border-red-300 bg-red-50/90 text-red-900",
                    t.variant === "info" && "border-blue-200 bg-blue-50/90 text-blue-900",
                  )}
                >
                  {t.message}
                </div>
              ))}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx.toast;
}
