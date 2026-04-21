import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { regionToApi, type FullRegion } from "../../_lib/transforms";
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

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const region = await prisma.trekRegion.findUnique({
      where: { id },
      include: regionInclude,
    });
    if (!region) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(regionToApi(region as FullRegion));
  } catch (err) {
    console.error("GET /api/regions/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch region" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const body = await req.json();
    const { slug, title, description, heroImage, publishedAt, faqs = [] } = body;

    await prisma.regionFaq.deleteMany({ where: { regionId: id } });

    const region = await prisma.trekRegion.update({
      where: { id },
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

    return NextResponse.json(regionToApi(region as FullRegion));
  } catch (err) {
    console.error("PUT /api/regions/[id] error:", err);
    return NextResponse.json({ error: "Failed to update region" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;
  const { id } = await params;
  try {
    await prisma.trekRegion.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/regions/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete region" }, { status: 500 });
  }
}
