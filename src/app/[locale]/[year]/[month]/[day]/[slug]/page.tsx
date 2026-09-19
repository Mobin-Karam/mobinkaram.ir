import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogArticle from "@/features/blog/components/BlogArticle";
import {
  findTranslation,
  getAdjacentPosts,
  getAllPosts,
  getDefaultAuthor,
  getPostByPath,
  getRelatedPosts,
  isBlogLocale,
} from "@/lib/blog/content";
import { normalizeDateSegment } from "@/lib/blog/date";
import { BlogLocale } from "@/types/blog";

type Params = {
  locale: string;
  year: string;
  month: string;
  day: string;
  slug: string;
};

export async function generateStaticParams() {
  const locales = ["en", "fa"] as const;

  const all = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      posts: await getAllPosts(locale),
    })),
  );

  return all.flatMap(({ locale, posts }) =>
    posts.map((post) => ({
      locale,
      year: post.dateParts.year,
      month: post.dateParts.month,
      day: post.dateParts.day,
      slug: encodeURIComponent(post.routeSlug),
    })),
  );
}


export async function findPostByRoute(
  locale: BlogLocale,
  year: string,
  month: string,
  day: string,
  slug: string,
) {
  const posts = await getAllPosts(locale);

  const normalizedMonth =
    normalizeDateSegment(month);

  const normalizedDay =
    normalizeDateSegment(day);


  const decodedSlug =
    normalizeSlug(
      decodeURIComponent(slug),
    );


  const meta = posts.find(
    (post) => {
      const postSlug =
        normalizeSlug(
          post.routeSlug,
        );


      return (
        post.dateParts.year === year &&
        post.dateParts.month === normalizedMonth &&
        post.dateParts.day === normalizedDay &&
        (
          postSlug === decodedSlug ||
          normalizeSlug(
            post.title,
          ) === decodedSlug
        )
      );
    },
  );


  return meta
    ? getPostByPath(meta)
    : null;
}



function normalizeSlug(
  value: string,
) {
  return value
    .normalize("NFKC")

    // Persian / Arabic letters
    .replace(/ي/g, "ی")
    .replace(/ى/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ۀ/g, "ه")
    .replace(/ة/g, "ه")

    // remove URL artifacts
    .replace(/\+/g, "-")

    // spaces and symbols
    .replace(/[^\p{L}\p{N}]+/gu, "-")

    // duplicate dashes
    .replace(/-+/g, "-")

    // remove start/end dash
    .replace(/^-|-$/g, "")

    .toLowerCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const route = await params;
  if (!isBlogLocale(route.locale)) return {};
  const post = await findPostByRoute(
    route.locale,
    route.year,
    route.month,
    route.day,
    route.slug,
  );
  if (!post) return {};

  const otherLocale = route.locale === "fa" ? "en" : "fa";
  const translation = await findTranslation(post, otherLocale);

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: post.href,
      languages: {
        [route.locale]: post.href,
        ...(translation ? { [otherLocale]: translation.href } : {}),
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      tags: post.tags,
      url: post.href,
      images: post.coverUrl ? [{ url: post.coverUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const route = await params;
  if (!isBlogLocale(route.locale)) return notFound();
  const locale = route.locale;

  const post = await findPostByRoute(
    locale,
    route.year,
    route.month,
    route.day,
    route.slug,
  );
  if (!post) notFound();

  const otherLocale = locale === "fa" ? "en" : "fa";
  const [translation, related, adjacent, author] = await Promise.all([
    findTranslation(post, otherLocale),
    getRelatedPosts(post),
    getAdjacentPosts(post),
    getDefaultAuthor().catch(() => undefined),
  ]);

  return (
    <BlogArticle
      post={post}
      locale={locale}
      author={author}
      translation={translation}
      related={related}
      newer={adjacent.newer}
      older={adjacent.older}
    />
  );
}
