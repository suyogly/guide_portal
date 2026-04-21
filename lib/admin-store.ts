// Shared types and utilities for the admin panel.
// Authentication and data persistence are now handled server-side via API routes.

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminLanguage {
  id: string;
  language: string;
  proficiency: "NATIVE" | "FLUENT" | "BASIC";
}

export interface AdminGuide {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  quote: string;
  description: string;
  image: string;
  coverImage: string;
  experienceYears: number;
  experience: string;
  licenseNumber: string;
  kycVerified: boolean;
  isVerified: boolean;
  ratePerDay: number;
  rating: number;
  gender: "MALE" | "FEMALE";
  region: string;
  availabilityStatus: "AVAILABLE" | "UNAVAILABLE" | "AVAILABLE_SOON";
  availableFromDate: string;
  unavailableDates: string[];
  languages: AdminLanguage[];
  tags: string;
  specializedRoutes: string;
  photos: string[];
  fluency: string;
  createdAt: string;
  routeRates: {
    id: string;
    trekRouteId: string;
    ratePerDay: number;
    routeTitle?: string;
    routeSlug?: string;
    regionTitle?: string;
  }[];
}

export interface AdminBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "TREKKING_TIPS" | "CULTURE" | "SOLO_TRAVEL" | "GEAR_GUIDE";
  authorName: string;
  coverImage: string;
  publishedAt: string;
  createdAt: string;
}

export interface AdminFaq {
  id: string;
  question: string;
  answer: string;
}

export interface AdminItineraryDay {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  distanceKm: string;
  elevationGainM: string;
  estimatedTime: string;
  altitudeM: string;
  isRestDay: boolean;
  guideTip: string;
  flexNote: string;
}

export interface AdminRoute {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  coverImage: string;
  difficulty: "EASY" | "MODERATE" | "DIFFICULT" | "STRENUOUS";
  maxAltitudeM: number;
  durationDays: number;
  bestSeason: string;
  authorName: string;
  publishedAt: string;
  faqs: AdminFaq[];
  itinerary: AdminItineraryDay[];
}

export interface AdminRegion {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  publishedAt: string;
  createdAt: string;
  faqs: AdminFaq[];
  routes: AdminRoute[];
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export function genId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function computeAvailability(dates: string[]): {
  status: "AVAILABLE" | "UNAVAILABLE" | "AVAILABLE_SOON";
  availableFromDate: string;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  if (!dates.includes(todayStr)) {
    return { status: "AVAILABLE", availableFromDate: "" };
  }

  const check = new Date(today);
  for (let i = 1; i <= 365; i++) {
    check.setDate(check.getDate() + 1);
    const ds = `${check.getFullYear()}-${pad(check.getMonth() + 1)}-${pad(check.getDate())}`;
    if (!dates.includes(ds)) {
      return { status: "AVAILABLE_SOON", availableFromDate: ds };
    }
  }

  return { status: "UNAVAILABLE", availableFromDate: "" };
}
