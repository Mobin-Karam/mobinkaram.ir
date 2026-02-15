import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { locales, type Locale } from "@/i18n/config";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalized = locale as Locale;

  if (!locales.includes(normalized)) {
    notFound();
  }

  setRequestLocale(normalized);

  return <AppShell locale={normalized}>{children}</AppShell>;
}
