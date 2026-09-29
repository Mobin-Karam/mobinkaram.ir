import type { Metadata } from "next";
import { BriefcaseBusiness, Code2, Mail, MessageCircle, Phone } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { getHomeContent } from "@/data/home-content";

const socialIcons = {
  linkedin: BriefcaseBusiness,
  github: Code2,
  telegram: MessageCircle,
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isFa = locale === "fa";

  return {
    title: isFa ? "تماس با مبین کرم" : "Contact Mobin Karam",
    description: isFa
      ? "برای همکاری، پروژه یا فرصت شغلی با مبین کرم در تماس باشید."
      : "Get in touch with Mobin Karam about collaboration, projects, or opportunities.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getHomeContent(locale).contact;
  const t = await getTranslations("nav");
  const primaryLinks = [
    { ...content.links.email, icon: Mail },
    { ...content.links.phone, icon: Phone },
  ];
  const socialLinks = (["linkedin", "github", "telegram"] as const).map(
    (key) => ({ ...content.links[key], icon: socialIcons[key] }),
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <section aria-labelledby="contact-title" className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          {t("contact")}
        </p>
        <h1 id="contact-title" className="mt-3 font-serif text-4xl font-black tracking-tight sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          {content.description}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {primaryLinks.map(({ href, icon: Icon, label, value }) => (
            <a
              key={href}
              href={href}
              className="group flex min-h-32 items-start gap-4 rounded-2xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{label}</span>
                <span className="mt-1 block break-all text-sm text-muted-foreground" dir="ltr">
                  {value}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center gap-3 rounded-xl border border-border px-4 text-sm font-semibold transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
