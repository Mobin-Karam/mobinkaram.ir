"use client";

import { ErrorPage } from "@/lib/errors";
import { useTranslations } from "next-intl";


export default function ServerErrorPage() {
  const t = useTranslations("errors.server");

  return (
    <ErrorPage
      type="server"
      code="500"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      showRetry
      showBack
      showHome
      showContact
    />
  );
}
