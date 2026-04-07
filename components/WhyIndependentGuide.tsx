import { DollarSign, Map, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function WhyIndependentGuide() {
    return (
        <section className="py-20 px-4 bg-slate-900/30 border-t border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-nepal-orange/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-nepal-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">The Direct Advantage</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Why Hire an Independent Guide?</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Skip the agency markup. Connect directly with licensed local experts for a more authentic, affordable, and flexible journey.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Cost Benefit */}
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 hover:border-nepal-orange/30 transition-colors">
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <DollarSign className="w-7 h-7 text-emerald-400" />
                        </div>
                        <h3 className="text-white text-xl font-bold mb-3">No Middleman</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Agencies charge massive premiums. By booking directly, you pay the guide a fair wage and typically <strong className="text-emerald-400">save $800–$1,200</strong> on standard trek routes.
                        </p>
                    </div>

                    {/* Flexibility Benefit */}
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 hover:border-nepal-orange/30 transition-colors">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <Map className="w-7 h-7 text-blue-400" />
                        </div>
                        <h3 className="text-white text-xl font-bold mb-3">Your Itinerary</h3>
                        <p className="text-gray-400 leading-relaxed">
                            No rigid group schedules. Want to sleep in? Take an extra acclimatization day? Hike a side peak? It's <strong className="text-white">your pace</strong> and your decisions.
                        </p>
                    </div>

                    {/* License/Law Benefit */}
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 hover:border-nepal-orange/30 transition-colors">
                        <div className="w-14 h-14 bg-nepal-orange/10 rounded-2xl flex items-center justify-center mb-6">
                            <ShieldCheck className="w-7 h-7 text-nepal-orange" />
                        </div>
                        <h3 className="text-white text-xl font-bold mb-3">NTB Licensed</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Every guide on this platform is officially certified by the Nepal Tourism Board. You get the same <strong className="text-white">expert safety</strong> as a high-end agency.
                        </p>
                    </div>
                </div>

                {/* 2023 Law Callout */}
                <div className="bg-slate-950/80 border border-red-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto shadow-2xl">
                    <div className="bg-red-500/10 p-4 rounded-full flex-shrink-0">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-2">2023 Mandatory Guide Policy</h4>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                            As of April 2023, the Nepal Tourism Board requires all foreign trekkers (excluding the Everest region) to be accompanied by a licensed climbing guide. Traveling "solo" without a team is still possible—you just need a dedicated local guide to ensure your safety.
                        </p>
                        <Link href="/safety" className="text-nepal-orange text-sm font-bold hover:underline">
                            Read the full safety policy and guidelines →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
