import { ArrowRight, Mountain } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const RELATED_TREKS = [
    {
        id: "gokyo-lakes",
        name: "Gokyo Lakes & Ri",
        duration: "11 Days",
        difficulty: "Difficult",
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "three-passes",
        name: "Everest Three Passes",
        duration: "20 Days",
        difficulty: "Strenuous",
        image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "pikey-peak",
        name: "Pikey Peak Trek",
        duration: "7 Days",
        difficulty: "Moderate",
        image: "https://images.unsplash.com/photo-1521949392237-7977eb0df9b4?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "annapurna-circuit",
        name: "Annapurna Circuit",
        duration: "18 Days",
        difficulty: "Strenuous",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop"
    }
];

export default function RelatedTreks({ currentSlug }: { currentSlug?: string }) {
    // Filter out the current trek and take the first 4
    const displayTreks = RELATED_TREKS.filter(trek => trek.id !== currentSlug).slice(0, 4);

    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2">Explore Similar Treks</h2>
                    <p className="text-gray-400">Discover more adventures in the Himalayas.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayTreks.map((trek) => (
                    <Link href={`/itineraries/${trek.id}`} key={trek.id} className="group block bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-nepal-orange/50 transition-colors">
                        <div className="relative h-48 w-full">
                            <img
                                src={trek.image}
                                alt={trek.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-nepal-orange transition-colors">{trek.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1.5"><Mountain className="w-3.5 h-3.5" /> {trek.duration}</span>
                                <span className="text-gray-600">•</span>
                                <span>{trek.difficulty}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center pt-6">
                <Link href="/destinations/everest-region" className="flex items-center gap-2 text-nepal-orange font-bold hover:text-white transition-colors">
                    View all Everest Region Treks <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
