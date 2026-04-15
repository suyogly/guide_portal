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

const guideInclude = {
  languages: true,
  photos: { orderBy: { order: "asc" as const } },
  unavailableDates: { orderBy: { date: "asc" as const } },
} as const;

// ─── Full guide type with relations ───────────────────────────────────────────

type FullDBGuide = DBGuide & {
  languages: GuideLanguage[];
  photos: GuidePhoto[];
  unavailableDates: GuideUnavailableDate[];
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

function dbGuideToPublic(g: FullDBGuide): Guide {
  return {
    slug: g.slug,
    name: g.name,
    image: g.coverImage ?? g.avatar ?? "",
    avatar: g.avatar ?? "",
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
    ratePerDay: Number(g.ratePerDay),
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
    include: guideInclude,
    orderBy: { createdAt: "desc" },
  });
  return guides.map((g) => dbGuideToPublic(g as FullDBGuide));
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const guide = await prisma.guide.findUnique({
    where: { slug },
    include: guideInclude,
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
