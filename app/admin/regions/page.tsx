import { prisma } from "@/lib/prisma";
import { regionToApi, type FullRegion } from "@/app/api/_lib/transforms";
import RegionsClient from "./_components/RegionsClient";

export const dynamic = "force-dynamic";

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

export default async function RegionsPage() {
  const regions = await prisma.trekRegion.findMany({
    include: regionInclude,
    orderBy: { createdAt: "asc" },
  });
  return <RegionsClient initialRegions={regions.map((r) => regionToApi(r as FullRegion))} />;
}
