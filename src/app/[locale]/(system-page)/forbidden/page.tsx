"use client";

import { useTranslations } from "next-intl";

import { ErrorPage } from "@/lib/errors";

export default function ForbiddenPage() {
  const t = useTranslations("errors.forbidden");

  return (
    <ErrorPage
      type="forbidden"
      code="403"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      showBack
      showHome
      showContact
    />
  );
}
