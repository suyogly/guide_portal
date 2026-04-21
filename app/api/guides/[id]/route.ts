import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guideToApi, type FullGuide } from "../../_lib/transforms";
import { requireAdmin } from "@/lib/auth";
import { guidePrismaInclude } from "@/lib/db";

function parseRouteRates(raw: unknown): { trekRouteId: string; ratePerDay: number }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((x): x is Record<string, unknown> => Boolean(x) && typeof x === "object")
    .map((x) => ({
      trekRouteId: String(x.trekRouteId ?? "").trim(),
      ratePerDay: Number(x.ratePerDay),
    }))
    .filter(
      (x) =>
        x.trekRouteId.length > 0 &&
        Number.isFinite(x.ratePerDay) &&
        x.ratePerDay >= 0
    );
}

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const guide = await prisma.guide.findUnique({
      where: { id },
      include: guidePrismaInclude,
    });
    if (!guide) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(guideToApi(guide as FullGuide));
  } catch (err) {
    console.error("GET /api/guides/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch guide" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;
  const { id } = await params;
  try {
    const body = await req.json();
    const {
      name, slug, specialty, quote, description, image, coverImage,
      experienceYears, experience, licenseNumber, kycVerified, isVerified,
      ratePerDay, rating, gender, region, availabilityStatus, availableFromDate,
      unavailableDates = [], languages = [], tags = "", specializedRoutes = "",
      photos = [], fluency,
      routeRates: routeRatesRaw,
    } = body;

    const routeRows = parseRouteRates(routeRatesRaw);
    const baseRate = Number(ratePerDay) || 0;
    const storedDayRate =
      routeRows.length > 0
        ? Math.min(...routeRows.map((r) => r.ratePerDay))
        : baseRate;

    await prisma.$transaction([
      prisma.guideRouteRate.deleteMany({ where: { guideId: id } }),
      prisma.guideLanguage.deleteMany({ where: { guideId: id } }),
      prisma.guidePhoto.deleteMany({ where: { guideId: id } }),
      prisma.guideUnavailableDate.deleteMany({ where: { guideId: id } }),
    ]);

    const guide = await prisma.guide.update({
      where: { id },
      data: {
        slug,
        name,
        avatar: image || "",
        coverImage: coverImage || "",
        description: description || "",
        specialty: specialty || "",
        quote: quote || "",
        experienceYears: Number(experienceYears) || 0,
        experience: experience || "",
        licenseNumber: licenseNumber || "",
        ratePerDay: storedDayRate,
        rating: rating ? Number(rating) : null,
        gender,
        region: region || "",
        tags: tags ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
        specializedRoutes: specializedRoutes
          ? specializedRoutes.split(",").map((r: string) => r.trim()).filter(Boolean)
          : [],
        fluency: fluency || "",
        isVerified: Boolean(kycVerified || isVerified),
        availabilityStatus: availabilityStatus || "AVAILABLE",
        availableFromDate: availableFromDate ? new Date(availableFromDate) : null,
        languages: {
          create: languages.map((l: { language: string; proficiency: string }) => ({
            language: l.language,
            proficiency: l.proficiency,
          })),
        },
        photos: {
          create: photos.map((url: string, i: number) => ({ url, order: i })),
        },
        unavailableDates: {
          create: unavailableDates
            .filter((d: string) => d)
            .map((d: string) => ({ date: new Date(d) })),
        },
        routeRates:
          routeRows.length > 0
            ? {
                create: routeRows.map((r) => ({
                  trekRouteId: r.trekRouteId,
                  ratePerDay: r.ratePerDay,
                })),
              }
            : undefined,
      },
      include: guidePrismaInclude,
    });

    return NextResponse.json(guideToApi(guide as FullGuide));
  } catch (err) {
    console.error("PUT /api/guides/[id] error:", err);
    return NextResponse.json({ error: "Failed to update guide" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;
  const { id } = await params;
  try {
    await prisma.guide.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/guides/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete guide" }, { status: 500 });
  }
}
