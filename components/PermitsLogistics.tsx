import { CheckCircle2, FileText, IdCard, MapPin } from "lucide-react";

export default function PermitsLogistics() {
    return (
        <section className="space-y-10">
            <div>
                <span className="text-nepal-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Zero Admin Stress</span>
                <h2 className="text-4xl font-display font-bold text-white mb-4">Permits & Logistics</h2>
                <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                    Everest Base Camp requires three specific permits. When you hire an independent guide through our platform, they handle all the paperwork for you at cost.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Permit 1 */}
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                        <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Sagarmatha NP Permit</h3>
                    <div className="text-2xl font-bold text-blue-400 mb-4">NPR 3,000 <span className="text-sm text-gray-500 font-normal">($23)</span></div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Required to enter the national park. Obtained in Kathmandu or at the park entrance gate in Monjo.
                    </p>
                </div>

                {/* Permit 2 */}
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                        <MapPin className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Khumbu Rural Municipality</h3>
                    <div className="text-2xl font-bold text-emerald-400 mb-4">NPR 2,000 <span className="text-sm text-gray-500 font-normal">($15)</span></div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Local government fee paid directly in Lukla (must be paid in local currency on arrival).
                    </p>
                </div>

                {/* Permit 3 */}
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                        <IdCard className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">TIMS Card (Now Optional)</h3>
                    <div className="text-2xl font-bold text-purple-400 mb-4">Replaced <span className="text-sm text-gray-500 font-normal">by Local Fee</span></div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        For the Khumbu region, the traditional TIMS card has been effectively replaced by the local municipality fee.
                    </p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-nepal-orange" />
                        Guide Convenience Guarantee
                    </h4>
                    <p className="text-gray-400 text-sm max-w-3xl">
                        Just provide a copy of your passport and 2 passport photos to your guide in Kathmandu. They will navigate the tourism board lines and secure all documentation before your flight to Lukla. At checkpoints on the trail, your guide will manage the registrations while you rest.
                    </p>
                </div>
            </div>
        </section>
    );
}
