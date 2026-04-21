import { prisma } from "@/lib/prisma";
import type { AdminGuideListItem } from "@/lib/admin-store";
import GuidesClient from "./_components/GuidesClient";

export const dynamic = "force-dynamic";

export default async function GuidesPage() {
  const rows = await prisma.guide.findMany({
    select: {
      id: true,
      avatar: true,
      name: true,
      specialty: true,
      region: true,
      ratePerDay: true,
      rating: true,
      experience: true,
      experienceYears: true,
      availabilityStatus: true,
      isVerified: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const guides: AdminGuideListItem[] = rows.map((g) => ({
    id: g.id,
    name: g.name,
    image: g.avatar ?? "",
    specialty: g.specialty ?? "",
    region: g.region ?? "",
    ratePerDay: Number(g.ratePerDay),
    rating: g.rating ? Number(g.rating) : 0,
    experience: g.experience ?? `${g.experienceYears} Years`,
    availabilityStatus: g.availabilityStatus as AdminGuideListItem["availabilityStatus"],
    isVerified: g.isVerified,
  }));

  return <GuidesClient initialGuides={guides} />;
}
