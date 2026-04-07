import { Star, MapPin, Award } from "lucide-react";
import Image from "next/image";

interface GuideProfileProps {
    name: string;
    image: string;
    experience: string;
    rating: number;
    reviewCount: number;
    specialty: string;
    quote: string;
}

export default function GuideProfile({ name, image, experience, rating, reviewCount, specialty, quote }: GuideProfileProps) {
    return (
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-nepal-orange/50 transition-all group">
            <div className="relative h-64 w-full">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    <div className="flex items-center text-sm text-gray-300 mt-1">
                        <Award className="w-4 h-4 text-nepal-orange mr-1" />
                        <span>{experience} Experience</span>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-nepal-orange font-bold uppercase tracking-wider">{specialty}</p>
                        <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-bold text-white">{rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({reviewCount} reviews)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm text-gray-300 italic">"{quote}"</p>
                </div>

                <button className="w-full py-3 bg-white/10 hover:bg-nepal-orange text-white rounded-lg font-bold transition-colors">
                    Book a Trek with {name.split(' ')[0]}
                </button>
            </div>
        </div>
    );
}
