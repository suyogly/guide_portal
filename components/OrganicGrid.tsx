"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mountain, Clock, DollarSign, Star } from "lucide-react";

const items = [
    {
        id: "everest-base-camp",
        title: "Everest Base Camp Trek",
        subtitle: "Expert guides for structural safety & high-altitude support",
        className: "col-span-1 md:col-span-2 row-span-2",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop",
        region: "Everest Region",
        meta: { guides: "15+ Verified", rating: "4.9", season: "Spring/Autumn", price: "28" }
    },
    {
        id: "annapurna-base-camp",
        title: "Annapurna Base Camp",
        subtitle: "Local experts who know the best hidden teahouses",
        className: "col-span-1 md:col-span-1 row-span-1",
        image: "https://images.unsplash.com/photo-1549495447-ff2b01265db6?q=80&w=2574&auto=format&fit=crop",
        region: "Annapurna Region",
        meta: { guides: "12+ Verified", rating: "4.8", season: "All Year", price: "25" }
    },
    {
        id: "manaslu-circuit",
        title: "Manaslu Circuit",
        subtitle: "Required certified guides for restricted areas",
        className: "col-span-1 md:col-span-1 row-span-1",
        image: "https://images.unsplash.com/photo-1589133372221-39656da2785d?q=80&w=2670&auto=format&fit=crop",
        region: "Manaslu Region",
        meta: { guides: "8+ Specialists", rating: "5.0", season: "Autumn", price: "35" }
    },
    {
        id: "langtang-valley",
        title: "Langtang Valley",
        subtitle: "Perfect first solo trek with friendly local partners",
        className: "col-span-1 md:col-span-2 row-span-1",
        image: "https://images.unsplash.com/photo-1521949392237-7977eb0df9b4?q=80&w=2618&auto=format&fit=crop",
        region: "Langtang Region",
        meta: { guides: "10+ Partners", rating: "4.7", season: "Spring/Autumn", price: "22" }
    },
];

export default function OrganicGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] max-w-7xl mx-auto px-4">
            {items.map((item, index) => (
                <Link
                    href={`/guides?region=${encodeURIComponent(item.region)}`}
                    key={item.id}
                    className={`relative group overflow-hidden rounded-3xl border border-white/10 ${item.className} group-hover:border-nepal-orange transition-colors duration-500 block`}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="w-full h-full"
                    >
                        {/* Background Image with Hover Scale */}
                        <div className="absolute inset-0">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />

                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                            <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                                {/* Badges */}
                                <div className="flex gap-2 mb-3">
                                    <span className="bg-nepal-orange/20 border border-nepal-orange/30 text-nepal-orange px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                                        Top Rated Route
                                    </span>
                                    <span className="bg-white/10 text-white border border-white/20 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                                        {item.meta.season}
                                    </span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-none drop-shadow-md">
                                    {item.title}
                                </h3>

                                {/* Meta Data Grid */}
                                <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-300 mb-2 opacity-90">
                                    <div className="flex items-center gap-1.5">
                                        <Mountain className="w-4 h-4 text-nepal-orange" />
                                        <span>{item.meta.guides} Guides</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-nepal-orange fill-nepal-orange" />
                                        <span>{item.meta.rating} Safety Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Tag (Top Right) */}
                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1 shadow-lg">
                            <span className="text-gray-300 text-[10px] font-medium uppercase tracking-wider">Independent guides from</span>
                            <span className="text-white font-bold ml-1">${item.meta.price}<span className="text-[10px] text-gray-400 font-normal">/day</span></span>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
