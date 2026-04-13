export function AnnapurnaGuideRequirement() {
    return (
        <section className="mt-20 px-4">
            <div className="max-w-4xl mx-auto bg-slate-900 border border-nepal-orange/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(255,107,0,0.1)]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-nepal-orange/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-himalayan-blue/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="inline-block bg-nepal-orange/10 border border-nepal-orange/20 text-nepal-orange px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        Safety & Legal Mandate
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                        Trekking in Annapurna? <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-orange to-orange-400">
                            A Licensed Guide is Required for 2024
                        </span>
                    </h2>

                    <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                        <p>
                            As of 2023, the Nepal Tourism Board has officially mandated that all international trekkers in the Annapurna region must be accompanied by a licensed guide. Solo independent trekking is no longer permitted on major routes like the Annapurna Circuit and Base Camp.
                        </p>

                        <p>
                            Beyond legal compliance, the Annapurna massif presents unique challenges. From the high-altitude crossing of Thorong La Pass (5,416m) to the complex trail networks of the Mardi Himal, having a professional ensures your safety and improves your overall experience.
                        </p>

                        <div className="bg-slate-950/50 rounded-xl p-6 border border-white/5 my-8">
                            <h3 className="text-xl font-bold text-white mb-4">Why a Licensed Guide is Essential:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                    <span><strong>Safety & Navigation</strong> - Expert knowledge of terrain, weather patterns, and altitude sickness prevention.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                    <span><strong>Legal Compliance</strong> - Licensed guides are required to process the TIMS (Trekkers' Information Management Systems) card.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                    <span><strong>Cultural Connection</strong> - Bridges the language gap and provides deep insights into local Gurung and Magar cultures.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-nepal-orange mt-2 shrink-0" />
                                    <span><strong>Emergency Response</strong> - Trained in first aid and connected to helicopter rescue networks if needed.</span>
                                </li>
                            </ul>
                        </div>

                        <p className="font-medium text-white italic border-l-4 border-nepal-orange pl-4 py-2 bg-white/5 rounded-r-lg">
                            We help you find verified, independent local guides who are licensed, experienced, and passionate about the Annapurna region.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
