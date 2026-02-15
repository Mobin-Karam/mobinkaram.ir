"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

export function DirectionUpdater({ locale }: { locale: Locale }) {
  useEffect(() => {
    const html = document.documentElement;
    const dir = locale === "fa" ? "rtl" : "ltr";
    html.lang = locale;
    html.dir = dir;
    html.dataset.locale = locale;
  }, [locale]);

  return null;
}
