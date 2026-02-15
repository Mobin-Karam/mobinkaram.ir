import { notFound } from "next/navigation";
import { SectionHeading, LazySection, Skeleton } from "@/components/ui/primitives";
import { BlogList } from "@/components/blog/blog-list";
import { getPostIndex, filterByCategory, type BlogCategory } from "@/lib/blog";
import type { Locale } from "@/i18n/config";

export const revalidate = 1800;
export const dynamicParams = false;

const categories: { id: BlogCategory; title: string; description: string }[] = [
  { id: "engineering", title: "Engineering", description: "Systems, product, and delivery." },
  { id: "islam", title: "Islam", description: "Faith, practice, and reflections." },
];

export function generateStaticParams() {
  const locales: Locale[] = ["en", "fa"];
  return locales.flatMap((locale) =>
    categories.map((c) => ({
      locale,
      category: c.id,
    })),
  );
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: BlogCategory }>;
}) {
  const { locale, category } = await params;
  const config = categories.find((c) => c.id === category);
  if (!config) notFound();

  const posts = await getPostIndex(locale as "en" | "fa");
  const filtered = filterByCategory(posts, category);

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Blog" title={config.title} description={config.description} />
      <LazySection minHeight={260} skeleton={<Skeleton className="h-64" />}>
        <BlogList posts={filtered} tags={[]} locale={locale} category={category} />
      </LazySection>
    </div>
  );
}
