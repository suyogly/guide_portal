"use client";

import { motion } from "framer-motion";
import { CreditCard, FileDigit, Image, UserCheck } from "lucide-react";

const requirements = [
    {
        title: "Passport",
        desc: "Must be valid for at least 6 months from the date of arrival in Nepal.",
        icon: <UserCheck className="w-6 h-6" />,
    },
    {
        title: "Fees (USD)",
        desc: "15 Days: $30 | 30 Days: $50 | 90 Days: $125. Credit card and cash (major currencies) are accepted.",
        icon: <CreditCard className="w-6 h-6" />,
    },
    {
        title: "Photos",
        desc: "One passport-sized digital photo (for online form) and a few physical copies just in case.",
        icon: <Image className="w-6 h-6" />,
    },
    {
        title: "Form Details",
        desc: "You'll need your hotel address in Kathmandu and travel insurance details handy.",
        icon: <FileDigit className="w-6 h-6" />,
    },
];

export default function VisaRequirementCards() {
    return (
        <section className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {requirements.map((req, index) => (
                    <motion.div
                        key={req.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
                    >
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/60 mb-6 group-hover:text-nepal-orange transition-colors">
                            {req.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3">{req.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {req.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
