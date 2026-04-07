"use client";

import { useState } from "react";
import { X, Calendar, User, Mail, Send } from "lucide-react";

interface AvailabilityFormProps {
    tripTitle: string;
    onClose: () => void;
}

export default function AvailabilityForm({ tripTitle, onClose }: AvailabilityFormProps) {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send data to an API
        setSubmitted(true);
        setTimeout(() => onClose(), 3000);
    };

    if (submitted) {
        return (
            <div className="bg-slate-900 border border-nepal-orange/30 p-8 rounded-2xl text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-nepal-orange/20 rounded-full flex items-center justify-center mx-auto">
                    <Send className="w-8 h-8 text-nepal-orange" />
                </div>
                <h3 className="text-xl font-bold">Inquiry Sent!</h3>
                <p className="text-gray-400">We'll check availability for <strong>{tripTitle}</strong> and get back to you within 2 hours.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl relative animate-in slide-in-from-bottom-4 duration-300">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Check Availability</h3>
                <p className="text-sm text-gray-400">For: <span className="text-nepal-orange">{tripTitle}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            required
                            type="text" 
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-nepal-orange transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Preferred Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                required
                                type="date" 
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-nepal-orange transition-colors text-sm"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                required
                                type="email" 
                                placeholder="john@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-nepal-orange transition-colors text-sm"
                            />
                        </div>
                    </div>
                </div>

                <button 
                    type="submit"
                    className="w-full bg-nepal-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-nepal-orange/20 flex items-center justify-center gap-2"
                >
                    Request Dates <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest mt-4">
                    No payment required now • 2h response time
                </p>
            </form>
        </div>
    );
}

// Helper component for ArrowRight within the form
function ArrowRight({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
    );
}
