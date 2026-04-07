"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function BookingSidebar() {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="sticky top-8 bg-slate-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-nepal-orange/10 blur-3xl rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="mb-8">
                            <h3 className="text-2xl font-display font-bold text-white mb-2">Book Your Expert Local Guide</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-nepal-orange/20 text-nepal-orange px-3 py-1 rounded-full text-sm font-bold border border-nepal-orange/30">
                                    $35 - $45 / Day
                                </span>
                                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Standard Rate</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                See live availability and finalize your itinerary.
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-nepal-orange/50 focus:ring-1 focus:ring-nepal-orange/20 transition-all"
                                    placeholder="e.g. Tenzing Norgay"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Planned Start Date</label>
                                <input
                                    required
                                    type="date"
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-nepal-orange/50 focus:ring-1 focus:ring-nepal-orange/20 transition-all [color-scheme:dark]"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Travelers</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-nepal-orange/50 focus:ring-1 focus:ring-nepal-orange/20 transition-all appearance-none cursor-pointer">
                                    <option className="bg-slate-900" value="1">1 Person</option>
                                    <option className="bg-slate-900" value="2">2 People</option>
                                    <option className="bg-slate-900" value="3-5">3-5 People</option>
                                    <option className="bg-slate-900" value="6+">6+ Group</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Additional Notes</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-nepal-orange/50 focus:ring-1 focus:ring-nepal-orange/20 transition-all resize-none"
                                    placeholder="Any special requirements or preferred dates?"
                                />
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full group bg-gradient-to-r from-nepal-orange to-orange-700 hover:from-orange-500 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 mt-4"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Match Me With A Guide</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 mt-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open('https://wa.me/9779800000000', '_blank');
                                }}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span>Message on WhatsApp</span>
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center space-y-6"
                    >
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-display font-bold text-white">Inquiry Received!</h3>
                            <p className="text-gray-400">
                                Thank you for your interest. A specialist will contact you shortly to plan your adventure.
                            </p>
                        </div>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-nepal-orange hover:text-orange-400 text-sm font-bold transition-colors"
                        >
                            Send another inquiry
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                <div className="flex items-center gap-4 text-gray-500">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs italic">"They planned my entire EBC trek perfectly!" — Sarah J.</p>
                </div>

                {/* Private Admin Link for Prototype Owner */}
                <Link
                    href="/dashboard/inquiries"
                    className="block text-center text-[10px] font-bold text-slate-600 hover:text-nepal-orange transition-colors uppercase tracking-widest border border-white/5 py-2 rounded-lg hover:bg-white/5"
                >
                    Admin: View All Inquiries
                </Link>
            </div>
        </div>
    );
}

