import { Search, Handshake, ShieldCheck } from "lucide-react";

const STEPS = [
    {
        id: 1,
        title: "Browse Guides",
        description: "Explore profiles of NTB-licensed independent guides. View their experience, languages, and past specific trek reviews.",
        icon: Search,
    },
    {
        id: 2,
        title: "Message Directly",
        description: "Connect right away to discuss routes, flexibility, and daily rates without any agency middlemen.",
        icon: Handshake,
    },
    {
        id: 3,
        title: "Trek Your Way",
        description: "Hike at your own pace. Add a rest day or change the plan—your guide is there to ensure your safety and flexibility.",
        icon: ShieldCheck,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-slate-950 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-16">
                    How <span className="text-nepal-orange">TrekGuide Hub</span> Works
                </h2>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>

                    {STEPS.map((step) => (
                        <div key={step.id} className="relative z-10 flex flex-col items-center group">
                            <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-nepal-orange/50 group-hover:shadow-[0_0_30px_-5px_rgba(255,107,0,0.3)] transition-all duration-500">
                                <step.icon className="w-10 h-10 text-white group-hover:text-nepal-orange transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-gray-400 max-w-xs mx-auto leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
