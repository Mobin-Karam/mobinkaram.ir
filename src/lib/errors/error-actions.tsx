"use client";

import {
  ArrowLeft,
  House,
  LogIn,
  Mail,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ErrorActionsProps {
  showRetry?: boolean;
  showBack?: boolean;
  showHome?: boolean;
  showLogin?: boolean;
  showContact?: boolean;
  retryLabel?: string;
  onRetry?: () => void;
}

export function ErrorActions({
  showRetry = false,
  showBack = true,
  showHome = true,
  showLogin = false,
  showContact = false,
  retryLabel,
  onRetry,
}: ErrorActionsProps) {
  const t = useTranslations("errors.actions");
  const locale = useLocale();
  const router = useRouter();

  function retry() {
    if (onRetry) {
      onRetry();
      return;
    }

    router.refresh();
  }

  return (
    <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
      {showRetry && (
        <Button type="button" onClick={retry} className="gap-2">
          <RefreshCw className="size-4" />

          {retryLabel ?? t("tryAgain")}
        </Button>
      )}

      {showHome && (
        <Button
          type="button"
          variant={showRetry ? "outline" : "default"}
          onClick={() => router.push(`/${locale}`)}
          className="gap-2"
        >
          <House className="size-4" />
          {t("home")}
        </Button>
      )}

      {showBack && (
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {t("back")}
        </Button>
      )}

      {showLogin && (
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/${locale}`)}
          className="gap-2"
        >
          <LogIn className="size-4" />
          {t("login")}
        </Button>
      )}

      {showContact && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push(`/${locale}/contact`)}
          className="gap-2"
        >
          <Mail className="size-4" />
          {t("contact")}
        </Button>
      )}

      {!showRetry && !showHome && !showBack && (
        <Button
          type="button"
          onClick={() => window.location.reload()}
          className="gap-2"
        >
          <RotateCcw className="size-4" />
          {t("reload")}
        </Button>
      )}
    </div>
  );
}
