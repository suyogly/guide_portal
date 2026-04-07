"use client";

import { MapPin, Clock, ArrowRight, MessageCircle, Info, Calendar, Sparkles, Filter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import FAQ from "@/components/FAQ";
import AvailabilityForm from "@/components/AvailabilityForm";
import StickyWhatsAppBar from "@/components/StickyWhatsAppBar";

const WEEKEND_TRIPS = [
    {
        id: 1,
        slug: "chisapani-nagarkot",
        title: "Chisapani - Nagarkot Hike",
        whoItIsFor: "The Overworked Techie",
        painSolved: "Escape KTM's dust in under 3 hours",
        feeling: "Silence, pine scents, and mountain views",
        duration: "1 Night / 2 Days",
        difficulty: "Moderate",
        difficultyExplainer: "Moderate = 4–6 hrs walking, no prior experience needed",
        soloFriendly: true,
        bestSeason: "Oct – May",
        nextDeparture: "Every Saturday",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671&auto=format&fit=crop",
        description: "Escape the city dust. Walk through Shivapuri National Park, stay in a cozy lodge, and wake up to a sunrise over the Himalayas.",
        includes: ["Hotel Pickup/Dropoff", "National Park Fees", "Guide", "Lodge + Dinner/Breakfast"]
    },
    {
        id: 2,
        slug: "kalinchowk-snow",
        title: "Kalinchowk Snow Trip",
        whoItIsFor: "The Adventure Seeker",
        painSolved: "The quickest way to touch snow from Kathmandu",
        feeling: "Alpine air, spiritual vibes, and cable car thrills",
        duration: "2 Nights / 3 Days",
        difficulty: "Easy",
        difficultyExplainer: "Easy = Mostly transport, minimal walking required",
        soloFriendly: true,
        bestSeason: "Dec – Feb",
        nextDeparture: "April 05, 2024",
        image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2670&auto=format&fit=crop",
        description: "Visit the famous Kalinchowk Bhagwati shrine and enjoy a cable car ride with stunning mountain panoramas.",
        includes: ["4WD Transport", "Hotel with Heater", "Cable Car Ticket", "All Meals"]
    },
    {
        id: 3,
        slug: "champadevi-hike",
        title: "Champadevi Day Hike",
        whoItIsFor: "The Weekend Warrior",
        painSolved: "A solid workout to clear your head",
        feeling: "Pure exhaustion followed by pure clarity",
        duration: "1 Day (7 Hours)",
        difficulty: "Strenuous",
        difficultyExplainer: "Strenuous = Constant uphill, requires good fitness",
        soloFriendly: false,
        bestSeason: "Year round",
        nextDeparture: "Daily upon request",
        image: "https://images.unsplash.com/photo-1623492701902-47dc207df5b1?q=80&w=2669&auto=format&fit=crop",
        description: "Hike to the ridge south of Kathmandu for panoramic views of the entire valley and the Himalayan range beyond.",
        includes: ["Private Transport", "Packed Lunch", "Guide", "Water"]
    }
];

const WEEKEND_FAQ = [
    {
        question: "Can I do these trips alone?",
        answer: "Yes! Many of our escapes are solo-friendly. We'll pair you with a small group or provide a private guide so you never feel isolated but still have your space."
    },
    {
        question: "What's included in the price?",
        answer: "We believe in transparency. Most escapes include transport, permits/fees, professional guides, and accommodation with meals. Check each card for specifics."
    },
    {
        question: "How do I know the difficulty level?",
        answer: "We use a 3-tier scale: Easy (minimal walking), Moderate (4-6 hours walking), and Strenuous (steep climbs/long days). Hover over the badges! "
    }
];

export default function WeekendEscapes() {
    const [activeTrip, setActiveTrip] = useState<typeof WEEKEND_TRIPS[0] | null>(null);

    // Structured Data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": WEEKEND_TRIPS.map((trip, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "TouristAttraction",
                "name": trip.title,
                "description": trip.description,
                "url": `https://yourdomain.com/weekend-escapes/${trip.slug}`,
                "image": trip.image
            }
        }))
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white pt-24 pb-24 px-4 overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-7xl mx-auto space-y-20">

                {/* Hero Section */}
                <div className="text-center space-y-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-nepal-orange/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                    <span className="inline-flex items-center gap-2 bg-nepal-orange/10 text-nepal-orange px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-nepal-orange/20">
                        <Sparkles className="w-3 h-3" /> Expat & Local Specials
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                        The Weekend <span className="text-nepal-orange">Warrior</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Living in Kathmandu? Don't let the weekends slip by. Curated escapes designed for those who work hard and need to disconnect harder.
                    </p>
                </div>

                {/* Weekend Trips Grid */}
                <div className="space-y-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-display font-bold border-l-4 border-nepal-orange pl-4">Curated Escapes</h2>
                            <p className="text-gray-500 text-sm ml-5">Handpicked experiences that solve your transition from office to nature.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {WEEKEND_TRIPS.map((trip) => (
                            <div key={trip.id} className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden hover:border-nepal-orange/30 transition-all group flex flex-col relative shadow-2xl shadow-black/50">
                                {/* Solo Badge */}
                                {trip.soloFriendly && (
                                    <div className="absolute top-4 left-4 z-10 bg-green-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-green-400/50 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                        SOLO-FRIENDLY
                                    </div>
                                )}

                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={trip.image}
                                        alt={trip.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                                    
                                    {/* Difficulty Tooltip Placeholder */}
                                    <div className="absolute bottom-4 right-4 group/tooltip">
                                        <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold border border-white/20 flex items-center gap-1.5 hover:bg-nepal-orange transition-colors cursor-help">
                                            {trip.difficulty}
                                            <Info className="w-3 h-3 opacity-60" />
                                        </div>
                                        <div className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-white text-slate-900 rounded-xl text-[11px] font-medium leading-tight opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none shadow-2xl z-20">
                                            {trip.difficultyExplainer}
                                            <div className="absolute top-full right-4 transform border-8 border-transparent border-t-white"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 flex-grow flex flex-col space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">{trip.title}</h3>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <div className="flex items-center">
                                                <Clock className="w-3.5 h-3.5 mr-1 text-nepal-orange" />
                                                {trip.duration}
                                            </div>
                                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                            <div className="flex items-center">
                                                <Calendar className="w-3.5 h-3.5 mr-1 text-nepal-orange" />
                                                {trip.nextDeparture}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                        <div className="flex items-start gap-2">
                                            <span className="text-[10px] font-bold text-nepal-orange uppercase tracking-wider mt-1 w-16">Perfect For</span>
                                            <p className="text-sm font-medium text-white">{trip.whoItIsFor}</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mt-1 w-16">The Fix</span>
                                            <p className="text-sm text-gray-300">{trip.painSolved}</p>
                                        </div>
                                        <div className="flex items-start gap-2 border-t border-white/5 pt-2">
                                            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider mt-1 w-16">The Feeling</span>
                                            <p className="text-sm text-gray-400 italic">"{trip.feeling}"</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto space-y-4 pt-4">
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => setActiveTrip(trip)}
                                                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-bold text-sm transition-all"
                                            >
                                                Check Availability
                                            </button>
                                            <a 
                                                href={`https://wa.me/9779800000000?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(trip.title)}.%20Can%20I%20get%20more%20info?`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-nepal-orange hover:bg-orange-600 text-white px-4 flex items-center justify-center rounded-xl transition-colors"
                                            >
                                                <MessageCircle className="w-5 h-5" />
                                            </a>
                                        </div>
                                        <a 
                                            href={`/weekend-escapes/${trip.slug}`}
                                            className="w-full bg-transparent hover:bg-white group/btn border border-white/20 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 hover:text-slate-950"
                                        >
                                            Plan This Escape <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-slate-900/50 border border-white/5 rounded-[40px] p-8 md:p-16">
                    <FAQ items={WEEKEND_FAQ} />
                </div>

                {/* Inquiry Form Modal */}
                {activeTrip && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveTrip(null)}></div>
                        <div className="w-full max-w-lg z-10">
                            <AvailabilityForm 
                                tripTitle={activeTrip.title} 
                                onClose={() => setActiveTrip(null)} 
                            />
                        </div>
                    </div>
                )}

            </div>

            <StickyWhatsAppBar />
        </main>
    );
}

