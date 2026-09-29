import { NextResponse } from "next/server";

import { revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { BLOG_CONTENT_TAG } from "@/lib/blog/config";
import { deleteBlogPost, writeBlogPost, type BlogWriteInput } from "@/lib/blog/github";
import { getAllPosts, getPostByPath } from "@/lib/blog/content";

export async function GET(request: Request) {
  await requireAdmin();
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale");
  const path = url.searchParams.get("path");
  if ((locale !== "en" && locale !== "fa") || !path) return NextResponse.json({ error: "Invalid post identifier." }, { status: 400 });
  const post = (await getAllPosts(locale, { includeDrafts: true })).find((item) => item.path === path);
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json(await getPostByPath(post));
}

function isWriteInput(value: unknown): value is BlogWriteInput {
  if (!value || typeof value !== "object") return false;
  const input = value as Record<string, unknown>;
  return ["title", "slug", "description", "category", "content"].every((key) => typeof input[key] === "string")
    && (input.locale === "en" || input.locale === "fa")
    && Array.isArray(input.tags) && input.tags.every((tag) => typeof tag === "string")
    && (input.cover === undefined || typeof input.cover === "string")
    && typeof input.published === "boolean";
}

export async function POST(request: Request) {
  await requireAdmin();
  const input: unknown = await request.json();
  if (!isWriteInput(input)) return NextResponse.json({ error: "Invalid blog post payload." }, { status: 400 });
  try {
    const result = await writeBlogPost(input);
    revalidateTag(BLOG_CONTENT_TAG, "max");
    return NextResponse.json(result, { status: result.created ? 201 : 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to publish post." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  await requireAdmin();
  const input: unknown = await request.json();
  if (!input || typeof input !== "object") return NextResponse.json({ error: "Invalid post identifier." }, { status: 400 });
  const { locale, category, slug } = input as Record<string, unknown>;
  if ((locale !== "en" && locale !== "fa") || typeof category !== "string" || typeof slug !== "string") {
    return NextResponse.json({ error: "Invalid post identifier." }, { status: 400 });
  }
  try {
    await deleteBlogPost(locale, category, slug);
    revalidateTag(BLOG_CONTENT_TAG, "max");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete post." }, { status: 500 });
  }
}
