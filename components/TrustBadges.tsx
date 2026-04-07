import { ShieldCheck, Users, Clock } from "lucide-react";

export default function TrustBadges() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8 w-full max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 px-2">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-gray-200">Verified Local Agencies</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/10"></div>
            <div className="flex items-center gap-3 px-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-200">No Hidden Single Supplements</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/10"></div>
            <div className="flex items-center gap-3 px-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium text-gray-200">24/7 Support in Kathmandu</span>
            </div>
        </div>
    );
}
