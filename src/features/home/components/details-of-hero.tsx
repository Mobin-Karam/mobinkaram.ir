import React from "react";
import { HighlightedText } from "../lib/helper";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail, Notebook } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

type TFunction = { t: (key: string) => string };

export default function DetailsOfHero({
  rtl,
  locale,
}: {
  rtl: boolean;
  locale: string;
}) {
  const t = useTranslations("hero");

  return (
    <div
      className={[
        "relative z-30 order-2 flex flex-col items-center justify-center pb-14 pt-6 text-center",
        "lg:order-1 lg:col-span-5 lg:items-start lg:pb-0 lg:pt-0",
        rtl ? "lg:text-right" : "lg:text-left",
      ].join(" ")}
    >
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-md">
        <span className="size-2 rounded-full bg-primary" />
        {t("role")}
      </span>

      <TextContent t={t} />

      <AccessLinkButtons locale={locale} t={t} />

      <SocialMediaButtons t={t} />
    </div>
  );
}

function TextContent({ t }: TFunction) {
  return (
    <>
      <h1 className="max-w-3xl text-balance text-[2.35rem] font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]">
        <span className="block">{t("titleLine1")}</span>
        <span className="mt-2 block">
          <HighlightedText text={t("titleLine2")} />
        </span>
      </h1>

      <p className="mt-5 max-w-xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 lg:text-lg">
        <HighlightedText text={t("description")} />
      </p>
    </>
  );
}

function AccessLinkButtons({
  t,
  locale,
}: {
  t: (key: string) => string;
  locale: string;
}) {
  return (
    <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <Link
        href={`/${locale}/projects`}
        className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
      >
        {t("viewProjects")}
        <ArrowUpRight className="size-4 rtl:-scale-x-100" />
      </Link>

      <Link
        href={`/${locale}#contact`}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/70 px-6 py-3 font-semibold backdrop-blur-md hover:border-primary/40"
      >
        <Mail className="size-4" />
        {t("contactMe")}
      </Link>

      <Link
        href={`/${locale}/blog`}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/70 px-6 py-3 font-semibold backdrop-blur-md hover:border-primary/40"
      >
        <Notebook className="size-4" />
        {t("blog")}
      </Link>
    </div>
  );
}

function SocialMediaButtons({ t }: TFunction) {
  const socials = [
    { label: "GitHub", href: "https://github.com/Mobin-Karam", icon: FaGithub },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mobin-karam/", icon: FaLinkedinIn },
    { label: "Instagram @mobinkaram.dev", href: "https://www.instagram.com/mobinkaram.dev/", icon: FaInstagram },
    { label: "YouTube @mobinkaramyt", href: "https://www.youtube.com/@mobinkaramyt", icon: FaYoutube },
  ];

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
      <span className="me-1 text-xs font-medium text-muted-foreground">
        {t("followMe")}
      </span>
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Icon className="size-[18px]" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
