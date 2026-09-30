import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import type { BlogLocale, BlogPostMeta } from "@/types/blog";

export default async function BlogArticleNavigation({
  locale,
  newer,
  older,
}: {
  locale: BlogLocale;
  newer: BlogPostMeta | null;
  older: BlogPostMeta | null;
}) {
  const t = await getTranslations({ locale, namespace: "blog" });
  if (!newer && !older) return null;

  return (
    <nav aria-label={locale === "fa" ? "ناوبری نوشته‌ها" : "Post navigation"} className="mx-auto mt-14 grid max-w-2xl gap-3 sm:grid-cols-2">
      {older ? (
        <Link href={older.href} prefetch className="block min-h-32 rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span className="flex items-center gap-2 font-mono text-[10px] font-medium tracking-[0.12em] text-muted-foreground">
            <ArrowLeft className="size-3.5 rtl:-scale-x-100" />
            {t("olderPost")}
          </span>
          <strong className="mt-3 block text-base leading-6">{older.title}</strong>
        </Link>
      ) : <div className="hidden sm:block" />}

      {newer ? (
        <Link href={newer.href} prefetch className="block min-h-32 rounded-xl border border-border bg-card p-5 text-end transition hover:border-primary hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span className="flex items-center justify-end gap-2 font-mono text-[10px] font-medium tracking-[0.12em] text-muted-foreground">
            {t("newerPost")}
            <ArrowRight className="size-3.5 rtl:-scale-x-100" />
          </span>
          <strong className="mt-3 block text-base leading-6">{newer.title}</strong>
        </Link>
      ) : null}
    </nav>
  );
}
