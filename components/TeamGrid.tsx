"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Twitter } from "lucide-react";

const team = [
    {
        name: "Saroj Sapkota",
        role: "Founder & Lead Designer",
        bio: "Visionary behind the platform, dedicated to bridging the gap between adventurers and authentic Nepal.",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
    },
    {
        name: "Pasang Sherpa",
        role: "Head of Guide Relations",
        bio: "A veteran guide with 20+ years of experience, ensuring every guide on our platform meets the highest standards.",
        img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop",
    },
    {
        name: "Anjali Rai",
        role: "Sustainability Director",
        bio: "Leading our efforts in fair-trade trekking and carbon-neutral adventure initiatives.",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2574&auto=format&fit=crop",
    },
    {
        name: "Tashi Lama",
        role: "Senior Local Guide Specialist",
        bio: "Cultural expert focused on providing deep immersion experiences in the Everest and Langtang regions.",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
    }
];

export default function TeamGrid() {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-white mb-4">Behind the Mission</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A mix of tech visionaries and Himalayan veterans working together to change the way you experience Nepal.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-500">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                                {/* Social Overlay */}
                                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-nepal-orange transition-colors">
                                        <Linkedin className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-nepal-orange transition-colors">
                                        <Twitter className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-nepal-orange transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                            <p className="text-nepal-orange text-sm font-medium mb-3">{member.role}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
