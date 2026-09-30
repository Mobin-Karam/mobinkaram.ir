import { getTranslations } from "next-intl/server";
import type { BlogLocale } from "@/types/blog";

export default async function BlogMasthead({ locale }: { locale: BlogLocale }) {
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <header className="border-b border-border font-mono">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="terminal-window overflow-hidden border border-border bg-card shadow-[8px_8px_0_color-mix(in_srgb,var(--color-border)_70%,transparent)]">
          <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="size-2 rounded-full bg-destructive" /><span className="size-2 rounded-full bg-warning" /><span className="size-2 rounded-full bg-success" />
            <span className="ms-2 truncate">journal@mobinkaram:~/notes</span>
            <span className="ms-auto hidden sm:inline">{t("masthead.established")}</span>
          </div>
          <div className="p-5 sm:p-8 lg:p-10">
            <p className="text-xs text-primary"><span aria-hidden="true">$ </span>{t("eyebrow").toLocaleLowerCase()}<span className="animate-pulse">_</span></p>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t("journalTitleLine1")} <span className="text-primary">{t("journalTitleLine2")}</span>
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{t("description")}</p>
            <div className="mt-8 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              {[t("categories.development"), t("categories.cybersecurity"), t("categories.architecture"), t("categories.ai")].map((item) => <span key={item} className="border border-border px-2 py-1">[{item}]</span>)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
