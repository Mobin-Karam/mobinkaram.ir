import type { Metadata } from "next";
import type { ReactNode } from "react";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

import { OfflineListener } from "@/components/errors/offline-listener";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { SiteHeader } from "@/components/layout/header/site-header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/ui/toast-provider";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://mobinkaram.ir";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isFa = locale === "fa";

  const title = isFa
    ? "مبین کرم | مهندس نرم‌افزار، توسعه‌دهنده فول‌استک و امنیت"
    : "Mobin Karam | Software Engineer, Full-Stack Developer & Security";

  const description = isFa
    ? "مهندس نرم‌افزار با تمرکز بر Next.js، React، TypeScript، NestJS، PostgreSQL، تجربه کاربری، امنیت سایبری و ساخت محصولات واقعی."
    : "Software engineer focused on Next.js, React, TypeScript, NestJS, PostgreSQL, product UX, cybersecurity, and production web systems.";

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,

    keywords: isFa
      ? [
          "مهندس نرم افزار",
          "برنامه نویس فول استک",
          "توسعه دهنده Next.js",
          "توسعه دهنده React",
          "توسعه دهنده NestJS",
          "TypeScript",
          "PostgreSQL",
          "Prisma",
          "امنیت سایبری",
          "مهندسی نرم افزار",
          "مبین کرم",
        ]
      : [
          "software engineer portfolio",
          "full stack developer",
          "Next.js developer",
          "React developer",
          "NestJS developer",
          "TypeScript developer",
          "PostgreSQL",
          "Prisma ORM",
          "cybersecurity",
          "Mobin Karam",
        ],

    authors: [
      {
        name: "Mobin Karam",
        url: BASE_URL,
      },
    ],

    creator: "Mobin Karam",
    publisher: "Mobin Karam",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        fa: `${BASE_URL}/fa`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/fa`,
      },
      types: {
        "application/rss+xml": `${BASE_URL}/rss`,
      },
    },

    openGraph: {
      type: "website",
      locale: isFa ? "fa_IR" : "en_US",
      alternateLocale: isFa ? ["en_US"] : ["fa_IR"],
      url: `${BASE_URL}/${locale}`,
      siteName: "Mobin Karam",
      title: isFa
        ? "مبین کرم | مهندس نرم‌افزار"
        : "Mobin Karam | Software Engineer",
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isFa ? "مبین کرم" : "Mobin Karam",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: isFa
        ? "مبین کرم | مهندس نرم‌افزار"
        : "Mobin Karam | Software Engineer",
      description,
      images: ["/og-image.png"],
    },

    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },

    manifest: "/manifest.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <ToastProvider>
          <OfflineListener />

          <div
            lang={locale}
            dir={direction}
            className="flex min-h-dvh flex-col"
          >
            <SiteHeader />

            <main id="main-content" className="min-w-0 flex-1">
              {children}
            </main>

            <SiteFooter />

            <Toaster
              position="top-center"
              richColors
              closeButton
              dir={direction}
            />
          </div>
        </ToastProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
