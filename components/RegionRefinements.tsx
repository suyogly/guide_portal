"use client";

import { CheckCircle2, Shield, Award, Calendar, FileText, Info, Star, ChevronDown, Download, Mail } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TrustBadges() {
    return (
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 group">
                <Shield className="w-8 h-8 text-nepal-orange transition-transform group-hover:scale-110" />
                <span className="font-bold text-white/50 group-hover:text-white">100% Verified Local Guides</span>
            </div>
            <div className="flex items-center gap-2 group">
                <CheckCircle2 className="w-8 h-8 text-nepal-orange transition-transform group-hover:scale-110" />
                <span className="font-bold text-white/50 group-hover:text-white">Sustainable Tourism Partner</span>
            </div>
            <div className="flex items-center gap-2 group">
                <Award className="w-8 h-8 text-nepal-orange transition-transform group-hover:scale-110" />
                <span className="font-bold text-white/50 group-hover:text-white">Nepal Tourism Board Affiliated</span>
            </div>
        </div>
    );
}

export function ContentHub({ regionName }: { regionName: string }) {
    const isManaslu = regionName?.toLowerCase().includes("manaslu");
    const sections = [
        {
            title: "Best Time to Visit",
            icon: <Calendar className="w-6 h-6 text-nepal-orange" />,
            content: `The ideal windows for the ${regionName} are Spring (March to May) and Autumn (September to November). Spring offers blooming rhododendrons, while Autumn provides the clearest mountain views.`
        },
        {
            title: "Permits Required",
            icon: <FileText className="w-6 h-6 text-nepal-orange" />,
            content: isManaslu 
                ? "The Manaslu region requires a Special Restricted Area Permit (RAP), plus MCAP (Manaslu) and ACAP (Annapurna) conservation permits. We handle all paperwork for our trekkers."
                : `For the Everest region, you'll need the Sagarmatha National Park Permit and the Khumbu Pasang Lhamu Rural Municipality ticket. We handle all paperwork for our trekkers.`
        },
        {
            title: "What to Expect",
            icon: <Info className="w-6 h-6 text-nepal-orange" />,
            content: isManaslu 
                ? "Expect fewer crowds, spectacular Tibetan-influenced culture, and rugged terrain culminating at the 5,106m Larke Pass. Proper acclimatization and a registered guide are essential."
                : "Expect cozy teahouses, hearty Dal Bhat, and challenging but rewarding terrain. Acclimatization is key, and our itineraries are designed for safety and success."
        }
    ];

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                    <div className="bg-nepal-orange/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                        {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{section.content}</p>
                </div>
            ))}
        </div>
    );
}

export function Testimonials({ regionName = "Everest" }: { regionName?: string }) {
    const isManaslu = regionName?.toLowerCase().includes("manaslu");
    const reviews = isManaslu ? [
        {
            name: "David Chen",
            location: "Australia",
            text: "The Manaslu Circuit offered exactly the pristine, uncrowded experience I was looking for. Crossing the Larkye La was challenging but totally worth it. Our guide was exceptional.",
            rating: 5
        },
        {
            name: "Emma Mueller",
            location: "Germany",
            text: "Culturally rich and incredibly scenic. Staying in the Nubri and Tsum valley villages was an unforgettable experience. Much quieter than Annapurna!",
            rating: 5
        }
    ] : [
        {
            name: "Sarah Jenkins",
            location: "United Kingdom",
            text: "The EBC trek was a dream come true. Our Sherpa guide was incredibly knowledgeable and kept us safe every step of the way. Booking through this platform made everything seamless.",
            rating: 5
        },
        {
            name: "Marco Rossi",
            location: "Italy",
            text: "Gokyo Lakes is the most beautiful place I've ever seen. The expertise of the local guides here is unmatched. Highly recommend!",
            rating: 5
        }
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8 text-left">
            {reviews.map((review, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Star className="w-24 h-24 fill-nepal-orange text-nepal-orange" />
                    </div>
                    <div className="flex gap-1 mb-6">
                        {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-nepal-orange text-nepal-orange" />
                        ))}
                    </div>
                    <p className="text-gray-300 italic mb-6 relative z-10 text-lg">"{review.text}"</p>
                    <div>
                        <p className="font-bold text-white">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function FAQSection({ regionName = "Everest" }: { regionName?: string }) {
    const isManaslu = regionName?.toLowerCase().includes("manaslu");
    const faqs = isManaslu ? [
        {
            question: "Do I need a special permit for the Manaslu Circuit?",
            answer: "Yes, Manaslu is a restricted area. You must have a Special Restricted Area Permit (RAP) issued by immigration, plus Manaslu and Annapurna Conservation Area permits."
        },
        {
            question: "Can I trek Manaslu without a guide?",
            answer: "No. The Nepal government requires all trekkers in the Manaslu region to have a licensed guide. Additionally, you must be in a group of at least two trekkers to obtain the permit."
        },
        {
            question: "How does Manaslu compare to the Annapurna Circuit?",
            answer: "Manaslu is far less crowded, more culturally intact (Tibetan-influenced), and has no roads on the main trekking route, offering a more pristine and rugged experience compared to the modern Annapurna Circuit."
        }
    ] : [
        {
            question: "How hard is it to trek in the Everest region?",
            answer: "Most treks are moderate to difficult. You don't need technical climbing skills, but you should be in good physical condition and prepared for high altitudes."
        },
        {
            question: "Do I need a guide for my trek?",
            answer: "As of 2026, the Nepal government requires most treks to be accompanied by a licensed guide for safety. It also supports the local economy and ensures you have expert help in case of altitude sickness."
        },
        {
            question: "What is the food like in teahouses?",
            answer: "You'll find a mix of local and western dishes. Dal Bhat (lentils and rice) is the staple and best for energy. Most teahouses also serve pasta, potatoes, and even pizza."
        }
    ];

    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <div className="max-w-3xl mx-auto text-left">
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                        <button
                            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                        >
                            <span className="font-bold text-white">{faq.question}</span>
                            <ChevronDown className={`w-5 h-5 text-nepal-orange transition-transform ${openIdx === idx ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                            {openIdx === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(f => ({
                            "@type": "Question",
                            "name": f.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": f.answer
                            }
                        }))
                    })
                }}
            />
        </div>
    );
}

export function LeadMagnet() {
    return (
        <div className="bg-nepal-orange rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48"></div>
            <div className="relative z-10 flex-1 text-center md:text-left">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                    <Download className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                    Free 2026 Everest Packing List & Prep Guide
                </h2>
                <p className="text-white/80 text-lg mb-0 max-w-xl">
                    Don't forget the essentials. Download our expert-verified gear list and training plan for a successful summit.
                </p>
            </div>
            <div className="relative z-10 w-full md:w-auto min-w-[320px]">
                <div className="bg-white p-2 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-2xl">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-1 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-nepal-orange text-slate-900"
                    />
                    <button className="bg-slate-950 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                        Get It Now <Mail className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[10px] text-white/60 mt-4 text-center">
                    Join 5,000+ trekkers. No spam, just high-altitude value.
                </p>
            </div>
        </div>
    );
}
