import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export default function GuideCtaSection() {
    return (
        <section className="bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden relative group">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2670&auto=format&fit=crop"
                    alt="Local Guide"
                    className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
            </div>

            <div className="relative z-10 p-10 md:p-16 lg:p-20 max-w-3xl">
                <span className="text-nepal-orange text-xs font-bold uppercase tracking-[0.2em] mb-6 block flex items-center gap-2">
                    <Users className="w-5 h-5" /> Meet The Locals
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                    Find Your Perfect <br /><span className="text-nepal-orange">EBC Guide</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                    Browse our curated community of fully verified, independent mountain guides.
                    Filter by language, experience, and verified reviews to find your perfect match for the trail.
                </p>
                <Link
                    href="/find-guide"
                    className="inline-flex items-center gap-3 bg-nepal-orange hover:bg-orange-500 text-white px-8 py-5 rounded-full font-bold transition-all hover:gap-5 shadow-xl shadow-orange-500/20 text-lg"
                >
                    View All Guides <ArrowRight className="w-6 h-6" />
                </Link>
            </div>
        </section>
    );
}
