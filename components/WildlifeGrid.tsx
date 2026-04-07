"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, Star } from "lucide-react";

const items = [
    {
        id: "sauraha-national-park",
        title: "Sauraha (Chitwan) National Park",
        subtitle: "Rhinos, Crocodiles & Tharu Culture",
        className: "col-span-1 md:col-span-2 row-span-2",
        image: "https://images.unsplash.com/photo-1596711732675-9e67a6839bb0?q=80&w=2670&auto=format&fit=crop", // Rhino
        meta: { difficulty: "Easy", duration: "3 Days", price: "45", rating: "4.8", season: "All Year" }
    },
    {
        id: "bardiya-national-park",
        title: "Bardiya National Park",
        subtitle: "The Domain of the Royal Bengal Tiger",
        className: "col-span-1 md:col-span-1 row-span-1",
        image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2670&auto=format&fit=crop", // Tiger
        meta: { difficulty: "Moderate", duration: "5 Days", price: "55", rating: "4.9", season: "Oct-May" }
    },
    {
        id: "shey-phoksundo-national-park",
        title: "Shey Phoksundo National Park",
        subtitle: "Snow Leopards & Turquoise Lakes",
        className: "col-span-1 md:col-span-1 row-span-1",
        image: "https://images.unsplash.com/photo-1589133372221-39656da2785d?q=80&w=2670&auto=format&fit=crop", // Alpine/Lake
        meta: { difficulty: "Hard", duration: "12 Days", price: "60", rating: "4.9", season: "Spring/Autumn" }
    },
    {
        id: "sagarmatha-national-park",
        title: "Sagarmatha National Park",
        subtitle: "Himalayan Tahr & Golden Eagles",
        className: "col-span-1 md:col-span-2 row-span-1",
        image: "https://images.unsplash.com/photo-1623135017019-3db10d2c3df4?q=80&w=2670&auto=format&fit=crop", // Mountains/Tahr
        meta: { difficulty: "Moderate", duration: "8 Days", price: "40", rating: "4.8", season: "Spring/Autumn" }
    },
];

export default function WildlifeGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] max-w-7xl mx-auto px-4">
            {items.map((item, index) => (
                <Link
                    href={`/destinations/${item.id}`} // Links out to standard destinations. Assume these exist or will exist
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
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border backdrop-blur-md ${item.meta.difficulty === 'Hard' ? 'bg-red-500/20 border-red-500/30 text-red-200' :
                                        item.meta.difficulty === 'Moderate' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-200' :
                                            'bg-green-500/20 border-green-500/30 text-green-200'
                                        }`}>
                                        {item.meta.difficulty}
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
                                        <Clock className="w-4 h-4 text-nepal-orange" />
                                        <span>{item.meta.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-nepal-orange fill-nepal-orange" />
                                        <span>{item.meta.rating} Safari</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Tag (Top Right) */}
                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1 shadow-lg">
                            <span className="text-gray-300 text-xs font-medium">From</span>
                            <span className="text-white font-bold ml-1">${item.meta.price}<span className="text-[10px] text-gray-400 font-normal">/day</span></span>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
