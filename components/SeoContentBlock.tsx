import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function SeoContentBlock() {
    return (
        <section className="py-24 px-4 bg-slate-950">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                            Solo trekker doesn't mean <br />
                            <span className="text-nepal-orange">Alone.</span>
                        </h2>
                        <p className="text-nepal-orange font-bold tracking-widest text-sm uppercase">
                            2026 Mandatory Guide Policy
                        </p>
                    </div>

                    <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                        <p>
                            Trekking in Nepal as a solo traveler can be intimidating. You might worry about safety, getting lost, or paying the dreaded "single supplement."
                        </p>
                        <p>
                            Starting in 2026, the <strong>Nepal Government's Mandatory Guide Policy</strong> ensures every trekker in restricted and high-altitude areas is paired with a licensed professional. At <strong className="text-white">TrekGuide Hub</strong>, we don't just "provide a guide"—we match you with a companion who fits your pace and personality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["No Single Supplements", "Female Guides Available", "Licensed Professionals", "Tailored Matchmaking"].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-gray-200">
                                <CheckCircle2 className="w-5 h-5 text-nepal-orange" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Link href="/safety" className="text-white border-b border-nepal-orange pb-1 hover:text-nepal-orange w-fit transition-colors font-bold">
                            Read full Nepal guide safety policy →
                        </Link>
                        <Link href="/female-travelers" className="text-white border-b border-nepal-orange pb-1 hover:text-nepal-orange w-fit transition-colors">
                            View Female-Friendly Treks
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                        <Image
                            src="https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2670&auto=format&fit=crop"
                            alt="Backpacker and Nepali guide looking at a mountain range together"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20">
                            <p className="text-white font-medium text-sm">"The new policy felt like a hurdle until I met Pasang. Now, I wouldn't trek any other way."</p>
                            <p className="text-nepal-orange text-xs mt-2 font-bold">- Sarah, UK (Manaslu Trek)</p>
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-nepal-orange/20 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
                </div>
            </div>
        </section>
    );
}
