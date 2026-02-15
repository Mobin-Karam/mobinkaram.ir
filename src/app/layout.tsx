import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DirectionUpdater } from "@/components/layout/direction-updater";
import { defaultLocale, rtlLocales, type Locale } from "@/i18n/config";
import "./globals.css";

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
  title: "Mobin Karam — Product Engineer | Developer OS",
  description:
    "Developer OS = my public engineering workspace, build log, and product lab for Koonj. I build products, not operating systems.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
  },
  keywords: [
    "Mobin Karam",
    "Koonj",
    "Product Engineer",
    "Next.js",
    "NestJS",
    "React Native",
    "پروژه",
    "مهندسی نرم افزار",
    "فول استک",
    "آزمایشگاه مهندسی",
    "مطالعات موردی",
    "مبین کرم",
    "کوونج",
    "کوونج اینک",
    "مهندس محصول",
    "برنامه نویس فول استک",
    "ری اکت نیتیو",
    "نکست جی اس",
    "سیستم طراحی",
    "یادداشت فنی",
    "دفترچه مهندسی",
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
    title: "Mobin Karam — Developer OS",
    description:
      "Engineering workspace, build log, and product lab by Mobin Karam (Koonj Inc).",
    url: "https://mobinkaram.ir",
    siteName: "Mobin Karam",
    locale: "en_US",
    alternateLocale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobin Karam — Developer OS",
    description:
      "Engineering workspace, build log, and product lab by Mobin Karam (Koonj Inc).",
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
