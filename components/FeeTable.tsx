"use client";

import { motion } from "framer-motion";

const feeData = [
    {
        region: "Everest (Sagarmatha)",
        permits: ["TIMS", "National Park Entry"],
        totalUSD: "$50",
        notes: "Price varies for SAARC nationals.",
    },
    {
        region: "Annapurna Circuit/Base Camp",
        permits: ["TIMS", "ACAP Permit"],
        totalUSD: "$50",
        notes: "Covers the entire Annapurna range.",
    },
    {
        region: "Manaslu Circuit",
        permits: ["TIMS", "MCAP Permit", "Restricted Area Permit (RAP)"],
        totalUSD: "$150+",
        notes: "RAP cost depends on the season (higher in Autumn).",
    },
    {
        region: "Langtang Valley",
        permits: ["TIMS", "National Park Entry"],
        totalUSD: "$50",
        notes: "Short treks, easy permit process.",
    },
    {
        region: "Upper Mustang",
        permits: ["TIMS", "ACAP Permit", "Restricted Area Permit (RAP)"],
        totalUSD: "$500+",
        notes: "RAP is $500 for the first 10 days, $50/day after.",
    },
];

export default function FeeTable() {
    return (
        <section className="py-12 overflow-x-auto">
            <div className="min-w-[800px] bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
                <div className="grid grid-cols-4 gap-4 p-8 border-b border-white/10 bg-white/5">
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Region</div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Required Permits</div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Approx. Total</div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Key Notes</div>
                </div>
                <div className="divide-y divide-white/5">
                    {feeData.map((item, index) => (
                        <motion.div
                            key={item.region}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-4 gap-4 p-8 hover:bg-white/5 transition-colors group"
                        >
                            <div className="font-bold text-white group-hover:text-nepal-orange transition-colors">
                                {item.region}
                            </div>
                            <div className="space-y-1">
                                {item.permits.map(permit => (
                                    <span key={permit} className="block text-sm text-gray-400">
                                        • {permit}
                                    </span>
                                ))}
                            </div>
                            <div className="text-lg font-bold text-white">
                                {item.totalUSD}
                            </div>
                            <div className="text-sm text-gray-500 italic leading-relaxed">
                                {item.notes}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <p className="mt-6 text-center text-xs text-gray-600">
                * Fees are subject to change by the Nepal Tourism Board. SAARC nationals may be eligible for discounted rates.
            </p>
        </section>
    );
}
