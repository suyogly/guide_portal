import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/** Admin-only catalog for assigning per-route guide rates. */
export async function GET() {
  const authErr = await requireAdmin();
  if (authErr) return authErr;
  try {
    const routes = await prisma.trekRoute.findMany({
      orderBy: [{ region: { title: "asc" } }, { title: "asc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        region: { select: { title: true } },
      },
    });
    return NextResponse.json({ routes });
  } catch (err) {
    console.error("GET /api/trek-routes error:", err);
    return NextResponse.json({ error: "Failed to fetch routes" }, { status: 500 });
  }
}
