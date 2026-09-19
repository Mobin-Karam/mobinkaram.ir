"use client";

import { useTranslations } from "next-intl";

import { ErrorPage } from "@/lib/errors";

export default function MaintenancePage() {
  const t = useTranslations("errors.maintenance");

  return (
    <ErrorPage
      type="maintenance"
      code="503"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      showRetry
      showBack={false}
      showHome
    />
  );
}
