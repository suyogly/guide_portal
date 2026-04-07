import GuideProfile from "@/components/GuideProfile";
import { Calendar, Users, ArrowRight } from "lucide-react";

const GROUP_DEPARTURES = [
    {
        id: 1,
        title: "Annapurna Base Camp",
        date: "Oct 12, 2024",
        spotsLeft: 2,
        price: 850,
        originalPrice: 1150,
        guide: {
            name: "Pasang Sherpa",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop",
            experience: "12 Years",
            rating: 4.9,
            reviewCount: 42,
            specialty: "High Altitude & Photography",
            quote: "I ensure every solo traveler feels like part of the family."
        }
    },
    {
        id: 2,
        title: "Everest Base Camp",
        date: "Nov 05, 2024",
        spotsLeft: 3,
        price: 1250,
        originalPrice: 1550,
        guide: {
            name: "Maya Gurung",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
            experience: "8 Years",
            rating: 5.0,
            reviewCount: 28,
            specialty: "Female Solo Travelers & Culture",
            quote: "Safety and comfort are my top priorities for every guest."
        }
    },
    {
        id: 3,
        title: "Manaslu Circuit",
        date: "Oct 20, 2024",
        spotsLeft: 4,
        price: 990,
        originalPrice: 1300,
        guide: {
            name: "Dorje Lamin",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2576&auto=format&fit=crop",
            experience: "15 Years",
            rating: 4.8,
            reviewCount: 156,
            specialty: "Adventure & History",
            quote: "Let me show you the hidden stories of the Himalayas."
        }
    }
];

export default function GroupDepartures() {
    return (
        <main className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <span className="text-nepal-orange font-bold tracking-wider uppercase">Save Money & Make Friends</span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold">Guaranteed Group Departures</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Solo traveler? No problem. Skip the single supplement fee by joining one of our confirmed groups.
                        Vetted guides, guaranteed dates, and incredible company.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {GROUP_DEPARTURES.map((trek) => (
                        <div key={trek.id} className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-nepal-orange/30 transition-all flex flex-col">
                            {/* Trip Header */}
                            <div className="p-6 border-b border-white/10 bg-white/5">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-2xl font-bold">{trek.title}</h2>
                                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-bold">Confirmed</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-300 mt-2">
                                    <div className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-nepal-orange" /> {trek.date}</div>
                                    <div className="flex items-center"><Users className="w-4 h-4 mr-1 text-nepal-orange" /> {trek.spotsLeft} spots left</div>
                                </div>
                            </div>

                            {/* Guide Profile Section */}
                            <div className="p-6 flex-grow flex flex-col gap-6">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-400 uppercase font-bold tracking-wider">Your Guide</p>
                                    <GuideProfile {...trek.guide} />
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/10">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="text-gray-400 line-through text-sm">${trek.originalPrice}</p>
                                            <p className="text-3xl font-bold text-white">${trek.price}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-400 text-sm font-bold">Save ${trek.originalPrice - trek.price}</p>
                                            <p className="text-gray-400 text-xs">per person</p>
                                        </div>
                                    </div>
                                    <button className="w-full bg-nepal-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                                        Join This Group <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
