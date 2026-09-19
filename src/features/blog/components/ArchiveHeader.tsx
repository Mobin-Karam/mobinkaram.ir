import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import type { BlogLocale } from "@/types/blog";

export default async function ArchiveHeader({
  locale,
  eyebrow,
  title,
  description,
}: {
  locale: BlogLocale;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8 lg:pt-32">
        <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          <ArrowLeft className="size-4 rtl:-scale-x-100" />
          {t("backToJournal")}
        </Link>
        <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.22em] text-primary sm:text-xs">{eyebrow}</p>
        <h1 className="mt-3 max-w-5xl font-serif text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">{title}</h1>
        {description ? <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p> : null}
      </div>
    </header>
  );
}
