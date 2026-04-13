// localStorage-backed CRUD store for the admin panel.
// All data persists client-side until a real database is wired up.

export const ADMIN_EMAIL = "admin@gmail.com";
export const ADMIN_PASSWORD = "admin123";
export const AUTH_KEY = "tgh_admin_auth";

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
  image: string;        // avatar / main profile photo
  coverImage: string;   // hero background on the profile page
  experienceYears: number;
  experience: string;   // display string e.g. "15+ Years"
  licenseNumber: string;
  kycVerified: boolean;
  isVerified: boolean;
  ratePerDay: number;
  rating: number;
  gender: "MALE" | "FEMALE";
  region: string;
  availabilityStatus: "AVAILABLE" | "UNAVAILABLE" | "AVAILABLE_SOON";
  availableFromDate: string;        // YYYY-MM-DD, auto-computed
  unavailableDates: string[];       // YYYY-MM-DD array, drives auto-computation
  languages: AdminLanguage[];
  tags: string;                     // comma-separated
  specializedRoutes: string;        // comma-separated
  photos: string[];                 // array of base64 or URL strings
  fluency: string;                  // display string derived from languages
  createdAt: string;
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

// ─── Availability computation (shared with UI) ────────────────────────────────

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

// ─── Storage keys ─────────────────────────────────────────────────────────────

const KEY_GUIDES = "tgh_admin_guides";
const KEY_BLOGS = "tgh_admin_blogs";
const KEY_REGIONS = "tgh_admin_regions";

// ─── Guides ───────────────────────────────────────────────────────────────────

export function getGuides(): AdminGuide[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY_GUIDES);
  if (raw) return JSON.parse(raw);
  const seed = seedGuides();
  localStorage.setItem(KEY_GUIDES, JSON.stringify(seed));
  return seed;
}

export function saveGuides(guides: AdminGuide[]): void {
  localStorage.setItem(KEY_GUIDES, JSON.stringify(guides));
}

// ─── Blogs ────────────────────────────────────────────────────────────────────

export function getBlogs(): AdminBlog[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY_BLOGS);
  if (raw) return JSON.parse(raw);
  const seed = seedBlogs();
  localStorage.setItem(KEY_BLOGS, JSON.stringify(seed));
  return seed;
}

export function saveBlogs(blogs: AdminBlog[]): void {
  localStorage.setItem(KEY_BLOGS, JSON.stringify(blogs));
}

// ─── Regions ──────────────────────────────────────────────────────────────────

export function getRegions(): AdminRegion[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY_REGIONS);
  if (raw) return JSON.parse(raw);
  const seed = seedRegions();
  localStorage.setItem(KEY_REGIONS, JSON.stringify(seed));
  return seed;
}

export function saveRegions(regions: AdminRegion[]): void {
  localStorage.setItem(KEY_REGIONS, JSON.stringify(regions));
}

// ─── Seed data ────────────────────────────────────────────────────────────────

function seedGuides(): AdminGuide[] {
  return [
    {
      id: genId(),
      slug: "tulasi-ram-paudel",
      name: "Tulasi Ram Paudel",
      specialty: "Trek / Tour / Birding Guide",
      quote: "Professional freelancer trek/tour/birding guide in Pokhara, Nepal.",
      description:
        "Tulasi is one of the most experienced freelance trekking and birding guides based in Pokhara with over 15 years in the field.",
      image: "/guides/tulasi-ram-paudel.png",
      coverImage:
        "https://images.unsplash.com/photo-1627814324900-349f2b87640b?q=80&w=2600&auto=format&fit=crop",
      experienceYears: 15,
      experience: "15+ Years",
      licenseNumber: "",
      kycVerified: true,
      isVerified: true,
      ratePerDay: 30,
      rating: 5.0,
      gender: "MALE",
      region: "Annapurna Region",
      availabilityStatus: "AVAILABLE",
      availableFromDate: "",
      unavailableDates: ["2026-04-18", "2026-04-19", "2026-04-20"],
      languages: [
        { id: genId(), language: "English", proficiency: "FLUENT" },
        { id: genId(), language: "Nepali", proficiency: "NATIVE" },
      ],
      tags: "Birding Expert,Trek & Tour",
      specializedRoutes:
        "Annapurna Base Camp,Poon Hill Trek,Mardi Himal Trek",
      photos: [
        "https://images.unsplash.com/photo-1627814324900-349f2b87640b?q=80&w=1200&auto=format&fit=crop",
      ],
      fluency: "English (Fluent), Nepali (Native)",
      createdAt: new Date().toISOString(),
    },
    {
      id: genId(),
      slug: "meleena-basnet",
      name: "Meleena Basnet",
      specialty: "High-Altitude & Multi-Region Expert",
      quote: "From Everest to Manaslu, I make every high-altitude journey unforgettable.",
      description:
        "Meleena is one of Nepal's most accomplished female high-altitude guides, celebrated for her expertise on the Everest and Manaslu circuits.",
      image: "/guides/meleena-basnet.jpg",
      coverImage:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
      experienceYears: 10,
      experience: "10+ Years",
      licenseNumber: "NTB-22522",
      kycVerified: true,
      isVerified: true,
      ratePerDay: 35,
      rating: 4.9,
      gender: "FEMALE",
      region: "Everest Region",
      availabilityStatus: "AVAILABLE",
      availableFromDate: "",
      unavailableDates: ["2026-04-20", "2026-04-21", "2026-04-22"],
      languages: [
        { id: genId(), language: "English", proficiency: "FLUENT" },
        { id: genId(), language: "Nepali", proficiency: "NATIVE" },
        { id: genId(), language: "Hindi", proficiency: "BASIC" },
      ],
      tags: "EBC & Gokyo,Manaslu Circuit,Female Guide",
      specializedRoutes:
        "Everest Base Camp,Gokyo Lakes & Ri,Manaslu Circuit",
      photos: [
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      ],
      fluency: "English (Fluent), Nepali (Native), Hindi (Basic)",
      createdAt: new Date().toISOString(),
    },
    {
      id: genId(),
      slug: "rajan-tamang",
      name: "Rajan Tamang",
      specialty: "Langtang & Tamang Heritage Trail",
      quote: "I carry not just your bags but the stories of my ancestors on every trail.",
      description:
        "A native of the Langtang Valley, Rajan offers unmatched cultural insight alongside superb guiding skills.",
      image:
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=800&auto=format&fit=crop",
      coverImage:
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2600&auto=format&fit=crop",
      experienceYears: 8,
      experience: "8 Years",
      licenseNumber: "NTB-31104",
      kycVerified: true,
      isVerified: true,
      ratePerDay: 28,
      rating: 4.8,
      gender: "MALE",
      region: "Langtang Region",
      availabilityStatus: "AVAILABLE_SOON",
      availableFromDate: "2026-05-01",
      unavailableDates: ["2026-04-15", "2026-04-16", "2026-04-17", "2026-04-30"],
      languages: [
        { id: genId(), language: "English", proficiency: "FLUENT" },
        { id: genId(), language: "Nepali", proficiency: "NATIVE" },
        { id: genId(), language: "Tamang", proficiency: "NATIVE" },
      ],
      tags: "Cultural Expert,Langtang Specialist",
      specializedRoutes:
        "Langtang Valley Trek,Tamang Heritage Trail,Gosaikunda Trek",
      photos: [
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop",
      ],
      fluency: "English (Fluent), Nepali (Native), Tamang (Native)",
      createdAt: new Date().toISOString(),
    },
  ];
}

function seedBlogs(): AdminBlog[] {
  return [
    {
      id: genId(),
      slug: "solo-trekking-guide-2024",
      title: "The Ultimate Guide to Solo Trekking in Nepal (2024 Edition)",
      excerpt:
        "Everything you need to know about the new mandatory guide policy and how to find your perfect partner.",
      content: `<p>Solo trekking in Nepal has undergone a significant transformation in 2024. With the introduction of mandatory guide policies in many regions, including the popular Everest and Annapurna circuits, the landscape for independent adventurers has shifted.</p>

<h3>Understanding the 2024 Policy</h3>
<p>The Nepal Tourism Board now requires all foreign trekkers to be accompanied by a licensed guide in restricted areas and national parks.</p>

<h3>How to Find Your Perfect Guide</h3>
<p>Finding a guide isn't just about hiring a professional; it's about finding a companion who understands your pace and interests. Look for certifications from the Trekking Agencies' Association of Nepal (TAAN).</p>`,
      category: "SOLO_TRAVEL",
      authorName: "Pasang Sherpa",
      coverImage:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
      publishedAt: "2024-02-24",
      createdAt: new Date().toISOString(),
    },
    {
      id: genId(),
      slug: "everest-base-camp-packing-list",
      title: "Everest Base Camp Packing List: What You Really Need",
      excerpt:
        "Don't overpack! Here is the definitive list of gear that helped our guides reach EBC over 50 times.",
      content: `<p>Packing for EBC is a delicate balance between being prepared and staying light. Every kilogram counts when you're crossing 5,000 meters.</p>

<h3>The Core Layering System</h3>
<p>Forget heavy coats. Think layers. You need a base layer that wicks moisture, a mid-layer for warmth (fleece), and an outer shell to block wind and rain.</p>`,
      category: "GEAR_GUIDE",
      authorName: "Lhakpa Tenzing",
      coverImage:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2670&auto=format&fit=crop",
      publishedAt: "2024-02-20",
      createdAt: new Date().toISOString(),
    },
    {
      id: genId(),
      slug: "best-time-to-visit-nepal",
      title: "When to Visit Nepal: A Guide to the Trekking Seasons",
      excerpt:
        "From the crystal clear skies of October to the blooming rhododendrons of April, find your perfect window.",
      content: `<p>Nepal's trekking seasons are defined by the monsoon. Autumn (October–November) and Spring (March–April) remain the gold standard for high-altitude adventures.</p>

<h3>Autumn: The Peak Season</h3>
<p>Post-monsoon air is incredibly clear, offering the best views of the Himalayan giants.</p>`,
      category: "TREKKING_TIPS",
      authorName: "Suman Gurung",
      coverImage:
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop",
      publishedAt: "2024-02-15",
      createdAt: new Date().toISOString(),
    },
  ];
}

function seedRegions(): AdminRegion[] {
  return [
    {
      id: genId(),
      slug: "everest-region",
      title: "Everest Region",
      description:
        "Home to the world's highest peak, the Khumbu region offers iconic trails, Sherpa culture, and legendary Himalayan hospitality.",
      heroImage:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      faqs: [
        {
          id: genId(),
          question: "Do I need a guide for EBC?",
          answer:
            "Yes, since April 2023 the Nepal Tourism Board mandates all foreign trekkers hire a licensed guide in Sagarmatha National Park.",
        },
        {
          id: genId(),
          question: "What permits are required?",
          answer:
            "You need a TIMS card and the Sagarmatha National Park entry permit, both available in Kathmandu or Lukla.",
        },
      ],
      routes: [
        {
          id: genId(),
          slug: "everest-base-camp-trek",
          title: "Everest Base Camp Trek",
          description:
            "The quintessential Himalayan adventure leading to the doorstep of the world's highest peak at 5,364 m.",
          body: `<p>The Everest Base Camp Trek is the quintessential Himalayan adventure. Beginning with a thrilling flight to Lukla, the trail winds through ancient Sherpa villages, dense rhododendron forests, and high-altitude landscapes that leave trekkers breathless—both from the altitude and the sheer beauty.</p>

<p>Highlights include the busy Namche Bazaar, the sacred Tengboche Monastery with its unobstructed views of Ama Dablam, and the surreal moonscape of the Khumbu Glacier.</p>`,
          coverImage:
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
          difficulty: "DIFFICULT",
          maxAltitudeM: 5545,
          durationDays: 14,
          bestSeason: "Mar–May, Sep–Nov",
          authorName: "TrekGuide Hub",
          publishedAt: new Date().toISOString(),
          faqs: [
            {
              id: genId(),
              question: "Is altitude sickness a concern?",
              answer:
                "Yes. Acclimatisation days are built into the itinerary. Ascend slowly, stay hydrated, and never push through severe symptoms.",
            },
          ],
          itinerary: [
            {
              id: genId(),
              dayNumber: 1,
              title: "Fly Kathmandu → Lukla; Trek to Phakding",
              description:
                "Short 30-minute scenic flight to Lukla (2,840 m), then a gentle 3-hour trail descend to Phakding along the Dudh Koshi river.",
              distanceKm: "8",
              elevationGainM: "-200",
              estimatedTime: "3–4 hrs",
              altitudeM: "2,610",
              isRestDay: false,
              guideTip: "Keep day 1 light — your legs will thank you on day 7.",
              flexNote: "",
            },
            {
              id: genId(),
              dayNumber: 2,
              title: "Phakding → Namche Bazaar",
              description:
                "A longer day crossing suspension bridges draped in prayer flags. The final 2-hour climb to Namche rewards with the first view of Everest.",
              distanceKm: "11",
              elevationGainM: "800",
              estimatedTime: "5–6 hrs",
              altitudeM: "3,440",
              isRestDay: false,
              guideTip: "Drink at least 3 litres of water today.",
              flexNote: "First glimpse of Everest on the final climb.",
            },
          ],
        },
        {
          id: genId(),
          slug: "gokyo-lakes-ri",
          title: "Gokyo Lakes & Gokyo Ri",
          description:
            "A quieter alternative to EBC offering turquoise glacial lakes and arguably the best 360° Himalayan panorama.",
          body: "<p>The Gokyo Valley is a hidden gem of the Khumbu region. The emerald Gokyo lakes are sacred to both Hindus and Buddhists, and the summit of Gokyo Ri (5,357 m) provides one of the finest viewpoints in the Himalayas.</p>",
          coverImage:
            "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2670&auto=format&fit=crop",
          difficulty: "DIFFICULT",
          maxAltitudeM: 5357,
          durationDays: 11,
          bestSeason: "Mar–May, Oct–Nov",
          authorName: "TrekGuide Hub",
          publishedAt: new Date().toISOString(),
          faqs: [],
          itinerary: [],
        },
      ],
    },
    {
      id: genId(),
      slug: "annapurna-region",
      title: "Annapurna Region",
      description:
        "Diverse landscapes ranging from subtropical forests to alpine meadows and the rain-shadow desert of Mustang, encircling the world's 10th highest peak.",
      heroImage:
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      faqs: [
        {
          id: genId(),
          question: "What permit is needed for the Annapurna Circuit?",
          answer:
            "You need an ACAP (Annapurna Conservation Area Permit) and a TIMS card, both obtainable in Pokhara or Kathmandu.",
        },
      ],
      routes: [
        {
          id: genId(),
          slug: "annapurna-circuit",
          title: "Annapurna Circuit",
          description:
            "A classic 200+ km loop around the Annapurna massif crossing the legendary Thorong La pass at 5,416 m.",
          body: "<p>The Annapurna Circuit is rightly considered one of the world's greatest treks. The diversity of landscape, culture, and altitude makes every day different from the last.</p>",
          coverImage:
            "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop",
          difficulty: "STRENUOUS",
          maxAltitudeM: 5416,
          durationDays: 18,
          bestSeason: "Mar–May, Oct–Nov",
          authorName: "TrekGuide Hub",
          publishedAt: new Date().toISOString(),
          faqs: [],
          itinerary: [],
        },
      ],
    },
    {
      id: genId(),
      slug: "langtang-region",
      title: "Langtang Region",
      description:
        "Nepal's closest trekking region to Kathmandu, offering glacier views, yak pastures, and the rich Tamang cultural heritage.",
      heroImage:
        "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=2596&auto=format&fit=crop",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      faqs: [],
      routes: [],
    },
  ];
}
