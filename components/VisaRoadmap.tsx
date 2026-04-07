"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, FileText, Globe, PlaneLanding, Fingerprint } from "lucide-react";

const steps = [
    {
        id: 0,
        title: "Language & Culture",
        desc: "Learn basic Nepali phrases and understand local etiquette to show respect and build better connections.",
        icon: <Globe className="w-6 h-6" />,
    },
    {
        id: 1,
        title: "Online Pre-Application",
        desc: "Fill out the online visa form on the official Department of Immigration website within 15 days of arrival.",
        icon: <FileText className="w-6 h-6" />,
    },
    {
        id: 2,
        title: "Financial Documentation",
        desc: "Have your trekking budget ready. For some long-stay visas, proof of sufficient funds may be requested.",
        icon: <Fingerprint className="w-6 h-6" />,
    },
    {
        id: 3,
        title: "Arrival at TIA",
        desc: "Head to the 'On Arrival' kiosks. Even with pre-application, you need to use these for payment.",
        icon: <PlaneLanding className="w-6 h-6" />,
    },
    {
        id: 4,
        title: "Fee Payment",
        desc: "Pay at the bank counter inside the airport. Keep the receipt—it's your proof of payment.",
        icon: <Clock className="w-6 h-6" />,
    },
    {
        id: 5,
        title: "Visa Grant",
        desc: "Present your receipt and passport to the immigration officer. Welcome to the Himalayas!",
        icon: <CheckCircle2 className="w-6 h-6" />,
    },
];

export default function VisaRoadmap() {
    return (
        <section className="py-12">
            <div className="relative">
                {/* Vertical Line for Desktop */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

                <div className="space-y-12 md:space-y-0">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Content */}
                            <div className="flex-1 w-full">
                                <div className={`p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-nepal-orange/30 transition-all shadow-xl ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                    }`}>
                                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "justify-start" : "md:justify-end justify-start"
                                        }`}>
                                        <div className="text-nepal-orange font-display font-bold text-lg opacity-50">0{step.id}</div>
                                        <h3 className="text-xl font-bold text-white tracking-tight">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto md:mx-0 inline-block">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Center Dot/Icon */}
                            <div className="relative z-10 w-12 h-12 bg-slate-950 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-nepal-orange/10 border border-nepal-orange/30 flex items-center justify-center text-nepal-orange shadow-lg shadow-orange-500/10">
                                    {step.icon}
                                </div>
                            </div>

                            {/* Spacing for layout */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
