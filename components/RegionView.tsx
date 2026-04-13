"use client";

import { Mountain, Clock, ChevronRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrustBadges, ContentHub, Testimonials, FAQSection } from "./RegionRefinements";
import { EverestGuideRequirement } from "@/components/EverestGuideRequirement";
import { ManasluGuideRequirement } from "@/components/ManasluGuideRequirement";
import { AnnapurnaGuideRequirement } from "@/components/AnnapurnaGuideRequirement";

interface TrekOption {
    id: string;
    name: string;
    duration: string;
    maxAltitude: string;
    difficulty: string;
    image: string;
    description: string;
    bestSeason?: string;
}

interface RegionData {
    name: string;
    description: string;
    heroImage: string;
    treks: TrekOption[];
}

export default function RegionView({ region }: { region: RegionData }) {
    const isEverest = region.name.toLowerCase().includes("everest");
    const isManaslu = region.name.toLowerCase().includes("manaslu");
    const isAnnapurna = region.name.toLowerCase().includes("annapurna");
    const article = (isEverest || isAnnapurna) ? "an" : "a";

    return (
        <div className="space-y-32">
            {/* Trust Badges Section */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto border-t border-b border-white/5 py-12">
                    <TrustBadges />
                </div>
            </section>

            {/* Trek Options Grid */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                                Most Popular Treks in the {region.name}
                            </h2>
                            <p className="text-gray-400 max-w-2xl text-lg">
                                From the classic high-altitude base camps to the turquoise lakes of Gokyo, find your trek.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {region.treks.map((trek, index) => (
                            <motion.div
                                key={trek.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-slate-900 border border-white/10 rounded-3xl overflow-hidden hover:border-nepal-orange/50 transition-all duration-500"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={trek.image}
                                        alt={trek.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                        <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                                            {trek.difficulty}
                                        </span>
                                        {trek.bestSeason && (
                                            <span className="bg-nepal-orange/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                                                {trek.bestSeason}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-nepal-orange transition-colors">
                                        {trek.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                                        {trek.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 p-2 rounded-lg">
                                            <Clock className="w-4 h-4 text-nepal-orange" />
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider opacity-50">Duration</p>
                                                <span className="font-bold text-gray-300">{trek.duration}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 p-2 rounded-lg">
                                            <Mountain className="w-4 h-4 text-nepal-orange" />
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider opacity-50">Max Alt</p>
                                                <span className="font-bold text-gray-300">{trek.maxAltitude}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/itineraries/${trek.id}`}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-nepal-orange text-white py-3 rounded-xl font-bold transition-all border border-white/10 hover:border-nepal-orange group/btn"
                                    >
                                        View Full Itinerary <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Essential Travel Hub */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-16">
                        Essential Travel Guide
                    </h2>
                    <ContentHub regionName={region.name} />
                </div>
            </section>

            {/* Everest Mandate Box */}
            {isEverest && <EverestGuideRequirement />}

            {/* Manaslu Mandate Box */}
            {isManaslu && <ManasluGuideRequirement />}

            {/* Annapurna Mandate Box */}
            {isAnnapurna && <AnnapurnaGuideRequirement />}

            {/* Testimonials Section */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-16">
                        What Our Adventurers Say
                    </h2>
                    <Testimonials regionName={region.name} />
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
                        Common Questions
                    </h2>
                    <p className="text-gray-400 mb-16">Everything you need to know about trekking in the {region.name}.</p>
                    <FAQSection regionName={region.name} />
                </div>
            </section>

            {/* Region Guides CTA */}
            <section className="px-4 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[40px] overflow-hidden p-8 md:p-16 text-center border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-nepal-orange/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-himalayan-blue/10 blur-[100px] rounded-full -ml-32 -mb-32"></div>

                        <div className="relative z-10">
                            <MapPin className="w-12 h-12 text-nepal-orange mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                Looking for {article} Guide for {region.name}?
                            </h2>
                            <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
                                Skip the middleman in Thamel. We connect you directly with elite, licensed locals who know every rock and ritual of these trails. Safer, more authentic, and 100% transparent.
                            </p>
                            <Link
                                href={`/#guides?region=${region.name} Region`}
                                className="inline-flex items-center gap-2 bg-nepal-orange text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-all text-lg"
                            >
                                Match Me with {article} {region.name} Guide <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
