"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SmartSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [region, setRegion] = useState(searchParams.get("region") || "Everest Region");
    const [gender, setGender] = useState(searchParams.get("gender") || "No Preference");

    const handleMatch = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("region", region);
        params.set("gender", gender);
        params.delete("vibe"); // Remove legacy param if it exists

        router.push(`?${params.toString()}`, { scroll: false });

        const guidesSection = document.getElementById('guides');
        if (guidesSection) {
            guidesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-full max-w-4xl mx-auto"
        >
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-nepal-orange to-himalayan-blue rounded-3xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                <div className="relative flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl md:rounded-full p-2 md:p-1.5 shadow-2xl">
                    {/* Dropdown 1: Where to? */}
                    <div className="flex-1 w-full flex items-center gap-3 px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors cursor-pointer group/item">
                        <MapPin className="w-5 h-5 text-nepal-orange shadow-orange-500/20" />
                        <div className="flex flex-col items-start min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Where to?</span>
                            <select
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="bg-transparent text-white font-medium focus:outline-none appearance-none cursor-pointer w-full text-sm sm:text-base"
                            >
                                <option className="bg-slate-900">Everest Region</option>
                                <option className="bg-slate-900">Annapurna Region</option>
                                <option className="bg-slate-900">Manaslu Region</option>
                                <option className="bg-slate-900">Langtang Region</option>
                                <option className="bg-slate-900">Western Region</option>
                            </select>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500 ml-auto group-hover/item:text-nepal-orange transition-colors" />
                    </div>

                    {/* Dropdown 2: Guide Gender */}
                    <div className="flex-1 w-full flex items-center gap-3 px-6 py-3 hover:bg-white/5 transition-colors cursor-pointer group/item">
                        <Users className="w-5 h-5 text-nepal-orange shadow-orange-500/20" />
                        <div className="flex flex-col items-start min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Guide Gender:</span>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="bg-transparent text-white font-medium focus:outline-none appearance-none cursor-pointer w-full text-sm sm:text-base"
                            >
                                <option className="bg-slate-900">No Preference</option>
                                <option className="bg-slate-900">Female Guide</option>
                                <option className="bg-slate-900">Male Guide</option>
                            </select>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500 ml-auto group-hover/item:text-nepal-orange transition-colors" />
                    </div>

                    <button
                        onClick={handleMatch}
                        className="w-full md:w-auto bg-nepal-orange text-white px-8 py-4 md:py-3.5 rounded-2xl md:rounded-full font-bold shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] hover:scale-[1.02] transition-all whitespace-nowrap md:ml-2"
                    >
                        Find My Perfect Match
                    </button>
                </div>
            </div>

        </motion.div>
    );
}
