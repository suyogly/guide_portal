export function ManasluGuideRequirement() {
    return (
        <section className="mt-20 px-4">
            <div className="max-w-4xl mx-auto bg-slate-900 border border-nepal-orange/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(255,107,0,0.1)]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-nepal-orange/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-himalayan-blue/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="inline-block bg-nepal-orange/10 border border-nepal-orange/20 text-nepal-orange px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        Restricted Area Regulations
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                        Trekking Manaslu? <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-orange to-orange-400">
                            Strict Guide & Group Size Constraints Apply
                        </span>
                    </h2>

                    <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                        <p>
                            Manaslu is a <strong>Restricted Area</strong> under Nepal Government laws due to its proximity to the Tibetan border. Solo independent trekking is completely prohibited here.
                        </p>

                        <p>
                            Unlike Everest or Annapurna where independent trekking was historically common, Manaslu has always required a registered local guide. Furthermore, you must have a minimum group size of two foreign trekkers to even apply for the Restricted Area Permit (RAP).
                        </p>

                        <div className="bg-slate-950/50 rounded-xl p-6 border border-white/5 my-8">
                            <h3 className="text-xl font-bold text-white mb-4">Mandatory Requirements for Manaslu:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                    <span><strong>Licensed Guide</strong> - A professional registered with the Nepal Tourism Board.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                    <span><strong>Minimum Group of 2</strong> - Permit rules dictate you must trek with at least one other foreigner.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                    <span><strong>Special Permits</strong> - Requires RAP, MCAP, and ACAP documents processed through a registered agency.</span>
                                </li>
                            </ul>
                        </div>

                        <p className="font-medium text-white italic border-l-4 border-nepal-orange pl-4 py-2 bg-white/5 rounded-r-lg">
                            We match you with highly-rated local guides from the Nubri and Tsum regions, allowing you to comply with all government regulations while preserving your independence.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
