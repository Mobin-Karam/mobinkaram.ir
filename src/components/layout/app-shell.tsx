import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/ui/back-to-top";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  children: ReactNode;
};

export function AppShell({ locale, children }: Props) {
  return (
    <div className="layout-shell">
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter />
      <MobileNav locale={locale} />
      <BackToTop />
    </div>
  );
}
