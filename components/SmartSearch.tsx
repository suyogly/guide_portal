"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, DollarSign, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const REGIONS = [
    "All Regions",
    "Everest Region",
    "Annapurna Region",
    "Manaslu Region",
    "Langtang Region",
    "Western Region",
];

const RATE_OPTIONS = [
    { label: "Any Budget", value: "" },
    { label: "≤ $25 / day", value: "25" },
    { label: "≤ $30 / day", value: "30" },
    { label: "≤ $35 / day", value: "35" },
];

function SmartSearchInner() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState("All Regions");
    const [maxRate, setMaxRate] = useState("");

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        if (region && region !== "All Regions") params.set("region", region);
        if (maxRate) params.set("maxRate", maxRate);
        router.push(`/guides${params.size ? `?${params.toString()}` : ""}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-full max-w-4xl mx-auto"
        >
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-nepal-orange to-himalayan-blue rounded-3xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
                <div className="relative flex flex-col md:flex-row items-stretch bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl md:rounded-full p-2 md:p-1.5 shadow-2xl gap-1 md:gap-0">

                    {/* Text search */}
                    <div className="flex-[2] flex items-center gap-3 px-5 py-3 md:border-r border-white/10 hover:bg-white/5 rounded-2xl md:rounded-none transition-colors">
                        <Search className="w-4 h-4 text-nepal-orange shrink-0" />
                        <div className="flex flex-col items-start w-full min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1">Search</span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Guide name, route, specialty…"
                                className="bg-transparent text-white font-medium focus:outline-none w-full text-sm placeholder:text-gray-500"
                            />
                        </div>
                    </div>

                    {/* Region dropdown */}
                    <div className="flex-1 flex items-center gap-3 px-5 py-3 md:border-r border-white/10 hover:bg-white/5 rounded-2xl md:rounded-none transition-colors cursor-pointer group/item">
                        <MapPin className="w-4 h-4 text-nepal-orange shrink-0" />
                        <div className="flex flex-col items-start w-full min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1">Region</span>
                            <select
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="bg-transparent text-white font-medium focus:outline-none appearance-none cursor-pointer w-full text-sm"
                            >
                                {REGIONS.map((r) => (
                                    <option key={r} value={r} className="bg-slate-900">{r}</option>
                                ))}
                            </select>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500 ml-auto group-hover/item:text-nepal-orange transition-colors shrink-0" />
                    </div>

                    {/* Rate dropdown */}
                    <div className="flex-1 flex items-center gap-3 px-5 py-3 hover:bg-white/5 rounded-2xl md:rounded-none transition-colors cursor-pointer group/item">
                        <DollarSign className="w-4 h-4 text-nepal-orange shrink-0" />
                        <div className="flex flex-col items-start w-full min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1">Daily Rate</span>
                            <select
                                value={maxRate}
                                onChange={(e) => setMaxRate(e.target.value)}
                                className="bg-transparent text-white font-medium focus:outline-none appearance-none cursor-pointer w-full text-sm"
                            >
                                {RATE_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>
                                ))}
                            </select>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500 ml-auto group-hover/item:text-nepal-orange transition-colors shrink-0" />
                    </div>

                    {/* CTA */}
                    <button
                        onClick={handleSearch}
                        className="w-full md:w-auto bg-nepal-orange text-white px-8 py-4 md:py-3.5 rounded-2xl md:rounded-full font-bold shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] hover:scale-[1.02] transition-all whitespace-nowrap md:ml-2"
                    >
                        Find My Guide
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function SmartSearch() {
    return (
        <Suspense fallback={null}>
            <SmartSearchInner />
        </Suspense>
    );
}
