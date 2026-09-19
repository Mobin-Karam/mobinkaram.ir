"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fa";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background pt-20 pb-5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center">
              <span className="text-lg font-semibold">مبین کرم</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-tight">
              {t("quickLinks")}
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href={`/${locale}/projects`} className="transition hover:text-primary">
                  {locale === "fa" ? "پروژه‌ها" : "Projects"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="transition hover:text-primary">
                  {locale === "fa" ? "وبلاگ" : "Blog"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products`} className="transition hover:text-primary">
                  {locale === "fa" ? "خدمات" : "Services"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold tracking-tight">
              {t("connect")}
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.linkedin.com/in/mobin-karam/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-primary"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Mobin-Karam"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-primary"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/linoxch"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-primary"
                >
                  {locale === "fa" ? "تلگرام" : "Telegram"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {year} — {locale === "fa" ? "تمامی حقوق معنوی محفوظ است" : "All rights reserved"}</span>
          <span className="transition hover:text-primary">{t("credits")}</span>
        </div>
      </div>
    </footer>
  );
}
