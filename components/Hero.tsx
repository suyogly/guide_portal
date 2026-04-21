"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SmartSearch from "./SmartSearch";
import TrustBadges from "./TrustBadges";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            ref={ref}
            className="relative h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden"
        >
            {/* Background Gradient/Image Placeholder */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center"
                />
                <div className="absolute inset-0 bg-blue-950/40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900/90 to-transparent z-10" />
            </div>

            <motion.div
                style={{ y: textY }}
                className="relative z-10 w-full max-w-4xl text-center space-y-8 mt-90"
            >
                {/* Removed 'For the Solo Traveler' tag per request */}
                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white drop-shadow-lg">
                    Walk Your Own Path. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-orange to-orange-400">Together.</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-md">
                    Join a community of like-minded adventurers or find your rhythm with a private guide. The ultimate solo trekking experience in Nepal.
                </p>

                {/* Smart Search */}
                <div className="w-full mt-8 px-4">
                    <SmartSearch />
                </div>

                <div className="pt-8 space-y-4">
                    <TrustBadges />
                    <p className="text-sm font-medium text-gray-400 mt-4">
                        <span className="text-nepal-orange font-bold">2,000+</span> solo trekkers matched with independent licensed guides.
                    </p>
                </div>
            </motion.div>
        </section >
    );
}
