import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { ensureBucket, uploadBuffer } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string | null) ?? "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    await ensureBucket();

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const path = `${folder}/${safeName}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadBuffer(buffer, path, file.type || "image/jpeg");

    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
