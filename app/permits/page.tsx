"use client";

import { motion } from "framer-motion";
import { Info, AlertTriangle, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import PermitCards from "@/components/PermitCards";
import FeeTable from "@/components/FeeTable";
import Link from "next/link";

export default function PermitsPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-20">
            {/* Page Hero */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-nepal-orange/5 via-transparent to-transparent blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-nepal-orange text-sm font-bold mb-8"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Official 2026 Guidelines
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight"
                    >
                        Permits & <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-orange to-orange-400">Trekking Fees</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Everything you need to know about the legal requirements, costs, and the new 2026 mandatory guide policy for solo travelers in Nepal.
                    </motion.p>
                </div>
            </section>

            {/* Mandatory Guide Alert */}
            <section className="max-w-4xl mx-auto px-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-nepal-orange/20 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertTriangle className="w-24 h-24 text-nepal-orange rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-nepal-orange rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <AlertTriangle className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">2026 Mandatory Guide Policy</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            As of 2026, the Nepal Tourism Board has updated the safety regulations for solo travelers. Most major trekking regions (including Everest, Annapurna, and Manaslu) now <strong>require</strong> all international solo trekkers to be accompanied by a licensed guide.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                <span className="text-sm text-gray-400">Protects solo travelers from getting lost or injured in remote terrain.</span>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                <span className="text-sm text-gray-400">Supports the local economy and professionalizes the guiding industry.</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Link href="/guides" className="inline-flex items-center gap-2 bg-nepal-orange hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-orange-500/20 group">
                                Find a Certified Guide
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Permit Types Grid */}
            <section className="max-w-7xl mx-auto px-4 mb-20">
                <div className="mb-12">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Core Permit Types</h2>
                    <p className="text-gray-400 max-w-2xl">
                        Depending on your destination, you will need a combination of these permits. We handle these applications for you when you book through our platform.
                    </p>
                </div>
                <PermitCards />
            </section>

            {/* Fee Comparison Table */}
            <section className="max-w-7xl mx-auto px-4 mb-20">
                <div className="mb-12">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Fee Breakdown by Region</h2>
                    <p className="text-gray-400 max-w-2xl">
                        A quick reference guide for budgeting your trek. These fees cover entry and administrative costs to preserve the trails you walk on.
                    </p>
                </div>
                <FeeTable />
            </section>

            {/* FAQ / Help Section */}
            <section className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <HelpCircle className="w-12 h-12 text-nepal-orange mx-auto mb-4 opacity-50" />
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-6">
                    {[
                        {
                            q: "Can I apply for permits myself?",
                            a: "Yes, you can apply at the Nepal Tourism Board offices in Kathmandu or Pokhara. However, Restricted Area Permits (RAP) MUST be applied through a licensed trekking agency."
                        },
                        {
                            q: "Do I need the same permit for Everest and Annapurna?",
                            a: "No. Everest requires a National Park permit (Sagarmatha), while Annapurna requires a Conservation Area permit (ACAP). Both require a TIMS card."
                        },
                        {
                            q: "What documents do I need for the application?",
                            a: "You'll need digital copies of your passport (valid for 6+ months), two passport-sized photos, and your travel insurance details."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                            <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
