import { prisma } from "@/lib/prisma";
import type { AdminBlogListItem } from "@/lib/admin-store";
import BlogsClient from "./_components/BlogsClient";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const rows = await prisma.blogPost.findMany({
    select: {
      id: true,
      title: true,
      excerpt: true,
      category: true,
      authorName: true,
      coverImage: true,
      publishedAt: true,
    },
    orderBy: { publishedAt: "desc" },
  });

  const blogs: AdminBlogListItem[] = rows.map((b) => ({
    id: b.id,
    title: b.title,
    excerpt: b.excerpt ?? "",
    category: b.category as AdminBlogListItem["category"],
    authorName: b.authorName ?? "",
    coverImage: b.coverImage ?? "",
    publishedAt: b.publishedAt ? b.publishedAt.toISOString().split("T")[0] : "",
  }));

  return <BlogsClient initialBlogs={blogs} />;
}
