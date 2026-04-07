import React from "react";
import MatchmakerForm from "@/components/MatchmakerForm";
import { Compass } from "lucide-react";

export default function FindGuidePage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-nepal-orange to-orange-600 mb-6 shadow-lg shadow-orange-500/20">
                        <Compass className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight drop-shadow-md">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-orange to-orange-400">Perfect Guide</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-sm">
                        Tell us where you want to go and what you're looking for, and we'll match you with the best vetted local experts for your adventure.
                    </p>
                </div>

                <div className="relative">
                    {/* Decorative glow */}
                    <div className="absolute top-1/4 -right-40 w-80 h-80 bg-nepal-orange/10 rounded-full blur-[100px] z-0 pointer-events-none" />
                    <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] z-0 pointer-events-none" />

                    <div className="relative z-10 w-full max-w-3xl mx-auto">
                        <MatchmakerForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
