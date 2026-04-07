import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, MapPin, Calendar, CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";

const WEEKEND_TRIPS = [
    {
        id: 1,
        slug: "chisapani-nagarkot",
        title: "Chisapani - Nagarkot Hike",
        whoItIsFor: "The Overworked Techie",
        duration: "1 Night / 2 Days",
        difficulty: "Moderate",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671&auto=format&fit=crop",
        description: "Escape the city dust. Walk through Shivapuri National Park, stay in a cozy lodge, and wake up to a sunrise over the Himalayas.",
        includes: ["Hotel Pickup/Dropoff", "National Park Fees", "Guide", "Lodge + Dinner/Breakfast"],
        itinerary: [
            { day: 1, title: "Kathmandu to Chisapani", desc: "Drive to Sundarijal and hike through the forest to Chisapani." },
            { day: 2, title: "Chisapani to Nagarkot", desc: "Hike along the ridge with mountain views, end in Nagarkot for sunset." }
        ]
    },
    {
        id: 2,
        slug: "kalinchowk-snow",
        title: "Kalinchowk Snow Trip",
        whoItIsFor: "The Adventure Seeker",
        duration: "2 Nights / 3 Days",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=2670&auto=format&fit=crop",
        description: "Visit the famous Kalinchowk Bhagwati shrine and enjoy a cable car ride with stunning mountain panoramas.",
        includes: ["4WD Transport", "Hotel with Heater", "Cable Car Ticket", "All Meals"],
        itinerary: [
            { day: 1, title: "Kathmandu to Kuri Village", desc: "Scenic drive to Kuri Village." },
            { day: 2, title: "Shrine Visit & Snow Fun", desc: "Cable car to the shrine and enjoy the snow." },
            { day: 3, title: "Return to Kathmandu", desc: "Slow morning and drive back." }
        ]
    },
    {
        id: 3,
        slug: "champadevi-hike",
        title: "Champadevi Day Hike",
        whoItIsFor: "The Weekend Warrior",
        duration: "1 Day (7 Hours)",
        difficulty: "Strenuous",
        image: "https://images.unsplash.com/photo-1623492701902-47dc207df5b1?q=80&w=2669&auto=format&fit=crop",
        description: "Hike to the ridge south of Kathmandu for panoramic views of the entire valley and the Himalayan range beyond.",
        includes: ["Private Transport", "Packed Lunch", "Guide", "Water"],
        itinerary: [
            { day: 1, title: "Summit Push", desc: "Drive to Pharping and hike to the Champadevi ridge." }
        ]
    }
];

export default async function EscapePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const trip = WEEKEND_TRIPS.find(t => t.slug === slug);

    if (!trip) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <a href="/weekend-escapes" className="inline-flex items-center text-nepal-orange hover:gap-2 transition-all font-bold gap-1">
                    <ArrowLeft className="w-4 h-4" /> Back to Escapes
                </a>

                <div className="relative h-[400px] w-full rounded-3xl overflow-hidden border border-white/10">
                    <Image 
                        src={trip.image} 
                        alt={trip.title} 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8">
                        <span className="bg-nepal-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                            {trip.difficulty}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold">{trip.title}</h1>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold">Overview</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {trip.description} This {trip.duration} escape is perfect for {trip.whoItIsFor.toLowerCase()} looking to disconnect and recharge.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold">The Plan</h2>
                            <div className="space-y-4">
                                {trip.itinerary.map((item, i) => (
                                    <div key={i} className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="w-10 h-10 bg-nepal-orange/20 rounded-full flex items-center justify-center font-bold text-nepal-orange shrink-0">
                                            {item.day}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <p className="text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl space-y-6 sticky top-24">
                            <div>
                                <h3 className="font-bold text-lg mb-4">What's Included</h3>
                                <ul className="space-y-3">
                                    {trip.includes.map((inc, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            {inc}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-white/10 space-y-4">
                                <a 
                                    href={`https://wa.me/9779800000000?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(trip.title)}.%20Can%20I%20get%20more%20info?`}
                                    className="w-full bg-nepal-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" /> Inquire on WhatsApp
                                </a>
                                <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest">
                                    Fast response • Trusted guides
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
