"use client";

import { ErrorPage } from "@/lib/errors";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("errors.notFound");

  return (
    <ErrorPage
      type="notFound"
      code="404"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      showBack
      showHome
      showContact
    />
  );
}
