import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DirectionUpdater } from "@/components/layout/direction-updater";
import { defaultLocale, rtlLocales, type Locale } from "@/i18n/config";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mobin Karam | Software Engineer & Product Builder",
  description:
    "Software engineer, React/Next.js/NestJS builder, and technical educator. مهندس نرم افزار و توسعه‌دهنده وب؛ یادداشت‌ها، آزمایشگاه، و مسیر یادگیری.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
  },
  keywords: [
    // English authority
    "software engineer portfolio",
    "full stack developer",
    "react developer portfolio",
    "typescript developer",
    "next.js developer",
    "node.js engineer",
    "software engineer blog",
    "next.js seo guide",
    "react performance optimization",
    "typescript best practices",
    "node.js architecture guide",
    // Persian identity (tier 1)
    "مهندس نرم افزار",
    "برنامه نویس فول استک",
    "توسعه دهنده وب",
    "مهندس نرم افزار ایرانی",
    "برنامه نویس جاوااسکریپت",
    "توسعه دهنده React",
    "توسعه دهنده Node.js",
    "مهندس نرم افزار فرانت اند",
    "مهندس نرم افزار بک اند",
    // Persian education (tier 2)
    "آموزش React",
    "آموزش TypeScript",
    "آموزش Next.js",
    "آموزش Node.js",
    "آموزش طراحی سیستم",
    "معماری نرم افزار چیست",
    "چگونه برنامه نویس شویم",
    "مسیر یادگیری برنامه نویسی",
    // Persian problem/intent (tier 3)
    "حل خطای React",
    "مشکل useEffect",
    "خطای TypeScript",
    "رفع ارور Next.js",
    "بهینه سازی سایت Next.js",
    "مشکل SEO در Next.js",
    // Personal brand (tier 4)
    "مبین کرم",
    "مبین کرم کیست",
    "پروژه های مبین کرم",
    "وب سایت مبین کرم",
    "تجربه برنامه نویسی مبین کرم",
    // Advanced authority (tier 5)
    "معماری scalable چیست",
    "سیستم طراحی نرم افزار",
    "بهترین ساختار پروژه React",
    "چگونه SaaS بسازیم",
    "ساخت استارتاپ نرم افزاری",
  ],
  alternates: {
    canonical: "https://mobinkaram.ir",
    languages: {
      en: "https://mobinkaram.ir/en",
      fa: "https://mobinkaram.ir/fa",
    },
    types: {
      "application/rss+xml": "https://mobinkaram.ir/rss.xml",
    },
  },
  openGraph: {
    title: "Mobin Karam | Software Engineer & Product Builder",
    description:
      "Developer OS = public engineering workspace: projects, lab experiments, and build logs in English + Persian.",
    url: "https://mobinkaram.ir",
    siteName: "Mobin Karam",
    locale: "en_US",
    alternateLocale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobin Karam | Software Engineer & Product Builder",
    description:
      "Projects, build log, and lab experiments by Mobin Karam (Koonj Inc). English + Persian SEO ready.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = defaultLocale;
  const isRTL = rtlLocales.has(locale);

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazir.variable} antialiased bg-surface text-foreground`}
        data-locale={locale}
      >
        <Script
          defer
          data-domain="mobinkaram.ir"
          src="https://plausible.io/js/script.js"
        />
        <Script id="ld-json-person" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Mobin Karam",
            url: "https://mobinkaram.ir",
            jobTitle: "Software Engineer",
            sameAs: [
              "https://github.com/Mobin-Karam",
              "https://github.com/Koonj-Inc",
              "https://www.linkedin.com/in/mobin-karam/",
              "https://quera.org/profile/mobinkaram",
            ],
          })}
        </Script>
        <Script id="ld-json-website" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Mobin Karam — Software Engineer",
            url: "https://mobinkaram.ir",
            inLanguage: locale,
            potentialAction: {
              "@type": "SearchAction",
              target: "https://mobinkaram.ir/{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DirectionUpdater locale={locale} />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
