import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { guidePrismaInclude } from "@/lib/db";
import { guideToApi, type FullGuide } from "@/app/api/_lib/transforms";
import GuideForm from "@/components/admin/GuideForm";

export const dynamic = "force-dynamic";

export default async function EditGuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [guide, catalogRoutesRaw] = await Promise.all([
    prisma.guide.findUnique({ where: { id }, include: guidePrismaInclude }),
    prisma.trekRoute.findMany({
      orderBy: [{ region: { title: "asc" } }, { title: "asc" }],
      select: { id: true, slug: true, title: true, region: { select: { title: true } } },
    }),
  ]);

  if (!guide) notFound();

  const catalogRoutes = catalogRoutesRaw.map((rt) => ({
    id: rt.id,
    slug: rt.slug,
    title: rt.title,
    regionTitle: rt.region?.title ?? "",
  }));

  return (
    <GuideForm
      guideId={id}
      initialData={guideToApi(guide as FullGuide)}
      initialCatalogRoutes={catalogRoutes}
    />
  );
}
