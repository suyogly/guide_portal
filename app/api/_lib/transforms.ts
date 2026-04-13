/**
 * Shared transformers between Prisma records and API response shapes.
 * Matches the AdminGuide / AdminBlog / AdminRegion / AdminRoute types
 * used by the admin-panel components.
 */
import type {
  Guide,
  GuideLanguage,
  GuidePhoto,
  GuideUnavailableDate,
  BlogPost,
  TrekRegion,
  TrekRoute,
  ItineraryDay,
  RegionFaq,
  RouteFaq,
} from "@/lib/generated/prisma/client";

export type FullGuide = Guide & {
  languages: GuideLanguage[];
  photos: GuidePhoto[];
  unavailableDates: GuideUnavailableDate[];
};

export type FullRegion = TrekRegion & {
  faqs: RegionFaq[];
  routes: FullRoute[];
};

export type FullRoute = TrekRoute & {
  faqs: RouteFaq[];
  itinerary: ItineraryDay[];
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function toISODate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// ── Guide ──────────────────────────────────────────────────────────────────────

export function guideToApi(g: FullGuide) {
  return {
    id: g.id,
    slug: g.slug,
    name: g.name,
    specialty: g.specialty ?? "",
    quote: g.quote ?? "",
    description: g.description ?? "",
    image: g.avatar ?? "",
    coverImage: g.coverImage ?? "",
    experienceYears: g.experienceYears,
    experience: g.experience ?? `${g.experienceYears} Years`,
    licenseNumber: g.licenseNumber ?? "",
    kycVerified: g.isVerified,
    isVerified: g.isVerified,
    ratePerDay: Number(g.ratePerDay),
    rating: g.rating ? Number(g.rating) : 0,
    gender: g.gender as "MALE" | "FEMALE",
    region: g.region ?? "",
    availabilityStatus: g.availabilityStatus as
      | "AVAILABLE"
      | "UNAVAILABLE"
      | "AVAILABLE_SOON",
    availableFromDate: g.availableFromDate ? toISODate(g.availableFromDate) : "",
    unavailableDates: g.unavailableDates.map((d: GuideUnavailableDate) =>
      toISODate(d.date)
    ),
    languages: g.languages.map((l: GuideLanguage) => ({
      id: l.id,
      language: l.language,
      proficiency: l.proficiency as "NATIVE" | "FLUENT" | "BASIC",
    })),
    tags: g.tags.join(","),
    specializedRoutes: g.specializedRoutes.join(","),
    photos: g.photos
      .sort((a: GuidePhoto, b: GuidePhoto) => a.order - b.order)
      .map((p: GuidePhoto) => p.url),
    fluency: g.fluency ?? "",
    createdAt: g.createdAt.toISOString(),
  };
}

// ── Blog ───────────────────────────────────────────────────────────────────────

export function blogToApi(b: BlogPost) {
  return {
    id: b.id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt ?? "",
    content: b.content,
    category: b.category as
      | "TREKKING_TIPS"
      | "CULTURE"
      | "SOLO_TRAVEL"
      | "GEAR_GUIDE",
    authorName: b.authorName ?? "",
    coverImage: b.coverImage ?? "",
    publishedAt: b.publishedAt
      ? b.publishedAt.toISOString().split("T")[0]
      : "",
    createdAt: b.createdAt.toISOString(),
  };
}

// ── Route ─────────────────────────────────────────────────────────────────────

export function routeToApi(r: FullRoute) {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description ?? "",
    body: r.body ?? "",
    coverImage: r.coverImage ?? "",
    difficulty: r.difficulty as "EASY" | "MODERATE" | "DIFFICULT" | "STRENUOUS",
    maxAltitudeM: r.maxAltitudeM ?? 0,
    durationDays: r.durationDays ?? 0,
    bestSeason: r.bestSeason ?? "",
    authorName: r.authorName ?? "",
    publishedAt: r.publishedAt
      ? r.publishedAt.toISOString().split("T")[0]
      : "",
    faqs: r.faqs.map((f: RouteFaq) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
    })),
    itinerary: r.itinerary
      .sort((a: ItineraryDay, b: ItineraryDay) => a.dayNumber - b.dayNumber)
      .map((d: ItineraryDay) => ({
        id: d.id,
        dayNumber: d.dayNumber,
        title: d.title,
        description: d.description,
        distanceKm: d.distanceKm ? String(d.distanceKm) : "",
        elevationGainM: d.elevationGainM ? String(d.elevationGainM) : "",
        estimatedTime: d.estimatedTime ?? "",
        altitudeM: d.altitudeM ? String(d.altitudeM) : "",
        isRestDay: d.isRestDay,
        guideTip: d.guideTip ?? "",
        flexNote: d.flexNote ?? "",
      })),
  };
}

// ── Region ────────────────────────────────────────────────────────────────────

export function regionToApi(r: FullRegion) {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description ?? "",
    heroImage: r.heroImage ?? "",
    publishedAt: r.publishedAt
      ? r.publishedAt.toISOString().split("T")[0]
      : "",
    createdAt: r.createdAt.toISOString(),
    faqs: r.faqs.map((f: RegionFaq) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
    })),
    routes: r.routes.map(routeToApi),
  };
}
