"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Simulate submission
        setTimeout(() => setStatus("success"), 1500);
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-[500px] flex flex-col items-center justify-center text-center p-8 bg-slate-900/50 border border-nepal-orange/20 rounded-[2.5rem] backdrop-blur-xl"
            >
                <div className="w-20 h-20 bg-nepal-orange/10 rounded-full flex items-center justify-center text-nepal-orange mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-gray-400 max-w-sm">
                    Thank you for reaching out. One of our adventure specialists will get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-nepal-orange font-bold hover:underline"
                >
                    Send another message
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Full Name</label>
                    <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-nepal-orange/50 transition-all placeholder:text-gray-700"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Email Address</label>
                    <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-nepal-orange/50 transition-all placeholder:text-gray-700"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Inquiry Type</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-nepal-orange/50 transition-all appearance-none">
                    <option className="bg-slate-900">General Inquiry</option>
                    <option className="bg-slate-900">Booking Support</option>
                    <option className="bg-slate-900">Custom Itinerary</option>
                    <option className="bg-slate-900">Guide Partnership</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Your Message</label>
                <textarea
                    required
                    rows={6}
                    placeholder="Tell us about your dream trek..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-nepal-orange/50 transition-all placeholder:text-gray-700 resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-nepal-orange hover:bg-orange-600 disabled:bg-gray-700 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 group"
            >
                {status === "submitting" ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                    <>
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    );
}
