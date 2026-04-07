"use client";

import { MessageCircle, ArrowRight } from "lucide-react";

export default function StickyWhatsAppBar() {
    const whatsappUrl = "https://wa.me/9779800000000?text=Hi!%20Not%20sure%20which%20escape%20fits%20my%20weekend.%20Can%20you%20help%20me%20choose?";

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg animate-in slide-in-from-bottom-8 duration-500 delay-1000 fill-mode-both">
            <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xl hover:border-nepal-orange/50 transition-all group"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                        <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white leading-tight">Confused about which hike?</p>
                        <p className="text-xs text-gray-400">WhatsApp us for a quick recommendation</p>
                    </div>
                </div>
                <div className="bg-nepal-orange text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 group-hover:bg-orange-600 transition-colors">
                    Ask Us <ArrowRight className="w-3 h-3" />
                </div>
            </a>
        </div>
    );
}
