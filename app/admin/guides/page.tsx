import { prisma } from "@/lib/prisma";
import { guideToApi, type FullGuide } from "@/app/api/_lib/transforms";
import { guidePrismaInclude } from "@/lib/db";
import GuidesClient from "./_components/GuidesClient";

export const dynamic = "force-dynamic";

export default async function GuidesPage() {
  const guides = await prisma.guide.findMany({
    include: guidePrismaInclude,
    orderBy: { createdAt: "desc" },
  });
  return <GuidesClient initialGuides={guides.map((g) => guideToApi(g as FullGuide))} />;
}
