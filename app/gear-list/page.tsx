"use client";

import { motion } from "framer-motion";
import { Backpack, Wind, AlertCircle, ShoppingBag, ArrowRight, CheckCircle } from "lucide-react";
import GearCategory from "@/components/GearCategory";
import GearChecklist from "@/components/GearChecklist";
import Link from "next/link";

export default function GearListPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-20">
            {/* Page Hero */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-nepal-orange/10 via-transparent to-blue-600/5" />
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-nepal-orange/10 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-nepal-orange text-[13px] font-bold mb-10 tracking-widest uppercase"
                    >
                        <Backpack className="w-4 h-4" />
                        The Definitive Packing Guide
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-display font-bold text-white mb-8 tracking-tighter"
                    >
                        Gear for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-orange to-orange-400">High Himalaya</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Don&apos;t overpack, but don&apos;t under-prepare. Here is exactly what you need for a safe and comfortable solo trek in Nepal.
                    </motion.p>
                </div>
            </section>

            {/* Rent vs Buy Section */}
            <section className="max-w-6xl mx-auto px-4 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <ShoppingBag className="w-32 h-32 text-nepal-orange" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">Rent in Kathmandu?</h2>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            If you don&apos;t want to carry heavy gear across the world, Thamel (Kathmandu) and Lakeside (Pokhara) are gear heavens. You can rent high-quality down jackets, sleeping bags, and trekking poles for $1-$3 per day.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Sleeping bags (-20°C rated)",
                                "Heavyweight down jackets",
                                "Adjustable trekking poles",
                                "Waterproof duffle bags"
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                                    <CheckCircle className="w-5 h-5 text-nepal-orange shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 border-dashed relative flex flex-col justify-center items-center text-center"
                    >
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <AlertCircle className="w-8 h-8 text-white/40" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">One Rule: Never Rent Boots</h3>
                        <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                            Always bring your own boots from home and break them in for at least 2 weeks before you arrive. Blisters are the #1 reason solo trekkers fail to reach their goal.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gear Categories */}
            <section className="max-w-7xl mx-auto px-4 mb-24">
                <div className="mb-16">
                    <h2 className="text-4xl font-display font-bold text-white mb-4">The Essentials Grid</h2>
                    <p className="text-gray-400 max-w-2xl">
                        Everything on this list has been tested by our local guides. Items marked as essential are non-negotiable for high-altitude safety.
                    </p>
                </div>
                <GearCategory />
            </section>

            {/* Interactive Checklist */}
            <section className="relative py-24 bg-gradient-to-b from-transparent via-nepal-orange/5 to-transparent">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-white mb-4">Pack Like a Pro</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Use this interactive checklist to track your preparation. You can even add custom items specific to your hobby (photography, bird watching, etc.).
                        </p>
                    </div>
                    <GearChecklist />
                </div>
            </section>

            {/* Call to Action */}
            <section className="max-w-4xl mx-auto px-4 mt-24">
                <div className="p-12 rounded-[3rem] bg-nepal-orange text-center relative overflow-hidden shadow-2xl shadow-orange-500/20">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                    <div className="relative z-10">
                        <h2 className="text-4xl font-display font-bold text-white mb-6">Ready to hit the trail?</h2>
                        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto font-medium">
                            Now that you have the gear, let&apos;s find the perfect guide to lead the way.
                        </p>
                        <Link href="/guides" className="inline-flex items-center gap-2 bg-white text-nepal-orange px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-xl group">
                            Find My Perfect Guide
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
