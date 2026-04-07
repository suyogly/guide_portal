"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Map, Ticket, Landmark, Info } from "lucide-react";

const permits = [
    {
        id: "tims",
        title: "TIMS Card",
        description: "Trekker's Information Management System. Mandatory for almost all treks in Nepal to ensure safety and data collection.",
        icon: <Ticket className="w-6 h-6" />,
        price: "$20",
        linkText: "Learn about TIMS",
    },
    {
        id: "national-park",
        title: "National Park Permit",
        description: "Required for treks entering National Parks like Sagarmatha (Everest) or Langtang. Supports conservation efforts.",
        icon: <Landmark className="w-6 h-6" />,
        price: "$30",
        linkText: "View National Parks",
    },
    {
        id: "conservation-area",
        title: "APCA/MCAP Permit",
        description: "Mandatory for Annapurna, Manaslu, and Gaurishankar regions. Managed by the National Trust for Nature Conservation.",
        icon: <Map className="w-6 h-6" />,
        price: "$30",
        linkText: "Explore Conservation Areas",
    },
    {
        id: "restricted-area",
        title: "Restricted Area Permit",
        description: "Special permits required for regions like Upper Mustang, Dolpo, or Manaslu. Issued only through local agencies.",
        icon: <ShieldCheck className="w-6 h-6" />,
        price: "$50 - $500",
        linkText: "Check Restricted Zones",
    },
];

export default function PermitCards() {
    return (
        <section className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {permits.map((permit, index) => (
                    <motion.div
                        key={permit.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-nepal-orange/30 transition-all shadow-xl hover:shadow-nepal-orange/5"
                    >
                        <div className="w-12 h-12 bg-nepal-orange/10 rounded-2xl flex items-center justify-center text-nepal-orange mb-6 group-hover:scale-110 transition-transform">
                            {permit.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{permit.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {permit.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-lg font-bold text-nepal-orange">{permit.price}</span>
                            <button className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                                <Info className="w-3 h-3" />
                                Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
