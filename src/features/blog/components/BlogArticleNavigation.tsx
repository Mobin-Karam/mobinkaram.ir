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
    <nav className="mx-auto mt-16 grid max-w-3xl gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-2 lg:mt-20">
      {older ? (
        <Link href={older.href} className="bg-background p-6 sm:p-7">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <ArrowLeft className="size-3.5 rtl:-scale-x-100" />
            {t("olderPost")}
          </span>
          <strong className="mt-3 block font-serif text-lg leading-6">{older.title}</strong>
        </Link>
      ) : <div className="hidden bg-background sm:block" />}

      {newer ? (
        <Link href={newer.href} className="bg-background p-6 text-end sm:p-7">
          <span className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {t("newerPost")}
            <ArrowRight className="size-3.5 rtl:-scale-x-100" />
          </span>
          <strong className="mt-3 block font-serif text-lg leading-6">{newer.title}</strong>
        </Link>
      ) : null}
    </nav>
  );
}
