import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SEED_GUIDES, SEED_BLOGS, SEED_REGIONS } from "@/lib/seed-data";

export async function POST(req: NextRequest) {
  // Require a secret header to prevent accidental or malicious triggers
  const secret = req.headers.get("x-seed-secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const seeded = { guides: 0, blogs: 0, regions: 0 };

    // Upsert by slug — creates on first run, skips on subsequent runs
    for (const g of SEED_GUIDES) {
      const result = await prisma.guide.upsert({
        where: { slug: g.slug },
        create: g,
        update: {},
      });
      if (result) seeded.guides++;
    }

    for (const b of SEED_BLOGS) {
      await prisma.blogPost.upsert({
        where: { slug: b.slug },
        create: b,
        update: {},
      });
      seeded.blogs++;
    }

    for (const r of SEED_REGIONS) {
      await prisma.trekRegion.upsert({
        where: { slug: r.slug },
        create: r,
        update: {},
      });
      seeded.regions++;
    }

    return NextResponse.json({ message: "Seed complete", seeded });
  } catch (err) {
    console.error("POST /api/seed error:", err);
    return NextResponse.json({ error: "Seed failed", detail: String(err) }, { status: 500 });
  }
}
