import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/i18n/config";
import { SectionBackLink } from "@/components/ui/section-back-link";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const story = [
    "I started with small e-commerce sites at 17 and realized I care most about systems, not brochure pages.",
    "At Koonj I'm focused on small communities—a mix of product, culture, and infrastructure.",
    "This site is my public notebook to show how I think and build.",
  ];

  const philosophy = [
    "Rapid experiments + clear measurement beat perfect ideas.",
    "A shared web/native design system doubles team speed.",
    "Observability belongs in Sprint 0, not after launch.",
  ];

  const problems = [
    "Payments and trust for small communities",
    "Resilient realtime infra on low-connectivity networks",
    "Blending community + content + payments without vendor lock-in",
  ];

  return (
    <div className="space-y-6">
      <SectionBackLink href={`/${locale}/profile`} label="Back to profile" />
      <div className="flex items-center justify-between gap-3">
        <SectionHeading
          eyebrow="About"
          title="How I got here"
          description="Founder version, not a biography."
        />
      </div>

      <div className="card p-5 space-y-4">
        <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
          Path
        </h3>
        <ul className="space-y-2 text-sm text-[color:var(--muted)]">
          {story.map((line) => (
            <li key={line}>• {line}</li>
          ))}
        </ul>
      </div>

      <div className="card p-5 space-y-4">
        <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
          Building philosophy
        </h3>
        <ul className="space-y-2 text-sm text-[color:var(--muted)]">
          {philosophy.map((line) => (
            <li key={line}>• {line}</li>
          ))}
        </ul>
      </div>

      <div className="card p-5 space-y-4">
        <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
          Problems I want to solve
        </h3>
        <ul className="space-y-2 text-sm text-[color:var(--muted)]">
          {problems.map((line) => (
            <li key={line}>• {line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
