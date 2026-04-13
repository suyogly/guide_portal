"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Star, Loader2, SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { GUIDES } from "@/lib/guides";

function GuideList() {
    const searchParams = useSearchParams();
    const [isMatching, setIsMatching] = useState(false);
    const [filteredGuides, setFilteredGuides] = useState(GUIDES);

    const regionFilter = searchParams.get("region");
    const genderFilter = searchParams.get("gender");

    useEffect(() => {
        if (regionFilter || (genderFilter && genderFilter !== "No Preference")) {
            setIsMatching(true);

            const timer = setTimeout(() => {
                const results = GUIDES.filter(guide => {
                    const matchRegion = !regionFilter || guide.region === regionFilter;
                    const matchGender = !genderFilter || genderFilter === "No Preference" || guide.gender === genderFilter;
                    return matchRegion && matchGender;
                });
                setFilteredGuides(results);
                setIsMatching(false);
            }, 800);

            return () => clearTimeout(timer);
        } else {
            // Default view: Show 3 diverse guides
            setFilteredGuides([GUIDES[0], GUIDES[2], GUIDES[4]]);
        }
    }, [regionFilter, genderFilter]);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-white mb-4">
                    {regionFilter ? "Your Personal Matches" : "Meet the Locals"}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    {regionFilter
                        ? `We found guides specialized in ${regionFilter} who match your interest.`
                        : "Solo travelers often worry about being alone with a stranger. We only work with vetted, English-speaking guides who become your partners on the trail."
                    }
                </p>
            </div>

            {isMatching ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-nepal-orange/20 blur-xl rounded-full animate-pulse"></div>
                        <Loader2 className="w-12 h-12 text-nepal-orange animate-spin relative" />
                    </div>
                    <p className="text-white font-medium animate-pulse">Finding your perfect match...</p>
                </div>
            ) : filteredGuides.length > 0 ? (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGuides.map((guide) => (
                            <div key={guide.name} className="group bg-slate-950 border border-white/10 rounded-3xl overflow-hidden hover:border-nepal-orange/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,107,0,0.1)]">
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={guide.image}
                                        alt={guide.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-white font-bold text-sm">{guide.rating}</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                        <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-wider backdrop-blur-md">
                                            <BadgeCheck className="w-3 h-3" /> Verified
                                        </span>
                                        <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-wider backdrop-blur-md">
                                            {guide.gender}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-1">{guide.name}</h3>
                                        <p className="text-nepal-orange text-sm font-medium tracking-wide uppercase">{guide.specialty} Specialist</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex flex-wrap gap-2">
                                            {guide.tags.map(tag => (
                                                <span key={tag} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400 uppercase font-semibold">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 italic text-gray-400 text-sm leading-relaxed min-h-[80px]">
                                            "{guide.quote}"
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                                            <span>Exp: {guide.experience}</span>
                                            <Link
                                                href={`/guides/${guide.slug}`}
                                                className="group/btn bg-nepal-orange/10 hover:bg-nepal-orange text-nepal-orange hover:text-white border border-nepal-orange/20 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-1.5"
                                            >
                                                View Profile
                                                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* CTA Link to Guides Directory */}
                    <div className="mt-16 text-center">
                        <button
                            onClick={() => window.location.href = '/guides'}
                            className="inline-block bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-full font-bold transition-all shadow-lg"
                        >
                            See all guides
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="p-6 bg-white/5 rounded-full">
                        <SearchX className="w-12 h-12 text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">No exact match found</h3>
                    <p className="text-gray-400 max-md:max-w-md mx-auto">
                        We don't have a guide matching all those specific criteria right now.
                        Try broadening your search or contact us for a custom match.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-nepal-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
                    >
                        Reset Filters
                    </button>
                </div>
            )}
        </div>
    );
}

export default function GuideSpotlight() {
    return (
        <section id="guides" className="py-24 px-4 bg-slate-900 border-y border-white/5 scroll-mt-20">
            <Suspense fallback={<div className="text-center py-20"><Loader2 className="w-12 h-12 text-nepal-orange animate-spin mx-auto" /></div>}>
                <GuideList />
            </Suspense>
        </section>
    );
}
