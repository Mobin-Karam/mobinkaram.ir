import { getTranslations } from "next-intl/server";
import type { BlogLocale } from "@/types/blog";

export default async function BlogMasthead({ locale }: { locale: BlogLocale }) {
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <header className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-4 pb-7 pt-24 sm:px-6 sm:pb-9 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="border-y border-border py-2.5 sm:py-3">
          <div className="grid grid-cols-2 items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em] lg:grid-cols-3 lg:text-xs">
            <span className="truncate">{t("masthead.topics")}</span>
            <span className="hidden text-center lg:block">{t("masthead.independent")}</span>
            <span className="text-end">{t("masthead.established")}</span>
          </div>
        </div>

        {/* <div className="py-9 text-center sm:py-12 lg:py-14">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-primary sm:mb-4 sm:text-xs sm:tracking-[0.3em]">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-[clamp(2.8rem,10vw,7rem)] font-black leading-[0.88] tracking-[-0.05em]">
            {t("journalTitleLine1")}
            <span className="block">{t("journalTitleLine2")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl px-2 text-sm leading-7 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">
            {t("description")}
          </p>
        </div> */}

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 border-t border-border pt-4 text-[9px] font-semibold uppercase tracking-[0.13em] text-muted-foreground sm:gap-x-3 sm:text-[10px] sm:tracking-[0.18em]">
          <span>{t("categories.development")}</span><span>•</span>
          <span>{t("categories.cybersecurity")}</span><span>•</span>
          <span>{t("categories.architecture")}</span><span>•</span>
          <span>{t("categories.ai")}</span>
        </div>
      </div>
    </header>
  );
}
