import { Activity, Bell, HeartPulse, Hospital, Plane, ShieldAlert } from "lucide-react";

export default function SafetyProtocol() {
    return (
        <section className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
                <span className="text-red-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 block flex items-center justify-center gap-2">
                    <HeartPulse className="w-4 h-4" /> Comprehensive Safety
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Emergency & Evacuation Protocols</h2>
                <p className="text-gray-400 text-lg">
                    Trekking over 5,000m carries inherent risks. Our platform ensures you are never truly alone, even with an independent guide.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5 hover:border-red-500/50 transition-colors group flex gap-5 items-start">
                    <div className="bg-red-500/10 p-4 rounded-2xl group-hover:bg-red-500/20 transition-colors flex-shrink-0">
                        <Activity className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">AMS Recognition</h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            Guides are trained to monitor daily O2 levels and spot early symptoms of Acute Mountain Sickness to adjust pace or descend immediately.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5 hover:border-red-500/50 transition-colors group flex gap-5 items-start">
                    <div className="bg-red-500/10 p-4 rounded-2xl group-hover:bg-red-500/20 transition-colors flex-shrink-0">
                        <Plane className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Heli-Evacuation</h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            Guides have direct satellite connections to Kathmandu heli-rescue services. (Requires &gt;5,000m travel insurance).
                        </p>
                    </div>
                </div>

                <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5 hover:border-red-500/50 transition-colors group flex gap-5 items-start">
                    <div className="bg-red-500/10 p-4 rounded-2xl group-hover:bg-red-500/20 transition-colors flex-shrink-0">
                        <Hospital className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Pheriche Clinic Access</h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            The HRA Medical Clinic in Pheriche (4,371m) acts as a high-altitude triage center. Guides integrate check-ins here if needed.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5 hover:border-red-500/50 transition-colors group flex gap-5 items-start">
                    <div className="bg-red-500/10 p-4 rounded-2xl group-hover:bg-red-500/20 transition-colors flex-shrink-0">
                        <Bell className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">24/7 Platform Support</h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            Our Kathmandu team is on standby 24/7 to coordinate with embassies, insurance, and families in case of emergency.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="text-white font-bold mb-1">Mandatory Insurance Requirement</h4>
                    <p className="text-gray-300 text-sm">To trek EBC via our platform, you must provide proof of travel insurance that explicitly covers emergency helicopter evacuation up to 6,000 meters.</p>
                </div>
            </div>
        </section>
    );
}
