import { Coins, Handshake, Map } from "lucide-react";

export default function ValueProposition() {
    return (
        <section className="bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-nepal-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Why Us vs Agencies?</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Trek Your Way, <br className="hidden md:block" />Save Up to $800</h2>
                <p className="text-gray-400 text-lg">
                    We connect you directly with local experts, cutting out the middlemen and agency markups.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/5 space-y-4">
                    <div className="w-12 h-12 bg-nepal-orange/10 rounded-xl flex items-center justify-center border border-nepal-orange/20">
                        <Handshake className="w-6 h-6 text-nepal-orange" />
                    </div>
                    <h3 className="text-xl font-bold text-white">No Middleman</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Say goodbye to agency markups. 100% of your guide fee goes directly to the local expert leading your trek.
                    </p>
                </div>

                <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/5 space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                        <Map className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Your Itinerary, Your Pace</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Don't get stuck in a rigid group schedule. Your private guide adjusts the pace and rest days to suit you.
                    </p>
                </div>

                <div className="bg-slate-950/50 p-8 rounded-2xl border border-white/5 space-y-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                        <Coins className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Fixed Transparent Price</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Pay a flat daily rate. You cover your own food and lodges directly—meaning no hidden margins built into a "package".
                    </p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-slate-950 to-slate-900 rounded-2xl p-8 border border-nepal-orange/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-nepal-orange/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">The Independence Advantage</h4>
                        <p className="text-gray-400">Average cost for a 14-day EBC trek (per person)</p>
                    </div>

                    <div className="flex items-center gap-6 text-center">
                        <div className="opacity-60">
                            <div className="text-sm text-gray-400 mb-1">Standard Agency</div>
                            <div className="text-2xl font-bold line-through text-gray-500">$1,800+</div>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div>
                            <div className="text-sm font-bold text-nepal-orange mb-1 uppercase tracking-wider">Independent Route</div>
                            <div className="text-3xl font-bold text-emerald-400">~$1,000</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
