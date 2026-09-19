"use client";

import { useTranslations } from "next-intl";

import { ErrorPage } from "@/lib/errors";

export default function OfflinePage() {
  const t = useTranslations("errors.offline");

  return (
    <ErrorPage
      type="offline"
      code="OFFLINE"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      showRetry
      showBack
      showHome
      onRetry={() => window.location.reload()}
    />
  );
}