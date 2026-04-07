import { BadgeCheck, Clock, Navigation } from "lucide-react";

interface FinalCtaStripProps {
    trekName?: string;
}

export default function FinalCtaStrip({ trekName = "EBC" }: FinalCtaStripProps) {
    return (
        <section className="bg-slate-900 border-y border-white/10 relative overflow-hidden my-20">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-nepal-orange/10 to-transparent opacity-50 mix-blend-screen pointer-events-none transform translate-x-1/4 -translate-y-1/4" />

            <div className="max-w-7xl mx-auto px-4 md:px-16 py-20 relative z-10 text-center">
                <span className="text-nepal-orange text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Peak Season Approaching</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                    Ready to Trek {trekName} <span className="text-nepal-orange">Your Way?</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Skip the package tours. Hire an independent, 5-star mountain guide and save up to $800 on your {trekName === "EBC" ? "Everest" : trekName} adventure.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                    <button className="w-full sm:w-auto bg-nepal-orange hover:bg-orange-500 text-white px-10 py-5 rounded-full font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-all text-lg">
                        Find My Guide
                    </button>
                    <button className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all text-lg">
                        Ask a Local Expert
                    </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-3 text-left">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 flex-shrink-0">
                            <BadgeCheck className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm">Verified Guides</div>
                            <div className="text-gray-500 text-xs mt-0.5">NTB Licensed</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-left">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
                            <Clock className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm">Fast Matching</div>
                            <div className="text-gray-500 text-xs mt-0.5">Avg Response ~ 2hrs</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-left">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 flex-shrink-0">
                            <Navigation className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm">Money-Back Guarantee</div>
                            <div className="text-gray-500 text-xs mt-0.5">Book with confidence</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
