"use client";

import { useLocale, useTranslations } from "next-intl";
import HeroImageMe from "./hero-image-me";
import BgBoardHero from "./bg-board-hero";
import DetailsOfHero from "./details-of-hero";

const RTL_LOCALES = ["fa", "ar", "ku"];

export function HeroSection() {
  const locale = useLocale();
  const rtl = RTL_LOCALES.includes(locale);

  return (
    <section
      id="home"
      dir={rtl ? "rtl" : "ltr"}
      className="hero-story relative border-b border-border/70 pt-[var(--site-header-safe)] lg:pt-0"
    >
      <div className="hero-story__panel relative isolate overflow-hidden bg-background">
        <BgBoardHero />
        <div className="relative mx-auto grid min-h-[calc(100svh-var(--site-header-height))] max-w-7xl grid-cols-1 px-4 sm:px-6 lg:h-full lg:min-h-0 lg:grid-cols-12 lg:px-8">
          <HeroImageMe />
          <DetailsOfHero rtl={rtl} locale={locale} />
        </div>
      </div>
    </section>
  );
}
