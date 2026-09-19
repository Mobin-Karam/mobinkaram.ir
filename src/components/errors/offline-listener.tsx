"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

import { useOnlineStatus } from "@/hooks/use-online-status";

export function OfflineListener() {
  const t = useTranslations("errors.connection");
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -12,
          }}
          className={[
            "fixed inset-x-3 top-3 z-[100]",
            "mx-auto flex max-w-md items-center gap-3",
            "rounded-2xl border border-warning/30",
            "bg-background/95 px-4 py-3 shadow-lg",
            "backdrop-blur-xl",
          ].join(" ")}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
            <WifiOff className="size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">
              {t("offlineTitle")}
            </p>

            <p className="text-xs leading-5 text-muted-foreground">
              {t("offlineDescription")}
            </p>
          </div>
        </motion.div>
      )}

      {isOnline && (
        <span className="sr-only">
          <Wifi className="size-4" />
          {t("online")}
        </span>
      )}
    </AnimatePresence>
  );
}
