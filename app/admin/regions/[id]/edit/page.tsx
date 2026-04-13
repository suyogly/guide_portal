"use client";
import { use } from "react";
import RegionForm from "@/components/admin/RegionForm";

export default function EditRegionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <RegionForm regionId={id} />;
}
