"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!items || items.length === 0) return null;

    return (
        <section className="space-y-10">
            <div className="flex items-center gap-4">
                <div className="p-3.5 bg-nepal-orange/10 rounded-2xl border border-nepal-orange/20">
                    <HelpCircle className="w-7 h-7 text-nepal-orange" />
                </div>
                <h2 className="text-4xl font-display font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`border rounded-2xl transition-all duration-300 ${openIndex === index
                                ? "bg-white/5 border-white/20 shadow-xl shadow-black/20"
                                : "bg-transparent border-white/5 hover:border-white/10"
                            }`}
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full text-left p-6 flex items-center justify-between group"
                        >
                            <span className={`text-lg font-bold transition-colors ${openIndex === index ? "text-nepal-orange" : "text-gray-200 group-hover:text-white"
                                }`}>
                                {item.question}
                            </span>
                            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-nepal-orange" : ""
                                }`} />
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-0">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
