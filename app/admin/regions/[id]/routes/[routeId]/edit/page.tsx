"use client";
import { use } from "react";
import RouteForm from "@/components/admin/RouteForm";

export default function EditRoutePage({
  params,
}: {
  params: Promise<{ id: string; routeId: string }>;
}) {
  const { id, routeId } = use(params);
  return <RouteForm regionId={id} routeId={routeId} />;
}
