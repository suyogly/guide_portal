"use client";

import { motion } from "framer-motion";
import { Info, Globe, ShieldCheck, ArrowRight, HelpCircle, ExternalLink } from "lucide-react";
import VisaRoadmap from "@/components/VisaRoadmap";
import VisaRequirementCards from "@/components/VisaRequirementCards";
import Link from "next/link";

export default function VisaInfoPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-20">
            {/* Page Hero */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-blue-600/10" />
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-himalayan-blue/10 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-nepal-orange text-[13px] font-bold mb-8 tracking-widest uppercase"
                    >
                        <Globe className="w-4 h-4" />
                        Travel Smoothly
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-display font-bold text-white mb-8 tracking-tighter"
                    >
                        Your Gateway to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-orange to-orange-400">Nepal Mastery</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Navigating immigration doesn&apos;t have to be a trek. Follow our roadmap for a stress-free arrival in the land of the mountains.
                    </motion.p>
                </div>
            </section>

            {/* Quick Reference Requirements */}
            <section className="max-w-7xl mx-auto px-4 mb-24">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-display font-bold text-white mb-4">Quick Checklist</h2>
                        <p className="text-gray-400">
                            The essentials you need to have ready before you board your flight to Kathmandu.
                        </p>
                    </div>
                    <a
                        href="https://nepaliport.immigration.gov.np/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-nepal-orange hover:text-orange-400 transition-colors"
                    >
                        Official Online Form <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
                <VisaRequirementCards />
            </section>

            {/* Step-by-Step Roadmap */}
            <section className="relative py-24 bg-white/[0.01] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-white mb-4">The Arrival Roadmap</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A clear, end-to-end process from your home country to the moment you step out of Tribhuvan International Airport.
                        </p>
                    </div>
                    <VisaRoadmap />
                </div>
            </section>

            {/* Important Notes / Tips */}
            <section className="max-w-7xl mx-auto px-4 my-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 space-y-4">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                            <Info className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Visa Extensions</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Need more time? You can extend your visa for up to 150 days per calendar year at the Immigration Office in Kathmandu or Pokhara.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 space-y-4">
                        <div className="w-10 h-10 bg-nepal-orange/10 rounded-xl flex items-center justify-center text-nepal-orange">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Gratis Visa</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Citizens of SAARC countries (except Afghanistan) and Chinese nationals are eligible for a free (Gratis) visa for a limited period.
                        </p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-nepal-orange to-orange-600 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xl font-bold text-white mb-4">Found your Way?</h3>
                        <p className="text-white/80 text-sm mb-6 max-w-[200px]">
                            Now that the legalities are sorted, let&apos;s pick your adventure.
                        </p>
                        <Link href="/destinations" className="bg-white text-nepal-orange px-6 py-2 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform">
                            Browse Itineraries
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <HelpCircle className="w-12 h-12 text-white/10 mx-auto mb-4" />
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Common Questions</h2>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            q: "Is 'On Arrival' visa available for everyone?",
                            a: "Most nationalities can get a visa on arrival. However, citizens of some countries must apply at their local Nepal Embassy before travel. Check the official list if you're unsure."
                        },
                        {
                            q: "What currency should I use for the fee?",
                            a: "US Dollars are preferred and fastest. However, other major currencies like EUR, GBP, AUD, and CAD are also accepted at the bank counter."
                        },
                        {
                            q: "Do I need a separate visa for trekking?",
                            a: "No, your tourist visa covers all travel. However, you will need specific trekking permits (TIMS/National Park) for the trails, which we handle for you."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5">
                            <h4 className="text-lg font-bold text-white mb-2">{faq.q}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
