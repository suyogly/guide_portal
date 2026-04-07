import { BadgeCheck, HeartPulse, Languages, Medal, ShieldAlert, Star, UserCheck } from "lucide-react";

export default function GuideCredentials() {
    return (
        <section className="space-y-10">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <span className="text-nepal-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Our Safety Guarantee</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">World-Class Guides, <br />Vetted for Safety</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Every independent expert on our platform undergoes a rigorous 5-point verification process, ensuring your safety in the Himalayas.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl backdrop-blur-sm">
                    <BadgeCheck className="w-8 h-8 text-blue-400" />
                    <div>
                        <div className="text-white font-bold text-sm">Nepal Tourism Board</div>
                        <div className="text-blue-400 text-xs font-medium uppercase tracking-wider">Certified & Licensed</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Credential 1 */}
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl flex items-start gap-4 group hover:border-nepal-orange/50 transition-colors">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-nepal-orange/10 transition-colors">
                        <ShieldAlert className="w-6 h-6 text-white/70 group-hover:text-nepal-orange" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">First Aid & WFR Certified</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Mandatory Wilderness First Responder training and altitude sickness (AMS) recognition.
                        </p>
                    </div>
                </div>

                {/* Credential 2 */}
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl flex items-start gap-4 group hover:border-blue-500/50 transition-colors">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/10 transition-colors">
                        <Medal className="w-6 h-6 text-white/70 group-hover:text-blue-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">High Altitude Expertise</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Minimum 5 years experience and 10+ successful passes over 5,000m required for platform access.
                        </p>
                    </div>
                </div>

                {/* Credential 3 */}
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl flex items-start gap-4 group hover:border-emerald-500/50 transition-colors">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 transition-colors">
                        <Languages className="w-6 h-6 text-white/70 group-hover:text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Fluent Communication</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Guides are vetted for English fluency. Many also speak French, German, Spanish, or Chinese.
                        </p>
                    </div>
                </div>

                {/* Credential 4 */}
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl flex items-start gap-4 group hover:border-purple-500/50 transition-colors">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/10 transition-colors">
                        <UserCheck className="w-6 h-6 text-white/70 group-hover:text-purple-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Verified Identity & License</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            We manually verify government IDs and cross-reference active NTB license numbers.
                        </p>
                    </div>
                </div>

                {/* Credential 5 */}
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl flex items-start gap-4 group hover:border-yellow-500/50 transition-colors">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/10 transition-colors">
                        <Star className="w-6 h-6 text-white/70 group-hover:text-yellow-400 fill-transparent group-hover:fill-yellow-400/20" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Real Client Reviews</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Guides maintain their status through verified 5-star feedback from previous trekkers.
                        </p>
                    </div>
                </div>

                {/* Credential 6 */}
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl flex items-start gap-4 group hover:border-red-500/50 transition-colors">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/10 transition-colors">
                        <HeartPulse className="w-6 h-6 text-white/70 group-hover:text-red-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Rescue Protocol Trained</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Direct contacts for immediate helicopter evacuation and local medical clinics (e.g., Pheriche).
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
