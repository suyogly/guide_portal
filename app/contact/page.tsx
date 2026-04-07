"use client";

import { motion } from "framer-motion";
import { MessageSquare, MapPin, Globe, ArrowRight, HelpCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import Link from "next/link";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-20 overflow-hidden">
            {/* Page Hero */}
            <section className="relative py-24 px-4">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-nepal-orange/10 via-transparent to-blue-600/5" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-nepal-orange/5 via-transparent to-transparent blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-nepal-orange text-[13px] font-bold mb-8 tracking-widest uppercase"
                    >
                        <MessageSquare className="w-4 h-4" />
                        We&apos;re Here to Help
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-display font-bold text-white mb-8 tracking-tighter"
                    >
                        Let&apos;s Start Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-orange to-orange-400">Adventure.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Questions about a trek? Want a custom itinerary for a group? Or just want to say Namaste? We&apos;d love to hear from you.
                    </motion.p>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                    {/* Left Side: Contact Info */}
                    <div>
                        <div className="mb-12">
                            <h2 className="text-3xl font-display font-bold text-white mb-4">Get in Touch</h2>
                            <p className="text-gray-500">
                                Choose the channel that works best for you. Our team is based in Kathmandu and ready to assist you.
                            </p>
                        </div>
                        <ContactInfo />

                        <div className="mt-16 p-8 rounded-3xl bg-white/[0.02] border border-white/5 border-dashed">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-nepal-orange" />
                                Quick Links
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/permits" className="text-sm text-gray-500 hover:text-nepal-orange transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    Permit Info
                                </Link>
                                <Link href="/gear-list" className="text-sm text-gray-500 hover:text-nepal-orange transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    Gear Checklist
                                </Link>
                                <Link href="/visa-info" className="text-sm text-gray-500 hover:text-nepal-orange transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    Visa Guidance
                                </Link>
                                <Link href="/blog" className="text-sm text-gray-500 hover:text-nepal-orange transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    Travel Blog
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full -z-10" />
                        <div className="p-1 pr-1 pb-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent">
                            <div className="bg-slate-900/80 backdrop-blur-3xl p-10 md:p-14 rounded-[2.9rem] shadow-2xl">
                                <div className="mb-10">
                                    <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                                    <p className="text-gray-500 text-sm">Fill out the form below and we&apos;ll be in touch.</p>
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Area Placeholder */}
            <section className="max-w-7xl mx-auto px-4 mt-32 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="h-[400px] rounded-[3rem] bg-slate-900 border border-white/5 relative overflow-hidden group shadow-2xl"
                >
                    <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                        <img
                            src="https://images.unsplash.com/photo-1544735030-c36b36ca78a1?q=80&w=2574&auto=format&fit=crop"
                            alt="Map visualization of Kathmandu"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/60" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-16 h-16 bg-nepal-orange rounded-full flex items-center justify-center text-white mb-4 animate-bounce">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white mb-2">Find Us in Thamel</h3>
                        <p className="text-gray-400 max-w-sm">
                            We are located in the heart of Kathmandu&apos;s trekking district. Drop by for a cup of tea!
                        </p>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
