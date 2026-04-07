"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GuideConnectSidebar() {
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
        <div className="sticky top-28 bg-slate-900/50 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
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
                            <span className="text-nepal-orange text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block flex items-center gap-2">
                                <Users className="w-4 h-4" /> Personal Matchmaking
                            </span>
                            <h3 className="text-2xl font-display font-bold text-white mb-3">Connect With A Local expert</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Not sure which guide is right? Our specialist will personally introduce you to a vetted partner who matches your vibe.
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-nepal-orange/50 focus:ring-1 focus:ring-nepal-orange/20 transition-all text-sm"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">WhatsApp or Email</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-nepal-orange/50 focus:ring-1 focus:ring-nepal-orange/20 transition-all text-sm"
                                    placeholder="+1 234..."
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Preferred Region</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-nepal-orange/50 focus:ring-1 focus:ring-nepal-orange/20 transition-all appearance-none cursor-pointer text-sm">
                                    <option className="bg-slate-900" value="general">I'm flexible</option>
                                    <option className="bg-slate-900" value="everest">Everest Region</option>
                                    <option className="bg-slate-900" value="annapurna">Annapurna Region</option>
                                    <option className="bg-slate-900" value="manaslu">Manaslu Region</option>
                                </select>
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full group bg-nepal-orange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 mt-6"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Start Connection</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                className="w-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 mt-2 text-sm"
                                onClick={() => window.open('https://wa.me/9779800000000', '_blank')}
                            >
                                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                                Chat via WhatsApp
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
                            <h3 className="text-2xl font-display font-bold text-white">Request Sent</h3>
                            <p className="text-gray-400 text-sm px-4">
                                Our matchmaking specialist will contact you on WhatsApp/Email within 24 hours.
                            </p>
                        </div>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-nepal-orange hover:text-orange-400 text-xs font-bold transition-colors uppercase tracking-widest"
                        >
                            Send another request
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-nepal-orange shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs text-white font-bold mb-1">Direct Local Pay</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">No agency commissions. 100% of your rate goes directly to the guide.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
