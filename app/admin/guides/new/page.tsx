import { prisma } from "@/lib/prisma";
import GuideForm from "@/components/admin/GuideForm";

export const dynamic = "force-dynamic";

export default async function NewGuidePage() {
  const catalogRoutesRaw = await prisma.trekRoute.findMany({
    orderBy: [{ region: { title: "asc" } }, { title: "asc" }],
    select: { id: true, slug: true, title: true, region: { select: { title: true } } },
  });

  const catalogRoutes = catalogRoutesRaw.map((rt) => ({
    id: rt.id,
    slug: rt.slug,
    title: rt.title,
    regionTitle: rt.region?.title ?? "",
  }));

  return <GuideForm initialCatalogRoutes={catalogRoutes} />;
}
