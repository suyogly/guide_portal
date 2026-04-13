import { MoveLeft } from "lucide-react";
import Link from "next/link";
import ItineraryView from "@/components/ItineraryView";
import RegionView from "@/components/RegionView";

// Mock Data for Regions
const REGIONS: Record<string, any> = {
    "everest-region": {
        name: "Everest Region",
        description: "Home to the world's highest peak, the Khumbu region offers iconic trails, Sherpa culture, and legendary hospitality.",
        heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
        treks: [
            {
                id: "ebc-trek",
                name: "Everest Base Camp",
                duration: "14 Days",
                maxAltitude: "5,364m",
                difficulty: "Difficult",
                image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
                description: "The classic trek to the base of the world's highest peak.",
                bestSeason: "Mar - May, Sep - Nov"
            },
            {
                id: "gokyo-lakes",
                name: "Gokyo Lakes & Ri",
                duration: "12 Days",
                maxAltitude: "5,357m",
                difficulty: "Moderate",
                image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop",
                description: "Stunning turquoise lakes and the best panorama of Everest.",
                bestSeason: "Mar - May, Oct - Nov"
            },
            {
                id: "three-passes",
                name: "Everest Three Passes",
                duration: "20 Days",
                maxAltitude: "5,535m",
                difficulty: "Strenuous",
                image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2670&auto=format&fit=crop",
                description: "The ultimate challenge in the Khumbu valley.",
                bestSeason: "Mar - May, Sep - Nov"
            }
        ]
    },
    "annapurna-region": {
        name: "Annapurna Region",
        description: "Diverse landscapes ranging from sub-tropical forests to alpine meadows and rain-shadow deserts.",
        heroImage: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop",
        treks: [
            { id: "annapurna-circuit", name: "Annapurna Circuit", duration: "14 Days", maxAltitude: "5,416m", difficulty: "Strenuous", image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop", description: "Voted one of the best long-distance treks in the world." },
            { id: "abc-trek", name: "Annapurna Base Camp", duration: "11 Days", maxAltitude: "4,130m", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1589133372221-39656da2785d?q=80&w=2670&auto=format&fit=crop", description: "Walk into the heart of the Annapurna massif." },
            { id: "mardi-himal", name: "Mardi Himal Trek", duration: "7 Days", maxAltitude: "4,500m", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1521949392237-7977eb0df9b4?q=80&w=2618&auto=format&fit=crop", description: "A relatively new and lesser-crowded route offering stunning close-up views of Machapuchare and the Annapurna range." },
            { id: "poon-hill", name: "Poon Hill Trek", duration: "5 Days", maxAltitude: "3,210m", difficulty: "Easy/Moderate", image: "https://images.unsplash.com/photo-1627814324900-349f2b87640b?q=80&w=2574&auto=format&fit=crop", description: "A classic short trek famous for its spectacular sunrise views over the Himalayas." }
        ]
    },
    "manaslu-region": {
        name: "Manaslu Region",
        description: "The 'Spirit Mountain' region offers a pristine cultural circuit and stunning Himalayan vistas without the crowds.",
        heroImage: "https://images.unsplash.com/photo-1589133372221-39656da2785d?q=80&w=2670&auto=format&fit=crop",
        treks: [
            { id: "manaslu-circuit", name: "Manaslu Circuit", duration: "14 Days", maxAltitude: "5,106m", difficulty: "Difficult", image: "https://images.unsplash.com/photo-1589133372221-39656da2785d?q=80&w=2670&auto=format&fit=crop", description: "A remote and culturally rich circuit around Mount Manaslu." },
            { id: "larke-pass-trek", name: "Larke Pass Trek", duration: "14 Days", maxAltitude: "5,106m", difficulty: "Difficult", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop", description: "An adventurous journey crossing the formidable Larke Pass, offering spectacular views of Manaslu and Himlung Himal." },
            { id: "tsum-valley", name: "Tsum Valley Trek", duration: "12 Days", maxAltitude: "3,700m", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop", description: "Step into the 'Hidden Valley' of Buddhism, a culturally preserved sanctuary untouched by time." },
            { id: "nar-phu-valley", name: "Nar Phu Valley Trek", duration: "12 Days", maxAltitude: "5,320m", difficulty: "Strenuous", image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop", description: "Explore the 'Living Museum' of the Himalayas, crossing high passes into secluded stone villages." }
        ]
    },
    "langtang-region": {
        name: "Langtang Region",
        description: "The closest alpine region to Kathmandu, famous for its red pandas, cheese factories, and easy accessibility.",
        heroImage: "https://images.unsplash.com/photo-1521949392237-7977eb0df9b4?q=80&w=2618&auto=format&fit=crop",
        treks: [
            { id: "langtang-valley-trek", name: "Langtang Valley Trek", duration: "8 Days", maxAltitude: "4,984m", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1521949392237-7977eb0df9b4?q=80&w=2618&auto=format&fit=crop", description: "Short, scenic, and straight into the heart of the mountains." },
            { id: "gosainkunda-trek", name: "Gosainkunda Trek", duration: "6 Days", maxAltitude: "4,380m", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop", description: "A sacred pilgrimage trek to the turquoise alpine lakes of Gosainkunda, offering panoramic views of the Langtang range." }
        ]
    },
    "western-region": {
        name: "Western Region",
        description: "Venture into the wild frontier of Upper Mustang and Dolpo, or explore the lush jungles of Bardiya and Chitwan. The West is home to ancient cultures and pristine nature.",
        heroImage: "https://images.unsplash.com/photo-1627814324900-349f2b87640b?q=80&w=2574&auto=format&fit=crop",
        treks: [
            { id: "upper-mustang", name: "Upper Mustang", duration: "14 Days", maxAltitude: "3,820m", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1627814324900-349f2b87640b?q=80&w=2574&auto=format&fit=crop", description: "The forbidden kingdom of Lo-Manthang." },
            { id: "lower-dolpo", name: "Lower Dolpo Circuit", duration: "18 Days", maxAltitude: "5,309m", difficulty: "Difficult", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop", description: "Remote turquoise lakes and ancient Bon culture." },
            { id: "shey-phoksundo", name: "Shey Phoksundo Lake", duration: "11 Days", maxAltitude: "3,611m", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2670&auto=format&fit=crop", description: "Nepal's deepest and most stunning alpine lake." },
            { id: "rara-lake", name: "Rara Lake Expedition", duration: "10 Days", maxAltitude: "2,990m", difficulty: "Moderate", image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2670&auto=format&fit=crop", description: "The Queen of Lakes in the remote Mugu district." },
            { id: "bardiya-safari", name: "Bardiya Wildlife", duration: "4 Days", maxAltitude: "152m", difficulty: "Easy", image: "https://images.unsplash.com/photo-1582234371992-807d07742d17?q=80&w=2670&auto=format&fit=crop", description: "Track wild tigers in the undisturbed jungles of the west." },
            { id: "chitwan-discovery", name: "Chitwan Expedition", duration: "3 Days", maxAltitude: "150m", difficulty: "Easy", image: "https://images.unsplash.com/photo-1589133372221-39656da2785d?q=80&w=2670&auto=format&fit=crop", description: "Rhino safaris and cultural immersion in the Terai." }
        ]
    }
};

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Check if it's a regional landing page
    const regionData = REGIONS[slug];

    // If it's not a valid region, we should probably redirect or show 404, 
    // but for this prototype we'll assume it exists or show the first one.
    if (!regionData) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Region Not Found</h1>
                    <Link href="/" className="text-nepal-orange hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white pb-24">
            <div className="relative h-[60vh] w-full bg-slate-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: `url(${regionData.heroImage})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                <div className="absolute top-28 left-0 w-full z-20">
                    <div className="max-w-7xl mx-auto px-8 md:px-16">
                        <Link href="/" className="inline-flex items-center text-white/60 hover:text-white transition-colors group">
                            <MoveLeft className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" />
                            <span className="text-sm font-bold tracking-widest uppercase">Back Home</span>
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto">
                    <span className="text-nepal-orange font-bold tracking-wider uppercase mb-4 block">Destination Hub</span>
                    <h1 className="text-5xl md::text-8xl font-display font-bold mb-6">{regionData.name}</h1>
                    <p className="text-gray-300 max-w-2xl text-xl leading-relaxed mb-8">
                        {regionData.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="#treks"
                            className="bg-nepal-orange text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-all text-lg"
                        >
                            Explore All {regionData.name} Treks
                        </Link>
                        <Link
                            href={`/#guides?region=${regionData.name}`}
                            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-lg"
                        >
                            Talk to a Local Expert
                        </Link>
                    </div>
                </div>
            </div>

            <div id="treks" className="mt-20">
                <RegionView region={regionData} />
            </div>
        </main>
    );
}
