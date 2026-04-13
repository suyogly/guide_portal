import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guideToApi, type FullGuide } from "../_lib/transforms";
import { requireAdmin } from "@/lib/auth";

const guideInclude = {
  languages: true,
  photos: { orderBy: { order: "asc" as const } },
  unavailableDates: { orderBy: { date: "asc" as const } },
} as const;

export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      include: guideInclude,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(guides.map((g) => guideToApi(g as FullGuide)));
  } catch (err) {
    console.error("GET /api/guides error:", err);
    return NextResponse.json({ error: "Failed to fetch guides" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authErr = requireAdmin(req);
  if (authErr) return authErr;
  try {
    const body = await req.json();
    const {
      name, slug, specialty, quote, description, image, coverImage,
      experienceYears, experience, licenseNumber, kycVerified, isVerified,
      ratePerDay, rating, gender, region, availabilityStatus, availableFromDate,
      unavailableDates = [], languages = [], tags = "", specializedRoutes = "",
      photos = [], fluency,
    } = body;

    const guide = await prisma.guide.create({
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
        ratePerDay: Number(ratePerDay) || 0,
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
      },
      include: guideInclude,
    });

    return NextResponse.json(guideToApi(guide as FullGuide), { status: 201 });
  } catch (err) {
    console.error("POST /api/guides error:", err);
    return NextResponse.json({ error: "Failed to create guide" }, { status: 500 });
  }
}
