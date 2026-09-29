import { AdminBlogManager } from "@/features/blog/components/admin-blog-manager";
import { getSession } from "@/lib/auth";
import { getAllPosts } from "@/lib/blog/content";
import { redirect } from "next/navigation";

export default async function AdminBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(await getSession())) {
    redirect(`/${locale}/login?callbackUrl=/${locale}/admin/blog`);
  }
  const [fa, en] = await Promise.all([
    getAllPosts("fa", { includeDrafts: true }),
    getAllPosts("en", { includeDrafts: true }),
  ]);
  return <AdminBlogManager posts={[...fa, ...en]} />;
}
