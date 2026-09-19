"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  createContentFile,
  updateContentFile,
  deleteContentFile,
  togglePublishStatus,
  getContentFiles,
  getContentFile,
  generateUniqueSlug,
} from "@/lib/markdown";
import type {
  Locale,
  ContentSection,
  ActionResult,
  ContentFile,
  CreateContentInput,
  UpdateContentInput,
} from "@/lib/types";

// ─── Shared Helpers ──────────────────────────────────────────────

async function authGuard() {
  return requireAdmin();
}

function revalidate(section: ContentSection) {
  revalidatePath("/dashboard");
  revalidatePath(`/${section}`);
}

// ─── Content Actions ─────────────────────────────────────────────

export async function getListContent(
  section: ContentSection,
  locale: Locale
): Promise<ContentFile[]> {
  await authGuard();
  return getContentFiles(section, locale);
}

export async function getSingleContent(
  section: ContentSection,
  slug: string,
  locale: Locale
): Promise<ContentFile | null> {
  await authGuard();
  return getContentFile(section, slug, locale);
}

export async function createContent(
  input: CreateContentInput
): Promise<ActionResult<ContentFile>> {
  await authGuard();

  if (!input.slug) {
    input.slug = generateUniqueSlug(input.section, input.title, input.locale);
  }

  const result = createContentFile(input);
  if (result.success) {
    revalidate(input.section);
  }
  return result;
}

export async function updateContent(
  input: UpdateContentInput
): Promise<ActionResult<ContentFile>> {
  await authGuard();
  const result = updateContentFile(input);
  if (result.success) {
    revalidate(input.section);
  }
  return result;
}

export async function deleteContent(
  section: ContentSection,
  slug: string,
  locale: Locale
): Promise<ActionResult<void>> {
  await authGuard();
  const result = deleteContentFile({ section, slug, locale });
  if (result.success) {
    revalidate(section);
  }
  return result;
}

export async function togglePublished(
  section: ContentSection,
  slug: string,
  locale: Locale
): Promise<ActionResult<boolean>> {
  await authGuard();
  const result = togglePublishStatus(section, slug, locale);
  if (result.success) {
    revalidate(section);
  }
  return result;
}

export async function checkSlug(
  section: ContentSection,
  title: string,
  locale: Locale
): Promise<string> {
  await authGuard();
  return generateUniqueSlug(section, title, locale);
}
