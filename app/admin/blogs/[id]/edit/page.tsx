import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { blogToApi } from "@/app/api/_lib/transforms";
import BlogForm from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await prisma.blogPost.findUnique({ where: { id } });
  if (!blog) notFound();

  return <BlogForm blogId={id} initialData={blogToApi(blog)} />;
}
