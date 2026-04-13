"use client";
import { use } from "react";
import GuideForm from "@/components/admin/GuideForm";

export default function EditGuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <GuideForm guideId={id} />;
}
