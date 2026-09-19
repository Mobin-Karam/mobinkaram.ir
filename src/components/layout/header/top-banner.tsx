"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TopBanner() {
  const t = useTranslations("banner");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-primary/5 border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center gap-4 py-2">
            <p className="text-sm text-muted-foreground">{t("text")}</p>

            <a
              href="https://t.me/linoxch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              {t("joinButton")} →
            </a>

            <button
              onClick={() => setVisible(false)}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
