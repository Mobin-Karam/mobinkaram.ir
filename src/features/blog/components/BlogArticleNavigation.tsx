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
    <nav aria-label={locale === "fa" ? "ناوبری نوشته‌ها" : "Post navigation"} className="mx-auto mt-16 grid max-w-3xl gap-px overflow-hidden border border-border bg-border font-mono sm:grid-cols-2 lg:mt-20">
      {older ? (
        <Link href={older.href} prefetch className="block min-h-36 bg-background p-6 transition hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-7">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <ArrowLeft className="size-3.5 rtl:-scale-x-100" />
            {t("olderPost")}
          </span>
          <strong className="mt-3 block text-lg leading-6">$ {older.title}</strong>
        </Link>
      ) : <div className="hidden bg-background sm:block" />}

      {newer ? (
        <Link href={newer.href} prefetch className="block min-h-36 bg-background p-6 text-end transition hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-7">
          <span className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {t("newerPost")}
            <ArrowRight className="size-3.5 rtl:-scale-x-100" />
          </span>
          <strong className="mt-3 block text-lg leading-6">$ {newer.title}</strong>
        </Link>
      ) : null}
    </nav>
  );
}
