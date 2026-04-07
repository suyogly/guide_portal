import { BadgeCheck, Clock, Navigation } from "lucide-react";

export default function TrustStrip() {
    return (
        <div className="w-full bg-slate-900 border-y border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 md:px-16 py-6 md:py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
                            Your guide, your pace, <span className="text-nepal-orange">no agency markup</span>.
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Connect directly with independent, licensed local experts.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                <BadgeCheck className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">100% Verified</div>
                                <div className="text-gray-500 text-xs">NTB Licensed Guides</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <Clock className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">Fast Response</div>
                                <div className="text-gray-500 text-xs">Avg. Time ~ 2hrs</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                <Navigation className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">Direct Match</div>
                                <div className="text-gray-500 text-xs">We vet, you choose</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
