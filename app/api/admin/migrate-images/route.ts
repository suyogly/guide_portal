/**
 * POST /api/admin/migrate-images
 *
 * One-time migration: finds every base64 data-URL stored in the database,
 * uploads it to Supabase Storage, and replaces the DB value with the public
 * HTTPS URL. Rows that already contain an HTTPS URL (or are empty) are
 * skipped — so it is safe to run multiple times.
 *
 * Call from the browser (admin-authenticated session):
 *   fetch('/api/admin/migrate-images', { method: 'POST' })
 */

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ensureBucket, uploadBase64, isBase64 } from "@/lib/storage";

type MigratedEntry = { table: string; id: string; field: string };

export const runtime = "nodejs";
// Allow up to 5 minutes — large base64 payloads take time to upload
export const maxDuration = 300;

export async function POST() {
  const authErr = await requireAdmin();
  if (authErr) return authErr;

  try {
    await ensureBucket();

    const migrated: MigratedEntry[] = [];
    const skipped: MigratedEntry[] = [];
    const errors: { table: string; id: string; field: string; error: string }[] = [];

    // ── Guide: avatar + coverImage ──────────────────────────────────────────
    const guides = await prisma.guide.findMany({
      select: { id: true, avatar: true, coverImage: true },
    });

    for (const guide of guides) {
      // avatar
      if (guide.avatar && isBase64(guide.avatar)) {
        try {
          const url = await uploadBase64(
            guide.avatar,
            `migration/guides/${guide.id}-avatar.jpg`
          );
          await prisma.guide.update({ where: { id: guide.id }, data: { avatar: url } });
          migrated.push({ table: "Guide", id: guide.id, field: "avatar" });
        } catch (err) {
          errors.push({ table: "Guide", id: guide.id, field: "avatar", error: String(err) });
        }
      } else {
        skipped.push({ table: "Guide", id: guide.id, field: "avatar" });
      }

      // coverImage
      if (guide.coverImage && isBase64(guide.coverImage)) {
        try {
          const url = await uploadBase64(
            guide.coverImage,
            `migration/guides/${guide.id}-cover.jpg`
          );
          await prisma.guide.update({ where: { id: guide.id }, data: { coverImage: url } });
          migrated.push({ table: "Guide", id: guide.id, field: "coverImage" });
        } catch (err) {
          errors.push({ table: "Guide", id: guide.id, field: "coverImage", error: String(err) });
        }
      } else {
        skipped.push({ table: "Guide", id: guide.id, field: "coverImage" });
      }
    }

    // ── GuidePhoto: url ─────────────────────────────────────────────────────
    const photos = await prisma.guidePhoto.findMany({
      select: { id: true, url: true },
    });

    for (const photo of photos) {
      if (photo.url && isBase64(photo.url)) {
        try {
          const url = await uploadBase64(
            photo.url,
            `migration/guide-photos/${photo.id}.jpg`
          );
          await prisma.guidePhoto.update({ where: { id: photo.id }, data: { url } });
          migrated.push({ table: "GuidePhoto", id: photo.id, field: "url" });
        } catch (err) {
          errors.push({ table: "GuidePhoto", id: photo.id, field: "url", error: String(err) });
        }
      } else {
        skipped.push({ table: "GuidePhoto", id: photo.id, field: "url" });
      }
    }

    // ── BlogPost: coverImage ─────────────────────────────────────────────────
    const blogs = await prisma.blogPost.findMany({
      select: { id: true, coverImage: true },
    });

    for (const blog of blogs) {
      if (blog.coverImage && isBase64(blog.coverImage)) {
        try {
          const url = await uploadBase64(
            blog.coverImage,
            `migration/blogs/${blog.id}-cover.jpg`
          );
          await prisma.blogPost.update({ where: { id: blog.id }, data: { coverImage: url } });
          migrated.push({ table: "BlogPost", id: blog.id, field: "coverImage" });
        } catch (err) {
          errors.push({ table: "BlogPost", id: blog.id, field: "coverImage", error: String(err) });
        }
      } else {
        skipped.push({ table: "BlogPost", id: blog.id, field: "coverImage" });
      }
    }

    // ── TrekRoute: coverImage ────────────────────────────────────────────────
    const routes = await prisma.trekRoute.findMany({
      select: { id: true, coverImage: true },
    });

    for (const route of routes) {
      if (route.coverImage && isBase64(route.coverImage)) {
        try {
          const url = await uploadBase64(
            route.coverImage,
            `migration/routes/${route.id}-cover.jpg`
          );
          await prisma.trekRoute.update({ where: { id: route.id }, data: { coverImage: url } });
          migrated.push({ table: "TrekRoute", id: route.id, field: "coverImage" });
        } catch (err) {
          errors.push({ table: "TrekRoute", id: route.id, field: "coverImage", error: String(err) });
        }
      } else {
        skipped.push({ table: "TrekRoute", id: route.id, field: "coverImage" });
      }
    }

    // ── TrekRegion: heroImage ────────────────────────────────────────────────
    const regions = await prisma.trekRegion.findMany({
      select: { id: true, heroImage: true },
    });

    for (const region of regions) {
      if (region.heroImage && isBase64(region.heroImage)) {
        try {
          const url = await uploadBase64(
            region.heroImage,
            `migration/regions/${region.id}-hero.jpg`
          );
          await prisma.trekRegion.update({ where: { id: region.id }, data: { heroImage: url } });
          migrated.push({ table: "TrekRegion", id: region.id, field: "heroImage" });
        } catch (err) {
          errors.push({ table: "TrekRegion", id: region.id, field: "heroImage", error: String(err) });
        }
      } else {
        skipped.push({ table: "TrekRegion", id: region.id, field: "heroImage" });
      }
    }

    return NextResponse.json({
      success: errors.length === 0,
      migratedCount: migrated.length,
      skippedCount: skipped.length,
      errorCount: errors.length,
      migrated,
      errors,
    });
  } catch (err) {
    console.error("migrate-images error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
