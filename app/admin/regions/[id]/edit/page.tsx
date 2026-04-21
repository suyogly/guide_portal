import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RegionForm from "@/components/admin/RegionForm";

export const dynamic = "force-dynamic";

export default async function EditRegionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const region = await prisma.trekRegion.findUnique({
    where: { id },
    include: { faqs: { orderBy: { order: "asc" } } },
  });
  if (!region) notFound();

  return (
    <RegionForm
      regionId={id}
      initialData={{
        title: region.title,
        slug: region.slug,
        description: region.description ?? "",
        heroImage: region.heroImage ?? "",
        publishedAt: region.publishedAt ? region.publishedAt.toISOString().split("T")[0] : "",
        faqs: region.faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer })),
      }}
    />
  );
}
