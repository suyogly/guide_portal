"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Users, Landmark } from "lucide-react";

const values = [
    {
        title: "Local First",
        desc: "We believe in direct support for local economies. 100% of our guides are local experts paid fair, living wages.",
        icon: <Users className="w-6 h-6" />,
    },
    {
        title: "Solo Safety",
        desc: "Solo doesn't mean alone. We provide 24/7 support and certified guides to ensure every journey is safe.",
        icon: <Shield className="w-6 h-6" />,
    },
    {
        title: "Transparent Ethics",
        desc: "No hidden fees, no exploitation. We are building a fair-trade ecosystem for the Himalayan trekking industry.",
        icon: <Landmark className="w-6 h-6" />,
    },
    {
        title: "Real Connection",
        desc: "Our platform isn't just a booking site; it's a bridge between global adventurers and local storytellers.",
        icon: <Heart className="w-6 h-6" />,
    },
];

export default function MissionStatement() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight"
                        >
                            Rewriting the <br />
                            <span className="text-nepal-orange">Trekking Narrative.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-gray-400 text-lg leading-relaxed mb-10"
                        >
                            For too long, solo travelers faced a choice: overpriced group tours or navigating complex logistics alone. Meanwhile, local guides often struggled with unfair commissions. <br /><br />
                            TrekGuide Hub was founded to solve this. We are the first platform that connects you directly with vetted local guides, ensuring a premium experience for you and a fair deal for them.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {values.map((v, i) => (
                                <motion.div
                                    key={v.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="space-y-3"
                                >
                                    <div className="text-nepal-orange">{v.icon}</div>
                                    <h4 className="text-white font-bold">{v.title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1544735030-c36b36ca78a1?q=80&w=2574&auto=format&fit=crop"
                                alt="Local guide leading a trek"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-nepal-orange/20 blur-[80px] rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-600/15 blur-[100px] rounded-full" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
