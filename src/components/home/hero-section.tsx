"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

import { HeroChatCue } from "@/components/home/hero-chat-cue";
import { getHomeContent } from "@/data/home-content";

const RTL_LOCALES = ["fa", "ar", "ku"];

type TechLogo = {
  name: string;
  icon: string;
  className: string;
  size?: "sm" | "md" | "lg";
};

const TECH_LOGOS: TechLogo[] = [
  {
    name: "ChatGPT",
    icon: "simple-icons:openai",
    className: "left-[13%] top-[8%]",
    size: "md",
  },
  {
    name: "Claude",
    icon: "simple-icons:claude",
    className: "right-[17%] top-[9%]",
    size: "md",
  },
  {
    name: "n8n",
    icon: "simple-icons:n8n",
    className: "left-[2%] top-[20%]",
    size: "lg",
  },
  {
    name: "NestJS",
    icon: "simple-icons:nestjs",
    className: "right-[3%] top-[18%]",
    size: "lg",
  },
  {
    name: "React",
    icon: "simple-icons:react",
    className: "left-[2%] top-[39%]",
    size: "md",
  },
  {
    name: "TypeScript",
    icon: "simple-icons:typescript",
    className: "right-[7%] top-[39%]",
    size: "md",
  },
  {
    name: "Python",
    icon: "simple-icons:python",
    className: "left-[4%] top-[58%]",
    size: "md",
  },
  {
    name: "Docker",
    icon: "simple-icons:docker",
    className: "right-[4%] top-[58%]",
    size: "md",
  },
  {
    name: "PostgreSQL",
    icon: "simple-icons:postgresql",
    className: "left-[17%] bottom-[15%]",
  },
  {
    name: "Prisma",
    icon: "simple-icons:prisma",
    className: "right-[18%] bottom-[14%]",
  },
  {
    name: "Kubernetes",
    icon: "simple-icons:kubernetes",
    className: "left-[33%] top-[14%]",
  },
  {
    name: "OWASP",
    icon: "simple-icons:owasp",
    className: "right-[34%] top-[13%]",
  },
  {
    name: "Tailwind CSS",
    icon: "simple-icons:tailwindcss",
    className: "left-[34%] bottom-[6%]",
  },
  {
    name: "Linux",
    icon: "simple-icons:linux",
    className: "right-[35%] bottom-[6%]",
  },
];

const SIZE = {
  sm: "size-10 xl:size-11",
  md: "size-12 xl:size-14",
  lg: "size-14 xl:size-16",
} as const;

function iconifyUrl(icon: string) {
  return `https://api.iconify.design/${icon}.svg`;
}

function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\$.*?\$)/g);

  return (
    <>
      {parts.map((part, index) => {
        const highlighted = part.startsWith("$") && part.endsWith("$");

        return highlighted ? (
          <span key={`${part}-${index}`} className="text-primary">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        );
      })}
    </>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const story = getHomeContent(locale).story.sections.hero;
  const rtl = RTL_LOCALES.includes(locale);

  return (
    <section
      id="home"
      dir={rtl ? "rtl" : "ltr"}
      className="hero-story relative border-b border-border/70 pt-[var(--site-header-safe)] lg:pt-0"
    >
      <div className="hero-story__panel relative isolate overflow-hidden bg-background">
        <div className="absolute inset-0 -z-20 opacity-[0.035] dark:opacity-[0.08] bg-size-[32px_32px] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]" />
        <div className="absolute -right-32 top-8 -z-20 size-[30rem] rounded-full bg-primary/13 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 -z-20 size-[28rem] rounded-full bg-accent/20 blur-[130px]" />

        <div className="relative mx-auto grid min-h-[calc(100svh-var(--site-header-height))] max-w-7xl grid-cols-1 px-4 sm:px-6 lg:h-full lg:min-h-0 lg:grid-cols-12 lg:px-8">
          <div className="relative order-1 h-[390px] sm:h-[500px] md:h-[600px] lg:order-2 lg:col-span-7 lg:h-full">
            <div className="absolute inset-x-2 bottom-0 top-8 rounded-[2rem] bg-gradient-to-b from-primary/5 via-primary/9 to-primary/16 lg:hidden" />

            <div className="absolute bottom-0 left-1/2 hidden h-[88%] w-[82%] -translate-x-1/2 rounded-t-full bg-gradient-to-t from-primary/22 via-primary/7 to-transparent blur-2xl lg:block" />

            <div className="absolute inset-0 flex items-end justify-center">
              <div className="relative h-[105%] w-[105%] lg:h-[110%] lg:w-[110%] xl:h-[115%] xl:w-[115%]">
                <Image
                  src="/images/me-transparent.png"
                  alt={t("portraitAlt")}
                  fill
                  priority
                  sizes="(max-width:1024px)100vw,58vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
              {TECH_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className={[
                    "pointer-events-auto absolute",
                    logo.className,
                  ].join(" ")}
                  title={logo.name}
                >
                  <div
                    className={[
                      "grid place-items-center rounded-xl border border-border/60 bg-background/58 shadow-sm backdrop-blur-sm",
                      SIZE[logo.size ?? "sm"],
                    ].join(" ")}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={iconifyUrl(logo.icon)}
                      alt=""
                      loading="lazy"
                      draggable={false}
                      className="size-[58%] object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

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

            <h1 className="max-w-3xl text-balance text-[2.35rem] font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]">
              <span className="block">{t("titleLine1")}</span>
              <span className="mt-2 block">
                <HighlightedText text={t("titleLine2")} />
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 lg:text-lg">
              <HighlightedText text={t("description")} />
            </p>


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
            </div>

            <div className="mt-6 flex items-center gap-2">
              <span className="me-1 hidden text-xs font-medium text-muted-foreground sm:inline">
                {t("followMe")}
              </span>
              <a
                href="https://github.com/Mobin-Karam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              >
                <FaGithub className="size-[18px]" />
              </a>
              <a
                href="https://www.linkedin.com/in/mobin-karam/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              >
                <FaLinkedinIn className="size-[18px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
