import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { NotificationBar } from "@/components/ui/notification-bar";
import { LocationBar } from "@/components/ui/location-bar";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { ToastProvider } from "@/components/ui/toast-provider";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  children: ReactNode;
};

export function AppShell({ locale, children }: Props) {
  return (
    <ToastProvider>
      <div className="layout-shell">
        <NotificationBar
          message="New: RSS feed is live and GitHub pins are real-time. Follow along as I ship Koonj."
          cta={
            <a
              href="/rss.xml"
              target="_blank"
              rel="noreferrer"
              className="text-[color:var(--accent-strong)] underline underline-offset-4"
            >
              Subscribe
            </a>
          }
          countdownSeconds={10}
        />
        <SiteHeader locale={locale} />
        <LocationBar />
        <main>{children}</main>
        <SiteFooter />
        <MobileNav locale={locale} />
        <CookieBanner />
        <BackToTop />
      </div>
    </ToastProvider>
  );
}

