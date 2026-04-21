import { createServiceClient } from "./supabase-server";

export const BUCKET = "guide-portal-images";

/**
 * Creates the storage bucket if it doesn't already exist.
 * Safe to call before every upload — it's a no-op when bucket exists.
 */
export async function ensureBucket(): Promise<void> {
  const supabase = createServiceClient();
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 8 * 1024 * 1024, // 8 MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  });
  if (error && !error.message.toLowerCase().includes("already exists")) {
    throw new Error(`Storage bucket error: ${error.message}`);
  }
}

/**
 * Uploads a raw buffer to Supabase Storage and returns the public URL.
 */
export async function uploadBuffer(
  buffer: Buffer,
  path: string,
  contentType = "image/jpeg"
): Promise<string> {
  const supabase = createServiceClient();
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType, upsert: true });
  if (error) throw new Error(`Storage upload error: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Converts a base64 data-URL to a Buffer and uploads it.
 * Returns the public HTTPS URL.
 */
export async function uploadBase64(
  dataUrl: string,
  storagePath: string
): Promise<string> {
  const [header, b64] = dataUrl.split(",");
  const contentType = header.match(/:(.*?);/)?.[1] ?? "image/jpeg";
  const buffer = Buffer.from(b64, "base64");
  return uploadBuffer(buffer, storagePath, contentType);
}

/** Returns true if the string is a base64 data-URL (needs migration). */
export function isBase64(value: string): boolean {
  return typeof value === "string" && value.startsWith("data:");
}

/** Returns true if the string already is a remote HTTPS URL (no migration needed). */
export function isRemoteUrl(value: string): boolean {
  return typeof value === "string" && value.startsWith("https://");
}
