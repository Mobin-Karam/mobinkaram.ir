import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProductClient from "./ProductClient";
import { getProductBySlug } from "@/lib/getProductBySlug";

/* ---------------- SEO DYNAMIC META ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const result = getProductBySlug(params.slug);

  if (!result || !result.product) {
    return {
      title: "خدمت پیدا نشد",
      description: "این خدمت در سیستم ما وجود ندارد.",
    };
  }

  const product = result.product;

  return {
    title: `${product.title} | خدمات فروش آنلاین`,
    description: product.description,

    keywords: [
      "فروش آنلاین",
      "راه‌اندازی فروشگاه",
      "اینستاگرام",
      product.title,
      product.code,
    ],

    openGraph: {
      title: product.title,
      description: product.tagline,
      type: "article",
      locale: "fa_IR",
    },

    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.tagline,
    },
  };
}

/* ---------------- PAGE ---------------- */
export default function ProductPage({ params }: { params: { slug: string } }) {
  const result = getProductBySlug(params.slug);

  if (!result || !result.product) return notFound();

  return (
    <ProductClient
      product={result.product}
      suggestion={result.suggestion}
      status={result.status}
    />
  );
}
