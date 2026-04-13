/**
 * Initial seed data in Prisma create-input format.
 * Used by POST /api/seed to populate an empty Supabase database.
 */
import type { Prisma } from "./generated/prisma/client";

// ─── Guides ───────────────────────────────────────────────────────────────────

export const SEED_GUIDES: Prisma.GuideCreateInput[] = [
  {
    slug: "tulasi-ram-paudel",
    name: "Tulasi Ram Paudel",
    avatar: "/guides/tulasi-ram-paudel.png",
    coverImage:
      "https://images.unsplash.com/photo-1627814324900-349f2b87640b?q=80&w=2600&auto=format&fit=crop",
    specialty: "Trek / Tour / Birding Guide",
    quote:
      "Professional freelancer trek/tour/birding guide in Pokhara, Nepal.",
    description:
      "Tulasi is one of the most experienced freelance trekking and birding guides based in Pokhara. With over 15 years on the trails of the Annapurna region, he has led hundreds of groups through the ABC, Poon Hill, and Mardi Himal circuits.",
    experienceYears: 15,
    experience: "15+ Years",
    licenseNumber: "",
    ratePerDay: 30,
    rating: 5.0,
    gender: "MALE",
    region: "Annapurna Region",
    tags: ["Birding Expert", "Trek & Tour"],
    specializedRoutes: ["Annapurna Base Camp", "Poon Hill Trek", "Mardi Himal Trek"],
    fluency: "English (Fluent), Nepali (Native)",
    isVerified: true,
    availabilityStatus: "AVAILABLE",
    availableFromDate: null,
    languages: {
      create: [
        { language: "English", proficiency: "FLUENT" },
        { language: "Nepali", proficiency: "NATIVE" },
      ],
    },
    photos: {
      create: [
        {
          url: "https://images.unsplash.com/photo-1627814324900-349f2b87640b?q=80&w=1200&auto=format&fit=crop",
          order: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1589133372221-39656da2785d?q=80&w=1200&auto=format&fit=crop",
          order: 1,
        },
        {
          url: "https://images.unsplash.com/photo-1521949392237-7977eb0df9b4?q=80&w=1200&auto=format&fit=crop",
          order: 2,
        },
        {
          url: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop",
          order: 3,
        },
      ],
    },
    unavailableDates: {
      create: [
        { date: new Date("2026-04-18") },
        { date: new Date("2026-04-19") },
        { date: new Date("2026-04-20") },
      ],
    },
  },
  {
    slug: "meleena-basnet",
    name: "Meleena Basnet",
    avatar: "/guides/meleena-basnet.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
    specialty: "High-Altitude & Multi-Region Expert",
    quote:
      "From Everest to Manaslu, I make every high-altitude journey unforgettable.",
    description:
      "Meleena is one of Nepal's most accomplished female high-altitude guides, celebrated for her expertise on the Everest and Manaslu circuits. She has guided over 200 expeditions.",
    experienceYears: 10,
    experience: "10+ Years",
    licenseNumber: "NTB-22522",
    ratePerDay: 35,
    rating: 4.9,
    gender: "FEMALE",
    region: "Everest Region",
    tags: ["EBC & Gokyo", "Manaslu Circuit", "Female Guide"],
    specializedRoutes: ["Everest Base Camp", "Gokyo Lakes & Ri", "Manaslu Circuit"],
    fluency: "English (Fluent), Nepali (Native), Hindi (Basic)",
    isVerified: true,
    availabilityStatus: "AVAILABLE",
    availableFromDate: null,
    languages: {
      create: [
        { language: "English", proficiency: "FLUENT" },
        { language: "Nepali", proficiency: "NATIVE" },
        { language: "Hindi", proficiency: "BASIC" },
      ],
    },
    photos: {
      create: [
        {
          url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
          order: 0,
        },
      ],
    },
    unavailableDates: {
      create: [
        { date: new Date("2026-04-20") },
        { date: new Date("2026-04-21") },
        { date: new Date("2026-04-22") },
      ],
    },
  },
  {
    slug: "rajan-tamang",
    name: "Rajan Tamang",
    avatar:
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=800&auto=format&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2600&auto=format&fit=crop",
    specialty: "Langtang & Tamang Heritage Trail",
    quote:
      "I carry not just your bags but the stories of my ancestors on every trail.",
    description:
      "A native of the Langtang Valley, Rajan offers unmatched cultural insight alongside superb guiding skills. He is one of the few guides who speaks the Tamang language fluently.",
    experienceYears: 8,
    experience: "8 Years",
    licenseNumber: "NTB-31104",
    ratePerDay: 28,
    rating: 4.8,
    gender: "MALE",
    region: "Langtang Region",
    tags: ["Cultural Expert", "Langtang Specialist"],
    specializedRoutes: [
      "Langtang Valley Trek",
      "Tamang Heritage Trail",
      "Gosaikunda Trek",
    ],
    fluency: "English (Fluent), Nepali (Native), Tamang (Native)",
    isVerified: true,
    availabilityStatus: "AVAILABLE_SOON",
    availableFromDate: new Date("2026-05-01"),
    languages: {
      create: [
        { language: "English", proficiency: "FLUENT" },
        { language: "Nepali", proficiency: "NATIVE" },
        { language: "Tamang", proficiency: "NATIVE" },
      ],
    },
    photos: {
      create: [
        {
          url: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1200&auto=format&fit=crop",
          order: 0,
        },
      ],
    },
    unavailableDates: {
      create: [
        { date: new Date("2026-04-15") },
        { date: new Date("2026-04-16") },
        { date: new Date("2026-04-17") },
        { date: new Date("2026-04-30") },
      ],
    },
  },
];

// ─── Blogs ────────────────────────────────────────────────────────────────────

export const SEED_BLOGS: Prisma.BlogPostCreateInput[] = [
  {
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
    publishedAt: new Date("2024-02-24"),
  },
  {
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
    publishedAt: new Date("2024-02-20"),
  },
  {
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
    publishedAt: new Date("2024-02-15"),
  },
];

// ─── Regions ──────────────────────────────────────────────────────────────────

export const SEED_REGIONS: Prisma.TrekRegionCreateInput[] = [
  {
    slug: "everest-region",
    title: "Everest Region",
    description:
      "Home to the world's highest peak, the Khumbu region offers iconic trails, Sherpa culture, and legendary Himalayan hospitality.",
    heroImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
    publishedAt: new Date(),
    faqs: {
      create: [
        {
          question: "Do I need a guide for EBC?",
          answer:
            "Yes, since April 2023 the Nepal Tourism Board mandates all foreign trekkers hire a licensed guide in Sagarmatha National Park.",
          order: 0,
        },
        {
          question: "What permits are required?",
          answer:
            "You need a TIMS card and the Sagarmatha National Park entry permit, both available in Kathmandu or Lukla.",
          order: 1,
        },
      ],
    },
    routes: {
      create: [
        {
          slug: "everest-base-camp-trek",
          title: "Everest Base Camp Trek",
          description:
            "The quintessential Himalayan adventure leading to the doorstep of the world's highest peak at 5,364 m.",
          body: `<p>The Everest Base Camp Trek is the quintessential Himalayan adventure. Beginning with a thrilling flight to Lukla, the trail winds through ancient Sherpa villages, dense rhododendron forests, and high-altitude landscapes that leave trekkers breathless.</p>
<p>Highlights include the busy Namche Bazaar, the sacred Tengboche Monastery with its unobstructed views of Ama Dablam, and the surreal moonscape of the Khumbu Glacier.</p>`,
          coverImage:
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
          difficulty: "DIFFICULT",
          maxAltitudeM: 5545,
          durationDays: 14,
          bestSeason: "Mar–May, Sep–Nov",
          authorName: "TrekGuide Hub",
          publishedAt: new Date(),
          faqs: {
            create: [
              {
                question: "Is altitude sickness a concern?",
                answer:
                  "Yes. Acclimatisation days are built into the itinerary. Ascend slowly, stay hydrated, and never push through severe symptoms.",
                order: 0,
              },
            ],
          },
          itinerary: {
            create: [
              {
                dayNumber: 1,
                title: "Fly Kathmandu → Lukla; Trek to Phakding",
                description:
                  "Short 30-minute scenic flight to Lukla (2,840 m), then a gentle 3-hour trail descend to Phakding along the Dudh Koshi river.",
                distanceKm: 8,
                elevationGainM: -200,
                estimatedTime: "3–4 hrs",
                altitudeM: 2610,
                isRestDay: false,
                guideTip: "Keep day 1 light — your legs will thank you on day 7.",
              },
              {
                dayNumber: 2,
                title: "Phakding → Namche Bazaar",
                description:
                  "A longer day crossing suspension bridges draped in prayer flags. The final 2-hour climb to Namche rewards with the first view of Everest.",
                distanceKm: 11,
                elevationGainM: 800,
                estimatedTime: "5–6 hrs",
                altitudeM: 3440,
                isRestDay: false,
                guideTip: "Drink at least 3 litres of water today.",
                flexNote: "First glimpse of Everest on the final climb.",
              },
            ],
          },
        },
        {
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
          publishedAt: new Date(),
        },
      ],
    },
  },
  {
    slug: "annapurna-region",
    title: "Annapurna Region",
    description:
      "Diverse landscapes ranging from subtropical forests to alpine meadows and the rain-shadow desert of Mustang, encircling the world's 10th highest peak.",
    heroImage:
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop",
    publishedAt: new Date(),
    faqs: {
      create: [
        {
          question: "What permit is needed for the Annapurna Circuit?",
          answer:
            "You need an ACAP (Annapurna Conservation Area Permit) and a TIMS card, both obtainable in Pokhara or Kathmandu.",
          order: 0,
        },
      ],
    },
    routes: {
      create: [
        {
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
          publishedAt: new Date(),
        },
        {
          slug: "annapurna-base-camp-trek",
          title: "Annapurna Base Camp Trek",
          description:
            "A dramatic journey into the heart of the Annapurna Sanctuary, surrounded by a ring of Himalayan peaks reaching the ABC at 4,130 m.",
          body: "<p>The ABC Trek winds through Gurung villages, rhododendron forests, and dramatic gorges before emerging into the breathtaking amphitheater of the Annapurna Sanctuary.</p>",
          coverImage:
            "https://images.unsplash.com/photo-1627814324900-349f2b87640b?q=80&w=2600&auto=format&fit=crop",
          difficulty: "MODERATE",
          maxAltitudeM: 4130,
          durationDays: 10,
          bestSeason: "Mar–May, Sep–Nov",
          authorName: "TrekGuide Hub",
          publishedAt: new Date(),
        },
      ],
    },
  },
  {
    slug: "langtang-region",
    title: "Langtang Region",
    description:
      "Nepal's closest trekking region to Kathmandu, offering glacier views, yak pastures, and the rich Tamang cultural heritage.",
    heroImage:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=2596&auto=format&fit=crop",
    publishedAt: new Date(),
    routes: {
      create: [
        {
          slug: "langtang-valley-trek",
          title: "Langtang Valley Trek",
          description:
            "A serene high-altitude valley trek through Tamang villages to the Kyanjin Gompa and Kyanjin Ri viewpoint at 4,773 m.",
          body: "<p>Often overshadowed by EBC and the Annapurna Circuit, the Langtang Valley offers an equally spectacular but more intimate Himalayan experience. The region is home to the Tamang people, whose culture and traditions remain remarkably intact.</p>",
          coverImage:
            "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=2596&auto=format&fit=crop",
          difficulty: "MODERATE",
          maxAltitudeM: 4773,
          durationDays: 7,
          bestSeason: "Mar–May, Sep–Nov",
          authorName: "TrekGuide Hub",
          publishedAt: new Date(),
        },
      ],
    },
  },
];
