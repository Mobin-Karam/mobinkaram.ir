"use client";

import { useLocale } from "next-intl";
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
      className="hero-story relative min-h-[100svh] border-b border-border/70"
    >
      <div className="hero-story__panel relative isolate min-h-[100svh] overflow-hidden bg-background">
        <BgBoardHero />
        <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 px-4 pt-[var(--site-header-safe)] sm:px-6 lg:grid-cols-12 lg:px-8 lg:pt-[var(--site-header-safe)]">
          <HeroImageMe />
          <DetailsOfHero rtl={rtl} locale={locale} />
        </div>
      </div>
    </section>
  );
}
