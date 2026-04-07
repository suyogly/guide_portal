"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Check } from "lucide-react";

interface StyleQuizProps {
    isOpen: boolean;
    onClose: () => void;
}

const questions = [
    {
        id: "style",
        question: "What is your trekking style?",
        options: [
            { label: "Fast & Athletic", value: "fast", desc: "I want a challenge and high passes." },
            { label: "Photographer / Slow", value: "slow", desc: "I take my time and enjoy the view." },
            { label: "Cultural / Chatty", value: "cultural", desc: "I love connecting with locals." },
        ],
    },
    {
        id: "budget",
        question: "What is your budget per day?",
        options: [
            { label: "Shoestring", value: "budget", desc: "Porter guide only, basics." },
            { label: "Standard", value: "standard", desc: "Good teahouses, certified guide." },
            { label: "Comfort", value: "luxury", desc: "Best lodges, attached bathroom when available." },
        ],
    },
    {
        id: "company",
        question: "Who do you want to trek with?",
        options: [
            { label: "Private Guide/Porter", value: "private", desc: "Just me and the guide." },
            { label: "Join a Group", value: "group", desc: "I want to save money and meet people." },
        ],
    },
];

export default function StyleQuiz({ isOpen, onClose }: StyleQuizProps) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSelect = (value: string) => {
        setAnswers({ ...answers, [questions[step].id]: value });
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call or matching logic
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        // Alert for now, user can replace with redirection or specific logic
        alert("Thanks! We found 3 perfect guides for you. (Mock Result)");
        onClose();
        setStep(0);
        setAnswers({});
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
                <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="p-8">
                        <div className="mb-6">
                            <span className="text-nepal-orange text-xs font-bold tracking-wider uppercase">
                                Step {step + 1} of {questions.length}
                            </span>
                            <h2 className="text-2xl font-bold mt-2 text-white">
                                {questions[step].question}
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {questions[step].options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-nepal-orange/50 hover:bg-white/5 transition-all group flex items-center justify-between"
                                >
                                    <div>
                                        <div className="font-bold text-lg text-white group-hover:text-nepal-orange transition-colors">
                                            {option.label}
                                        </div>
                                        <div className="text-sm text-gray-400 mt-1">
                                            {option.desc}
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-nepal-orange" />
                                </button>
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-8 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-nepal-orange"
                                initial={{ width: "0%" }}
                                animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
