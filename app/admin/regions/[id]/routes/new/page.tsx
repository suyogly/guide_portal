"use client";
import { use } from "react";
import RouteForm from "@/components/admin/RouteForm";

export default function NewRoutePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <RouteForm regionId={id} />;
}
