import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { routeToApi, type FullRoute } from "../../../../_lib/transforms";
import { requireAdmin } from "@/lib/auth";

const routeInclude = {
  faqs: { orderBy: { order: "asc" as const } },
  itinerary: { orderBy: { dayNumber: "asc" as const } },
} as const;

interface Ctx {
  params: Promise<{ id: string; routeId: string }>;
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { routeId } = await params;
  try {
    const route = await prisma.trekRoute.findUnique({
      where: { id: routeId },
      include: routeInclude,
    });
    if (!route) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(routeToApi(route as FullRoute));
  } catch (err) {
    console.error("GET /api/regions/[id]/routes/[routeId] error:", err);
    return NextResponse.json({ error: "Failed to fetch route" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const authErr = requireAdmin(req);
  if (authErr) return authErr;
  const { routeId } = await params;
  try {
    const body = await req.json();
    const {
      slug, title, description, body: routeBody, coverImage,
      difficulty, maxAltitudeM, durationDays, bestSeason, authorName,
      publishedAt, faqs = [], itinerary = [],
    } = body;

    await prisma.$transaction([
      prisma.routeFaq.deleteMany({ where: { routeId } }),
      prisma.itineraryDay.deleteMany({ where: { routeId } }),
    ]);

    const route = await prisma.trekRoute.update({
      where: { id: routeId },
      data: {
        slug,
        title,
        description: description || "",
        body: routeBody || "",
        coverImage: coverImage || "",
        difficulty,
        maxAltitudeM: maxAltitudeM ? Number(maxAltitudeM) : null,
        durationDays: durationDays ? Number(durationDays) : null,
        bestSeason: bestSeason || "",
        authorName: authorName || "",
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
        itinerary: {
          create: itinerary.map(
            (d: {
              dayNumber: number; title: string; description: string;
              distanceKm: string; elevationGainM: string; estimatedTime: string;
              altitudeM: string; isRestDay: boolean; guideTip: string; flexNote: string;
            }) => ({
              dayNumber: Number(d.dayNumber),
              title: d.title,
              description: d.description,
              distanceKm: d.distanceKm ? parseFloat(d.distanceKm) : null,
              elevationGainM: d.elevationGainM ? parseInt(d.elevationGainM) : null,
              estimatedTime: d.estimatedTime || null,
              altitudeM: d.altitudeM ? parseInt(d.altitudeM) : null,
              isRestDay: Boolean(d.isRestDay),
              guideTip: d.guideTip || null,
              flexNote: d.flexNote || null,
            })
          ),
        },
      },
      include: routeInclude,
    });

    return NextResponse.json(routeToApi(route as FullRoute));
  } catch (err) {
    console.error("PUT /api/regions/[id]/routes/[routeId] error:", err);
    return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const authErr = requireAdmin(req);
  if (authErr) return authErr;
  const { routeId } = await params;
  try {
    await prisma.trekRoute.delete({ where: { id: routeId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/regions/[id]/routes/[routeId] error:", err);
    return NextResponse.json({ error: "Failed to delete route" }, { status: 500 });
  }
}
