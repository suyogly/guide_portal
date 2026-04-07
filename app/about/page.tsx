"use client";

import { motion } from "framer-motion";
import { Mountain, Users, Heart, ArrowRight, ShieldCheck, Star } from "lucide-react";
import MissionStatement from "@/components/MissionStatement";
import TeamGrid from "@/components/TeamGrid";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24">
            {/* Cinematic Hero */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Himalayan landscape"
                    />
                    <div className="absolute inset-0 bg-slate-950/70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-nepal-orange text-[13px] font-bold mb-8 tracking-widest uppercase backdrop-blur-md"
                    >
                        Established 2026
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-display font-bold text-white mb-8 tracking-tighter"
                    >
                        Our Mission is <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-orange to-orange-400">Your Journey.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        TrekGuide Hub isn&apos;t just a booking platform. We&apos;re a community-driven ecosystem dedicated to making Himalayan trekking safer for you and fairer for the locals who make it possible.
                    </motion.p>
                </div>
            </section>

            {/* Stats / Proof Points */}
            <section className="py-20 relative z-20 -mt-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { label: "Vetted Guides", value: "250+", icon: <Users className="w-5 h-5" /> },
                            { label: "Successful Treks", value: "1,200+", icon: <Mountain className="w-5 h-5" /> },
                            { label: "Fair Trade Score", value: "A+", icon: <Star className="w-5 h-5" /> },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-[2.5rem] bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center shadow-2xl"
                            >
                                <div className="w-12 h-12 bg-nepal-orange/20 rounded-2xl flex items-center justify-center text-nepal-orange mb-6">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-display font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story/Mission Section */}
            <MissionStatement />

            {/* Team Grid */}
            <TeamGrid />

            {/* Core Values / Why Us */}
            <section className="py-24 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20 text-balance">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">The TrekGuide Hub Difference.</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We didn&apos;t just build another travel agency. We built a platform for the solo traveler who demands authenticity and ethics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-nepal-orange mb-8">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Ethical Standards</h3>
                            <p className="text-gray-400 leading-relaxed">
                                We bypass middleman agencies. By connecting you directly with guides, we ensure they receive 100% of their day rate, fostering true local empowerment.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-nepal-orange mb-8">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Community Driven</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Join a circle of adventurers. Our matchmaking algorithm doesn&apos;t just find a guide; it finds a personality that matches your vibe and goals.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-nepal-orange mb-8">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Passionate Root</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Founded in Thamel by locals and expats who believe that tourism should be a force for good, preserving the mountains we love.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-16 rounded-[4rem] bg-slate-900 border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-nepal-orange/10 via-transparent to-transparent" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Join the Movement.</h2>
                            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                                Whether you&apos;re an expat looking for a weekend escape or a solo traveler conquering Everest, we&apos;re here to make it happen ethically.
                            </p>
                            <Link
                                href="/guides"
                                className="inline-flex items-center gap-2 bg-nepal-orange hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl shadow-orange-500/20 group"
                            >
                                Pick Your Guide
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
