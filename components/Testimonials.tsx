import { Quote } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
    {
        id: 1,
        text: "I was hesitant about trekking EBC without an agency, but my independent guide Dawa was incredible. Zero stress and I saved over $800.",
        author: "Sarah Jenkins",
        country: "🇬🇧 UK",
        trek: "Everest Base Camp",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop",
        date: "Oct 2024"
    },
    {
        id: 2,
        text: "As a solo female traveler, safety was my #1 priority. My verified guide respected my pace perfectly. Highly recommend this direct platform.",
        author: "Elena Rodriguez",
        country: "🇪🇸 Spain",
        trek: "Everest Base Camp",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
        date: "Nov 2024"
    },
    {
        id: 3,
        text: "No forced agency itinerary meant we could stay an extra rest day in Dingboche when my husband felt tired. Complete freedom.",
        author: "Emma Wilson",
        country: "🇦🇺 Australia",
        trek: "Everest Base Camp",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2588&auto=format&fit=crop",
        date: "April 2024"
    },
    {
        id: 4,
        text: "As an expat living in Kathmandu, I needed a quick weekend escape. The organizing was flawless and the guide knew exactly where to go.",
        author: "Mark Davis",
        country: "🇺🇸 USA (Expat)",
        trek: "Helambu Circuit",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2588&auto=format&fit=crop",
        date: "Jan 2024"
    },
    {
        id: 5,
        text: "The view from Gokyo Ri is better than Kala Patthar. Our guide ensured we acclimatized properly before the Renjo La pass. Perfect trip.",
        author: "Liam Chen",
        country: "🇨🇦 Canada",
        trek: "Gokyo Lakes",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2588&auto=format&fit=crop",
        date: "May 2024"
    },
    {
        id: 6,
        text: "Booking a local guide directly meant I paid fair prices for teahouses. The turquoise lakes were mind-blowing. Highly recommend this route.",
        author: "Sophie Müller",
        country: "🇩🇪 Germany",
        trek: "Gokyo Lakes",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2588&auto=format&fit=crop",
        date: "Oct 2024"
    },
    {
        id: 7,
        text: "The ultimate challenge. Crossing the Kongma La pass was grueling but having our guide there for safety over the glacier ice was priceless.",
        author: "David O'Connor",
        country: "🇮🇪 Ireland",
        trek: "Three Passes",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
        date: "April 2024"
    },
    {
        id: 8,
        text: "Incredible 20-day journey. By booking an independent guide, we easily changed our itinerary to rest an extra day before the Cho La pass.",
        author: "Jessica & Tom",
        country: "🇺🇸 USA",
        trek: "Three Passes",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
        date: "Nov 2023"
    }
];

export default function Testimonials({ slug }: { slug?: string }) {
    const displayTestimonials = slug === 'ebc-trek'
        ? TESTIMONIALS.filter(t => t.trek === "Everest Base Camp")
        : slug === 'gokyo-lakes'
            ? TESTIMONIALS.filter(t => t.trek === "Gokyo Lakes")
            : slug === 'three-passes'
                ? TESTIMONIALS.filter(t => t.trek === "Three Passes")
                : TESTIMONIALS;

    return (
        <section className="py-20 px-4 bg-slate-900/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <Quote className="w-12 h-12 text-nepal-orange mb-6 opacity-50" />
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">What Our Community Says</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {displayTestimonials.map((review) => (
                        <div key={review.id} className="bg-slate-950 p-8 rounded-2xl border border-white/5 relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Quote className="w-16 h-16 text-white transform rotate-180" />
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                    <Image
                                        src={review.image}
                                        alt={review.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{review.author}</h4>
                                    <p className="text-xs text-gray-500">{review.country} • {review.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
