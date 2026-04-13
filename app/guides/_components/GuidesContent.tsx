"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Star, Loader2, SearchX, MapPin, Globe, Trophy, X } from "lucide-react";
import type { Guide } from "@/lib/guides";
import GuideConnectSidebar from "@/components/GuideConnectSidebar";
import { useSearchParams, useRouter } from "next/navigation";

function GuideCard({ guide }: { guide: Guide }) {
    return (
        <div className="group bg-slate-900 border border-white/5 rounded-[2rem] overflow-hidden hover:border-nepal-orange/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,107,0,0.1)] flex flex-col h-full">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={guide.image}
                    alt={guide.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-2xl">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-white font-bold text-xs">{guide.rating.toFixed(1)}</span>
                </div>

                {/* Status Badges */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {guide.kycVerified && (
                        <span className="bg-green-500/20 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full text-[9px] font-bold flex items-center gap-1 uppercase tracking-wider backdrop-blur-md">
                            <BadgeCheck className="w-3 h-3" /> Licensed
                        </span>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-nepal-orange transition-colors">{guide.name}</h3>
                    <div className="flex items-center gap-2 text-nepal-orange text-[10px] font-bold uppercase tracking-widest">
                        <MapPin className="w-3 h-3" />
                        {guide.specialty}
                    </div>
                </div>

                <div className="space-y-4 flex-1">
                    {/* Experience & Language */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                            <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5 flex items-center gap-1">
                                <Trophy className="w-2.5 h-2.5 text-nepal-orange" /> Exp
                            </div>
                            <div className="text-white font-bold text-xs">{guide.experience}</div>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                            <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5 flex items-center gap-1">
                                <Globe className="w-2.5 h-2.5 text-nepal-orange" /> Fluency
                            </div>
                            <div className="text-white font-bold truncate text-[10px]">{guide.fluency}</div>
                        </div>
                    </div>

                    {/* Quote */}
                    <p className="text-gray-500 text-xs leading-relaxed italic border-l border-nepal-orange/20 pl-3">
                        {guide.quote}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {guide.tags.map((tag: string) => (
                            <span key={tag} className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg text-gray-400 uppercase font-bold tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA → profile page */}
                <Link
                    href={`/guides/${guide.slug}`}
                    className="mt-6 w-full bg-white/5 hover:bg-nepal-orange text-white border border-white/10 hover:border-nepal-orange py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn text-sm"
                >
                    View {guide.name.split(" ")[0]}&apos;s Profile
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </div>
    );
}

const REGIONS = ["All Regions", "Everest Region", "Annapurna Region", "Manaslu Region", "Langtang Region", "Western Region"];

const RATE_LABELS: Record<string, string> = {
    "25": "≤ $25/day",
    "30": "≤ $30/day",
    "35": "≤ $35/day",
};

function GuidesGrid({ guides }: { guides: Guide[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const regionParam = searchParams.get("region");
    const qParam = searchParams.get("q") ?? "";
    const maxRateParam = searchParams.get("maxRate") ?? "";

    const [selectedRegion, setSelectedRegion] = useState(
        regionParam && REGIONS.includes(regionParam) ? regionParam : "All Regions"
    );

    useEffect(() => {
        if (regionParam && REGIONS.includes(regionParam)) {
            setSelectedRegion(regionParam);
        } else if (!regionParam) {
            setSelectedRegion("All Regions");
        }
    }, [regionParam]);

    const maxRate = maxRateParam ? parseInt(maxRateParam) : null;
    const qLower = qParam.toLowerCase();

    const filteredGuides = guides
        .filter(g => selectedRegion === "All Regions" || g.region === selectedRegion)
        .filter(g => !maxRate || g.ratePerDay <= maxRate)
        .filter(g => !qLower || [g.name, g.specialty, ...g.specializedRoutes]
            .join(" ").toLowerCase().includes(qLower));

    // Build a URL with updated params for region pill clicks
    const buildRegionUrl = (region: string) => {
        const p = new URLSearchParams(searchParams.toString());
        if (region === "All Regions") p.delete("region");
        else p.set("region", region);
        return `/guides${p.size ? `?${p.toString()}` : ""}`;
    };

    const clearParam = (key: string) => {
        const p = new URLSearchParams(searchParams.toString());
        p.delete(key);
        router.push(`/guides${p.size ? `?${p.toString()}` : ""}`);
    };

    const activeChips: { label: string; key: string }[] = [];
    if (qParam) activeChips.push({ label: `"${qParam}"`, key: "q" });
    if (maxRateParam) activeChips.push({ label: RATE_LABELS[maxRateParam] ?? `≤ $${maxRateParam}/day`, key: "maxRate" });

    return (
        <>
            {/* Region Filter Bar */}
            <section className="sticky top-20 z-30 bg-slate-950/80 backdrop-blur-md border-y border-white/5 py-5">
                <div className="max-w-7xl mx-auto px-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {REGIONS.map(region => (
                            <Link
                                key={region}
                                href={buildRegionUrl(region)}
                                onClick={() => setSelectedRegion(region)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${selectedRegion === region
                                    ? "bg-nepal-orange border-nepal-orange text-white shadow-lg shadow-orange-500/20"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {region}
                            </Link>
                        ))}
                    </div>

                    {/* Active filter chips */}
                    {activeChips.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Filtered by:</span>
                            {activeChips.map(chip => (
                                <button
                                    key={chip.key}
                                    onClick={() => clearParam(chip.key)}
                                    className="flex items-center gap-1.5 bg-nepal-orange/10 border border-nepal-orange/20 text-nepal-orange px-3 py-1 rounded-full text-xs font-bold hover:bg-nepal-orange/20 transition-colors"
                                >
                                    {chip.label}
                                    <X className="w-3 h-3" />
                                </button>
                            ))}
                            {activeChips.length > 1 && (
                                <button
                                    onClick={() => router.push("/guides")}
                                    className="text-xs text-gray-500 hover:text-gray-300 underline transition-colors"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Guide Grid with Sidebar */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Grid */}
                        <div className="flex-1 order-2 lg:order-1">
                            {filteredGuides.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {filteredGuides.map(guide => (
                                        <GuideCard key={guide.slug} guide={guide} />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-40 text-center">
                                    <SearchX className="w-16 h-16 text-gray-600 mx-auto mb-6" />
                                    <h3 className="text-3xl font-display font-bold mb-4">No guides found</h3>
                                    <p className="text-gray-500 mb-6">
                                        Try adjusting your filters or search term.
                                    </p>
                                    <button
                                        onClick={() => router.push("/guides")}
                                        className="bg-nepal-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-[400px] order-1 lg:order-2">
                            <GuideConnectSidebar />
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function GuidesContent({ guides }: { guides: Guide[] }) {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-nepal-orange/10 blur-[120px] rounded-full -z-10 opacity-30"></div>
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-nepal-orange font-bold tracking-[0.3em] uppercase text-sm mb-6 block">Our Vetted Partners</span>
                    <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Locals</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Solo travelers often worry about being alone with a stranger. We only work with vetted, professional guides who become your partners on the trail.
                    </p>
                </div>
            </section>

            {/* Filter + Grid — wrapped in Suspense because GuidesGrid uses useSearchParams */}
            <Suspense fallback={
                <div className="py-40 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-nepal-orange animate-spin" />
                </div>
            }>
                <GuidesGrid guides={guides} />
            </Suspense>
        </main>
    );
}
