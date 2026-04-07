export interface Guide {
    name: string;
    image: string;
    experience: string;
    specialty: string;
    quote: string;
    rating: number;
    fluency: string;
    tags: string[];
    region: string;
    gender: "Male Guide" | "Female Guide";
}

export const GUIDES: Guide[] = [
    // --- EVEREST REGION ---
    // --- ANNAPURNA REGION ---
    {
        name: "Tulasi Ram Paudel",
        image: "/guides/tulasi-ram-paudel.png",
        experience: "15+ Years",
        specialty: "Trek/Tour/Birding Guide",
        quote: "Professional freelancer trek/tour/birding guide in Pokhara, Nepal",
        rating: 5.0,
        fluency: "🇬🇧 Fluent, 🇳🇵 Native",
        tags: ["Birding Expert", "Trek & Tour"],
        region: "Annapurna Region",
        gender: "Male Guide"
    },
    {
        name: "Meleena Basnet",
        image: "/guides/meleena-basnet.jpg",
        experience: "10+ Years",
        specialty: "Multi-Region Expert",
        quote: "From Everest to Manaslu, I make every high-altitude journey unforgettable.",
        rating: 4.9,
        fluency: "🇬🇧 Fluent, 🇳🇵 Native",
        tags: ["Lic. #22522", "EBC & Gokyo", "Manaslu Circuit"],
        region: "Everest Region",
        gender: "Female Guide"
    },

    {
        name: "Jeevan Pokherel",
        image: "/guides/jeevan-pokherel.jpg",
        experience: "10+ Years",
        specialty: "Everest Base Camp",
        quote: "Every step is an adventure, and safety is my priority.",
        rating: 4.9,
        fluency: "🇬🇧 Fluent, 🇮🇳 Fluent",
        tags: ["Trekking Expert", "Familiar"],
        region: "Everest Region",
        gender: "Male Guide"
    },
    {
        name: "Siddhartha Shrestha",
        image: "/guides/siddhartha-shrestha.jpg",
        experience: "12 Years",
        specialty: "Annapurna & Manaslu Specialist",
        quote: "Leading the way with local expertise and heart in the Himalayas.",
        rating: 5.0,
        fluency: "🇬🇧 English, 🇮🇳 Hindi",
        tags: ["Lic. #2048", "Annapurna Expert", "Manaslu Specialist"],
        region: "Annapurna Region",
        gender: "Male Guide"
    },
    // --- MANASLU REGION ---
    {
        name: "Eka Devi Mainali",
        image: "/guides/eka-devi-mainali.jpg",
        experience: "10+ Years",
        specialty: "Manaslu & Tsum Valley",
        quote: "Girls Power",
        rating: 5.0,
        fluency: "🇬🇧 English",
        tags: ["Lic. #12345", "Manaslu Specialist", "Manaslu & Tsum Valley Expert"],
        region: "Manaslu Region",
        gender: "Female Guide"
    },
    {
        name: "Chakra Timilsina",
        image: "/guides/chakra-timilsina.jpg",
        experience: "6+ years",
        specialty: "Annapurna Region Specialist",
        quote: "Exploring the heart of the Annapurna with local expertise.",
        rating: 5.0,
        fluency: "🇬🇧 English, 🇳🇵 Nepali",
        tags: ["Lic. #1270", "Annapurna Expert", "Local Guide"],
        region: "Annapurna Region",
        gender: "Male Guide"
    },
    // --- LANGTANG REGION ---
    {
        name: "Jeevan Gurung",
        image: "/guides/jeevan-gurung.jpg",
        experience: "2+ years",
        specialty: "Annapurna & Manaslu Specialist",
        quote: "Guiding you through the diverse landscapes of Annapurna and Manaslu.",
        rating: 4.9,
        fluency: "🇬🇧 English, 🇮🇳 Hindi",
        tags: ["Lic. #2413", "Annapurna Expert", "Manaslu Specialist", "Mardi Himal"],
        region: "Annapurna Region",
        gender: "Male Guide"
    },
    {
        name: "Nabin Chapai",
        image: "/guides/nabin-chapai.jpg",
        experience: "12 Years",
        specialty: "Multi-Region Specialist",
        quote: "From the heights of Everest to the trails of Langtang, the mountains are my home.",
        rating: 5.0,
        fluency: "🇬🇧 English, 🇰🇷 Korean (Basic)",
        tags: ["Lic. #1015", "Everest Expert", "Annapurna Expert", "Makalu", "Manaslu"],
        region: "Everest Region",
        gender: "Male Guide"
    },
    // --- WESTERN REGION ---
    {
        name: "Narendra Paudel",
        image: "/guides/narendra-paudel.jpg",
        experience: "5+ Years",
        specialty: "ABC & Poonhill Specialist",
        quote: "Mountains are not just destinations, they are a way of life.",
        rating: 5.0,
        fluency: "🇬🇧 English",
        tags: ["Lic. #1243", "ABC Trek", "Poonhill Trek"],
        region: "Annapurna Region",
        gender: "Male Guide"
    },
    {
        name: "Pemba Sherpa",
        image: "/guides/pemba-sherpa.jpg",
        experience: "4+ Years",
        specialty: "Multi-Region Trekking Expert",
        quote: "The climb is tough, but the view from the top is worth it.",
        rating: 5.0,
        fluency: "🇬🇧 English",
        tags: ["Lic. #716", "Manaslu", "Everest", "ABC", "Western"],
        region: "Manaslu Region",
        gender: "Male Guide"
    }
];
