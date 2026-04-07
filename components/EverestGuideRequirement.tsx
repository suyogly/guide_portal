export function EverestGuideRequirement() {
    return (
        <section className="mt-20 px-4">
            <div className="max-w-4xl mx-auto bg-slate-900 border border-nepal-orange/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(255,107,0,0.1)]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-nepal-orange/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-himalayan-blue/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="inline-block bg-nepal-orange/10 border border-nepal-orange/20 text-nepal-orange px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        Important 2023 Mandate
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                        Trekking the Everest Region? <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-orange to-orange-400">
                            A Licensed Guide Is Now Required
                        </span>
                    </h2>

                    <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                        <p>
                            Nepal's government officially mandated in 2023 that all trekkers in the Khumbu/Everest region must be accompanied by a licensed guide — solo independent trekking is no longer permitted. But beyond the legal requirement, the trails here genuinely demand local expertise.
                        </p>

                        <p>
                            Altitude changes rapidly, weather shifts without warning above 4,000m, and the difference between a good day and a medical emergency can come down to someone who knows when to push and when to turn back.
                        </p>

                        <p>
                            A licensed professional guide registered with the Nepal Tourism Board brings more than just trail knowledge — they carry permits, coordinate with tea houses, speak the local dialect, and are trained in altitude sickness response. This is not a porter or a casual fixer. <strong className="text-white">This is a certified mountain professional.</strong>
                        </p>

                        <div className="bg-slate-950/50 rounded-xl p-6 border border-white/5 my-8">
                            <h3 className="text-xl font-bold text-white mb-4">When hiring a guide for the Everest region:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                    <span>Always verify their NTB (Nepal Tourism Board) license number.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                    <span>Check their specific experience on your chosen route — EBC, Gokyo, or Three Passes.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                    <span>Ensure they carry a valid trekking guide ID card.</span>
                                </li>
                            </ul>
                        </div>

                        <p className="font-medium text-white italic border-l-4 border-nepal-orange pl-4 py-2 bg-white/5 rounded-r-lg">
                            We connect trekkers directly with verified, licensed local guides for every Everest region route — no middlemen, fully transparent.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
