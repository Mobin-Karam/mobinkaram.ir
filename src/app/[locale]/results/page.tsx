import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ResultsContent locale={locale} />;
}

function ResultsContent({ locale }: { locale: string }) {
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      fa: {
        back: "بازگشت",
        title: "نتایج و دستاوردها",
        description:
          "مجموعه‌ای از نتایج قابل اندازه‌گیری که برای مشتریان خود ایجاد کرده‌ام.",
        performance: "Performance",
        accessibility: "Accessibility",
        seo: "SEO",
        bestPractices: "Best Practices",
        before: "قبل",
        after: "بعد",
      },
      en: {
        back: "Back",
        title: "Results & Achievements",
        description:
          "A collection of measurable results I've created for my clients.",
        performance: "Performance",
        accessibility: "Accessibility",
        seo: "SEO",
        bestPractices: "Best Practices",
        before: "Before",
        after: "After",
      },
    };
    return translations[locale]?.[key] || translations.en[key] || key;
  };

  const caseStudies = [
    {
      client: locale === "fa" ? "فروشگاه گلیفای" : "Gulify Shop",
      title: locale === "fa" ? "داشبورد و فروشگاه" : "Dashboard & Shop",
      description:
        locale === "fa"
          ? "پیاده سازی فروشگاه گلیفای ورژن ۱، به همراه دریافت سفارش از طریق پیام رسان بله"
          : "Implements the gulify version 1, with ordering list get from the social media Bale or Telegram.",
      improvement:
        locale === "fa"
          ? "۶۰٪ سریع‌تر در پردازش درخواست‌ها"
          : "60% faster request processing",
      metrics: [
        { label: "Performance", before: 30, after: 89 },
        { label: "Accessibility", before: 42, after: 94 },
      ],
      tags: ["Next.js", "Dashboard", "SaaS"],
    },
    {
      client: locale === "fa" ? "فروشگاه کورددانه" : "Kurddaneh",
      title:
        locale === "fa"
          ? "وبسایت فروشگاهی محصولات خشکبار"
          : "Dry Fruits Shop website",
      description:
        locale === "fa"
          ? "طراحیی و توسعه بخش سئو داخلی وبسایت فروشگاهی کورددانه"
          : "Complete Kurddaneh Shop website in UI/UX and al inner SEO base on customer want.",
      improvement:
        locale === "fa"
          ? "۳ برابر سریع تر با تصاویر مخصوص"
          : "3x faster with webp type images",
      metrics: [
        { label: "Performance", before: 52, after: 97 },
        { label: "SEO", before: 60, after: 100 },
      ],
      tags: ["Figma", "SEO", "Photoshop", "Illustrator"],
    }
  ];

  return (
    <div className="min-h-dvh">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link
            href={`/${locale}`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            ← {t("back")}
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {t("title").split(" و ")[0]}{" "}
            <span className="text-primary">{t("title").split(" و ")[1]}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              {
                value: "40%",
                label:
                  locale === "fa"
                    ? "میانگین بهبود سئو"
                    : "Average SEO Improvement",
              },
              {
                value: "3x",
                label: locale === "fa" ? "بارگذاری سریع‌تر" : "Faster Loading",
              },
              {
                value: "2+",
                label:
                  locale === "fa" ? "پروژه تحویل شده" : "Projects Delivered",
              },
              {
                value: "99%",
                label: locale === "fa" ? "رضایت مشتری" : "Client Satisfaction",
              },
            ].map((metric, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <p className="text-4xl font-bold text-primary">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-2xl font-semibold tracking-tight">
            {locale === "fa"
              ? "داستان موفقیت مشتریان"
              : "Client Success Stories"}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {study.client}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{study.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {study.description}
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
                  <p className="text-sm font-medium text-primary">
                    {study.improvement}
                  </p>
                </div>

                {/* Metrics */}
                <div className="mt-5 space-y-3 rounded-xl border border-border p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {locale === "fa" ? "مقایسه قبل و بعد" : "Before vs After"}
                  </p>
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-24 text-xs text-muted-foreground">
                        {metric.label}
                      </span>
                      <div className="flex-1">
                        <div className="relative h-5 w-full overflow-hidden rounded-full bg-border">
                          <div
                            className="absolute inset-y-0 left-0 rounded-full bg-muted/30"
                            style={{ width: `${metric.before}%` }}
                          />
                          <div
                            className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-700"
                            style={{ width: `${metric.after}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-muted-foreground line-through">
                          {metric.before}
                        </span>
                        <span className="text-primary font-semibold">
                          {metric.after}
                        </span>
                        <span className="text-green-600 font-medium">
                          +{metric.after - metric.before}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-border bg-card p-12 text-center md:p-16">
            <h2 className="text-3xl font-semibold tracking-tight">
              {locale === "fa"
                ? "آماده‌اید پروژه بعدی را شروع کنیم؟"
                : "Ready to Start Your Next Project?"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {locale === "fa"
                ? "با من تماس بگیرید تا درباره چگونگی بهبود وب‌سایتتان صحبت کنیم."
                : "Contact me to discuss how we can improve your website."}
            </p>
            <Link
              href={`/${locale}#contact`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {locale === "fa" ? "تماس با من" : "Contact Me"} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
