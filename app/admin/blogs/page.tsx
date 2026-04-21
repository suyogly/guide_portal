import { prisma } from "@/lib/prisma";
import { blogToApi } from "@/app/api/_lib/transforms";
import BlogsClient from "./_components/BlogsClient";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return <BlogsClient initialBlogs={blogs.map(blogToApi)} />;
}
