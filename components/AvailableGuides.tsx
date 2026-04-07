import { BadgeCheck, Calendar, Filter, Languages, Star, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const MOCK_GUIDES = [
    {
        id: "g1",
        name: "Pemba Sherpa",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop",
        exp: "12 Years",
        ntb: "NTB-4592",
        rating: 4.9,
        reviews: 142,
        languages: ["English", "Nepali", "Sherpa"],
        price: 35,
        available: true,
    },
    {
        id: "g2",
        name: "Sita Gurung",
        image: "https://images.unsplash.com/photo-1574288607185-3e284a1e9444?q=80&w=400&auto=format&fit=crop",
        exp: "8 Years",
        ntb: "NTB-6102",
        rating: 4.8,
        reviews: 89,
        languages: ["English", "French", "Nepali"],
        price: 30,
        available: true,
    },
    {
        id: "g3",
        name: "Dawa Tamang",
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=400&auto=format&fit=crop",
        exp: "15 Years",
        ntb: "NTB-2144",
        rating: 5.0,
        reviews: 215,
        languages: ["English", "German", "Nepali"],
        price: 40,
        available: false, // Booked soon
    },
    {
        id: "g4",
        name: "Jeevan Pokherel",
        image: "/guides/jeevan-pokherel.jpg",
        exp: "10+ Years",
        ntb: "NTB-1842",
        rating: 4.9,
        reviews: 135,
        languages: ["English", "Hindi", "Nepali"],
        price: 35,
        available: true,
    }
];

export default function AvailableGuides() {
    return (
        <section className="space-y-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <span className="text-nepal-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Direct Match</span>
                    <h2 className="text-4xl font-display font-bold text-white mb-4">Available EBC Guides</h2>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Skip the agency markup. Browse verified local guides available for your dates, read their reviews, and book directly.
                    </p>
                </div>

                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full text-white font-bold transition-colors">
                    <Filter className="w-4 h-4" />
                    Filter Guides
                </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition">Language: Any</span>
                <span className="bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition">Price: Any</span>
                <span className="bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition">Rating: 4.5+</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_GUIDES.map((guide) => (
                    <div key={guide.id} className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden group hover:border-nepal-orange/50 transition-colors flex flex-col">
                        <div className="relative h-64 w-full">
                            <img
                                src={guide.image}
                                alt={guide.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                <span className="text-white text-xs font-bold">{guide.rating}</span>
                                <span className="text-gray-400 text-[10px]">({guide.reviews})</span>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                                        {guide.name}
                                        <BadgeCheck className="w-5 h-5 text-blue-400" />
                                    </h3>
                                    <div className="text-nepal-orange text-sm font-bold">{guide.exp} Experience</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col space-y-6">
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <User className="w-4 h-4" />
                                    {guide.ntb}
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Languages className="w-4 h-4" />
                                    {guide.languages.join(", ")}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                                <div className="text-white font-bold text-xl flex items-baseline gap-1">
                                    ${guide.price} <span className="text-xs text-gray-500 font-normal">/ day</span>
                                </div>
                                {guide.available ? (
                                    <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold">
                                        <Calendar className="w-4 h-4" /> Available
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-gray-500 text-sm font-bold">
                                        <Calendar className="w-4 h-4" /> Booked Soon
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Link
                                    href={`/#`}
                                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold py-3 rounded-xl text-center transition-colors"
                                >
                                    View Profile
                                </Link>
                                <button className="bg-nepal-orange hover:bg-orange-500 text-white text-sm font-bold py-3 rounded-xl transition-colors shadow-lg shadow-orange-500/20">
                                    Book Guide
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center pt-8">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-full text-white font-bold transition-all text-lg group">
                    See All 12 Available Guides for EBC
                </button>
            </div>
        </section>
    );
}
