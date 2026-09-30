"use client";

import { ErrorPage } from "@/lib/errors";
import { useTranslations } from "next-intl";

export default function TooManyRequestsPage() {
  const t = useTranslations("errors.rateLimit");

  return (
    <ErrorPage
      type="rateLimit"
      code="429"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      showRetry
      showBack
      showHome
    />
  );
}
