import { notFound } from "next/navigation";
import { SectionHeading, LazySection, Skeleton } from "@/components/ui/primitives";
import { BlogList } from "@/components/blog/blog-list";
import { getPostIndex, filterByCategory } from "@/lib/blog";
import { getCategories } from "@/lib/categories";
import type { Locale } from "@/i18n/config";
import { SectionBackLink } from "@/components/ui/section-back-link";

export const revalidate = 1800;
export const dynamicParams = false;

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "fa"];
  // Fetch categories at build time; if unreachable, fall back to two defaults.
  let categories: { slug: string }[] = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [{ slug: "engineering" }, { slug: "islam" }];
  }
  return locales.flatMap((locale) =>
    categories.map((c) => ({
      locale,
      category: c.slug,
    })),
  );
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}) {
  const { locale, category } = await params;
  const categories = await getCategories();
  const config = categories.find((c) => c.slug === category);
  if (!config) return notFound();

  const posts = await getPostIndex(locale as "en" | "fa");
  const filtered = filterByCategory(posts, category);

  return (
    <div className="space-y-6">
      <SectionBackLink href={`/${locale}/blog`} label="Back to blog" />
      <SectionHeading
        eyebrow="Blog"
        title={config.title?.[locale] ?? config.title?.en ?? config.slug}
        description={config.description?.[locale] ?? config.description?.en ?? ""}
      />
      <LazySection minHeight={260} skeleton={<Skeleton className="h-64" />}>
        <BlogList posts={filtered} tags={[]} locale={locale} category={category} />
      </LazySection>
    </div>
  );
}
