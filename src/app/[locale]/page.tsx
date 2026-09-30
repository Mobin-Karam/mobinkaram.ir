import { setRequestLocale } from "next-intl/server";
import { HomeClient } from "@/features/home";
import { getAllPosts, isBlogLocale } from "@/lib/blog/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = isBlogLocale(locale) ? await getAllPosts(locale) : [];

  return <HomeClient posts={posts.slice(0, 3)} locale={locale} />;
}
