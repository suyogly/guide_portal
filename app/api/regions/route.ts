import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { regionToApi, type FullRegion } from "../_lib/transforms";
import { requireAdmin } from "@/lib/auth";

const regionInclude = {
  faqs: { orderBy: { order: "asc" as const } },
  routes: {
    include: {
      faqs: { orderBy: { order: "asc" as const } },
      itinerary: { orderBy: { dayNumber: "asc" as const } },
    },
    orderBy: { createdAt: "asc" as const },
  },
} as const;

export async function GET() {
  try {
    const regions = await prisma.trekRegion.findMany({
      include: regionInclude,
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(regions.map((r) => regionToApi(r as FullRegion)));
  } catch (err) {
    console.error("GET /api/regions error:", err);
    return NextResponse.json({ error: "Failed to fetch regions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authErr = requireAdmin(req);
  if (authErr) return authErr;
  try {
    const body = await req.json();
    const { slug, title, description, heroImage, publishedAt, faqs = [] } = body;

    const region = await prisma.trekRegion.create({
      data: {
        slug,
        title,
        description: description || "",
        heroImage: heroImage || "",
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        faqs: {
          create: faqs.map(
            (f: { question: string; answer: string }, i: number) => ({
              question: f.question,
              answer: f.answer,
              order: i,
            })
          ),
        },
      },
      include: regionInclude,
    });

    return NextResponse.json(regionToApi(region as FullRegion), { status: 201 });
  } catch (err) {
    console.error("POST /api/regions error:", err);
    return NextResponse.json({ error: "Failed to create region" }, { status: 500 });
  }
}
