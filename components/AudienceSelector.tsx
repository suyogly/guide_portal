import Link from "next/link";
import { ArrowRight, Plane, Home } from "lucide-react";
import Image from "next/image";

export default function AudienceSelector() {
    return (
        <section className="py-12 bg-slate-950 px-4">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                {/* The Traveler Card */}
                <div className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 hover:border-nepal-orange/50 transition-all duration-500">
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2600&auto=format&fit=crop"
                            alt="Trekking in Nepal"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    </div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                        <div className="mb-4 bg-nepal-orange/20 p-3 rounded-xl backdrop-blur-md border border-nepal-orange/30">
                            <Plane className="w-8 h-8 text-nepal-orange" />
                        </div>
                        <h3 className="text-3xl font-display font-bold text-white mb-2">First time in Nepal?</h3>
                        <p className="text-gray-300 mb-6 max-w-sm">
                            Find the perfect multi-day trek and hire a private guide.
                        </p>
                        <Link
                            href="#guides"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-nepal-orange hover:text-white transition-all group-hover:pl-8"
                        >
                            Browse Multi-Day Treks <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* The Expat Card */}
                <div className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all duration-500">
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1521949392237-7977eb0df9b4?q=80&w=2618&auto=format&fit=crop"
                            alt="Weekend Hike"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    </div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                        <div className="mb-4 bg-blue-500/20 p-3 rounded-xl backdrop-blur-md border border-blue-500/30">
                            <Home className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-3xl font-display font-bold text-white mb-2">Based in Kathmandu?</h3>
                        <p className="text-gray-300 mb-6 max-w-sm">
                            Need a break? Discover weekend hikes and visa run packages nearby.
                        </p>
                        <Link
                            href="/weekend-escapes"
                            className="inline-flex items-center gap-2 bg-slate-800 text-white border border-white/20 px-6 py-3 rounded-full font-bold hover:bg-blue-500 hover:border-blue-500 transition-all group-hover:pl-8"
                        >
                            See Weekend Escapes <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
