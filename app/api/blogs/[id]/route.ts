import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { blogToApi } from "../../_lib/transforms";
import { requireAdmin } from "@/lib/auth";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const blog = await prisma.blogPost.findUnique({ where: { id } });
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blogToApi(blog));
  } catch (err) {
    console.error("GET /api/blogs/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const body = await req.json();
    const { slug, title, excerpt, content, category, authorName, coverImage, publishedAt } = body;

    const blog = await prisma.blogPost.update({
      where: { id },
      data: {
        slug,
        title,
        excerpt: excerpt || "",
        content: content || "",
        category,
        authorName: authorName || "",
        coverImage: coverImage || "",
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    });

    return NextResponse.json(blogToApi(blog));
  } catch (err) {
    console.error("PUT /api/blogs/[id] error:", err);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;
  const { id } = await params;
  try {
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/blogs/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
