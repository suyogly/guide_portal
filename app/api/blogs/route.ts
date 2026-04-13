import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { blogToApi } from "../_lib/transforms";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(blogs.map(blogToApi));
  } catch (err) {
    console.error("GET /api/blogs error:", err);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authErr = requireAdmin(req);
  if (authErr) return authErr;
  try {
    const body = await req.json();
    const { slug, title, excerpt, content, category, authorName, coverImage, publishedAt } = body;

    const blog = await prisma.blogPost.create({
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

    return NextResponse.json(blogToApi(blog), { status: 201 });
  } catch (err) {
    console.error("POST /api/blogs error:", err);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
