/**
 * Server-side data-access helpers.
 * These functions import Prisma directly and must only run on the server.
 * Do NOT import this file from client components.
 */
import { prisma } from "./prisma";
import type {
  Guide as DBGuide,
  GuideLanguage,
  GuidePhoto,
  GuideUnavailableDate,
  BlogPost as DBBlog,
} from "@prisma/client";
import type { Guide } from "./guides";
import type { BlogPost } from "@/app/blog/data";

// ─── Internal Prisma include shapes ───────────────────────────────────────────

/** Shared include for Guide reads/writes that need admin + public parity. */
export const guidePrismaInclude = {
  languages: true,
  photos: { orderBy: { order: "asc" as const } },
  unavailableDates: { orderBy: { date: "asc" as const } },
  routeRates: {
    include: {
      trekRoute: {
        select: { id: true, slug: true, title: true, region: { select: { title: true } } },
      },
    },
  },
} as const;

// ─── Full guide type with relations ───────────────────────────────────────────

type GuideRouteRateRow = {
  id: string;
  guideId: string;
  trekRouteId: string;
  ratePerDay: { toString(): string } | number;
  trekRoute: { id: string; slug: string; title: string; region: { title: string } };
};

type FullDBGuide = DBGuide & {
  languages: GuideLanguage[];
  photos: GuidePhoto[];
  unavailableDates: GuideUnavailableDate[];
  routeRates: GuideRouteRateRow[];
};

// ─── Transformers ─────────────────────────────────────────────────────────────

function toISODate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function genderLabel(g: string): Guide["gender"] {
  return g === "FEMALE" ? "Female Guide" : "Male Guide";
}

function proficiencyLabel(p: string): "Native" | "Fluent" | "Basic" {
  if (p === "NATIVE") return "Native";
  if (p === "BASIC") return "Basic";
  return "Fluent";
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Wide hero / listing banner when no dedicated cover is uploaded (never use avatar here). */
const DEFAULT_GUIDE_COVER_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop";

/** Profile / card face when no avatar is set. */
const DEFAULT_GUIDE_AVATAR_IMAGE =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop&facepad=2";

function resolveGuideHeroCover(g: FullDBGuide): string {
  const cover = g.coverImage?.trim();
  if (cover) return cover;
  return DEFAULT_GUIDE_COVER_IMAGE;
}

function resolveGuideAvatarImage(g: FullDBGuide): string {
  const avatar = g.avatar?.trim();
  if (avatar) return avatar;
  const firstPhoto = g.photos[0]?.url?.trim();
  if (firstPhoto) return firstPhoto;
  return DEFAULT_GUIDE_AVATAR_IMAGE;
}

function dbGuideToPublic(g: FullDBGuide): Guide {
  const routeRates = (g.routeRates ?? []).map((rr: GuideRouteRateRow) => ({
    slug: rr.trekRoute.slug,
    title: rr.trekRoute.title,
    regionTitle: rr.trekRoute.region.title,
    ratePerDay: Number(rr.ratePerDay),
  }));
  const routeDayRates = routeRates.map((r) => r.ratePerDay);
  const listingRate =
    routeDayRates.length > 0 ? Math.min(...routeDayRates) : Number(g.ratePerDay);

  return {
    slug: g.slug,
    name: g.name,
    coverImage: resolveGuideHeroCover(g),
    image: resolveGuideAvatarImage(g),
    avatar: g.avatar?.trim() || "",
    routeRates,
    ratePerDay: listingRate,
    experience: g.experience ?? `${g.experienceYears} Years`,
    experienceYears: g.experienceYears,
    specialty: g.specialty ?? "",
    quote: g.quote ?? "",
    description: g.description ?? "",
    rating: g.rating ? Number(g.rating) : 0,
    fluency: g.fluency ?? "",
    languages: g.languages.map((l: GuideLanguage) => ({
      language: l.language,
      proficiency: proficiencyLabel(l.proficiency),
    })),
    tags: g.tags,
    region: g.region ?? "",
    gender: genderLabel(g.gender),
    licenseNumber: g.licenseNumber ?? null,
    kycVerified: g.isVerified,
    photos: g.photos.map((p: GuidePhoto) => p.url),
    specializedRoutes: g.specializedRoutes,
    availabilityStatus: g.availabilityStatus as Guide["availabilityStatus"],
    availableFromDate: g.availableFromDate ? toISODate(g.availableFromDate) : null,
    unavailableDates: g.unavailableDates.map((d: GuideUnavailableDate) =>
      toISODate(d.date)
    ),
  };
}

// Category enum → display string
export const CATEGORY_LABEL: Record<string, BlogPost["category"]> = {
  TREKKING_TIPS: "Trekking Tips",
  CULTURE: "Culture",
  SOLO_TRAVEL: "Solo Travel",
  GEAR_GUIDE: "Gear Guide",
};

function dbBlogToPublic(b: DBBlog): BlogPost {
  return {
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt ?? "",
    category:
      (CATEGORY_LABEL[b.category] as BlogPost["category"]) ?? "Trekking Tips",
    date: b.publishedAt ? formatDate(b.publishedAt) : "",
    author: b.authorName ?? "",
    image: b.coverImage ?? "",
    content: b.content,
  };
}

// ─── Public guide queries ──────────────────────────────────────────────────────

export async function getAllGuides(): Promise<Guide[]> {
  const guides = await prisma.guide.findMany({
    include: guidePrismaInclude,
    orderBy: { createdAt: "desc" },
  });
  return guides.map((g) => dbGuideToPublic(g as FullDBGuide));
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const guide = await prisma.guide.findUnique({
    where: { slug },
    include: guidePrismaInclude,
  });
  return guide ? dbGuideToPublic(guide as FullDBGuide) : null;
}

// ─── Public blog queries ───────────────────────────────────────────────────────

export async function getAllBlogs(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return posts.map(dbBlogToPublic);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  return post ? dbBlogToPublic(post) : null;
}
