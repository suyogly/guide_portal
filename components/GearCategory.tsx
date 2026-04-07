"use client";

import { motion } from "framer-motion";
import { Shirt, Footprints, Backpack, Wind, Sun, Coffee, Thermometer, Shield } from "lucide-react";

interface GearItem {
    name: string;
    desc: string;
    essential: boolean;
}

interface CategoryProps {
    title: string;
    icon: React.ReactNode;
    items: GearItem[];
}

const gearCategories: CategoryProps[] = [
    {
        title: "Clothing Layering",
        icon: <Shirt className="w-6 h-6" />,
        items: [
            { name: "Base Layer (Moisture-wicking)", desc: "Synthetic or merino wool tops and bottoms.", essential: true },
            { name: "Insulation Layer (Down Jacket)", desc: "High-quality down or synthetic puff for cold nights.", essential: true },
            { name: "Weather Layer (Hard Shell)", desc: "Waterproof and windproof jacket and trousers.", essential: true },
            { name: "Mid-layers (Fleece)", desc: "Breathable fleece or softshell jackets.", essential: false },
        ]
    },
    {
        title: "Footwear",
        icon: <Footprints className="w-6 h-6" />,
        items: [
            { name: "Trekking Boots", desc: "Broken-in, waterproof boots with good ankle support.", essential: true },
            { name: "Camp Shoes / Sandals", desc: "Lightweight shoes for evenings at the teahouse.", essential: true },
            { name: "Hiking Socks", desc: "Merino wool blend to prevent blisters.", essential: true },
            { name: "Gaiters", desc: "Keeps snow and stones out of boots (especially in winter).", essential: false },
        ]
    },
    {
        title: "Equipment & Carry",
        icon: <Backpack className="w-6 h-6" />,
        items: [
            { name: "Main Duffle / Backpack", desc: "60-80L for porters or large pack if solo.", essential: true },
            { name: "Daypack", desc: "25-35L for your essentials and hydration.", essential: true },
            { name: "Sleeping Bag", desc: "Rated to -15°C/0°F or lower depending on trek.", essential: true },
            { name: "Trekking Poles", desc: "Reduces impact on knees during descents.", essential: false },
        ]
    },
    {
        title: "Essentials & Health",
        icon: <Shield className="w-6 h-6" />,
        items: [
            { name: "Water Purification", desc: "LifeStraw, tablets, or UV purifier.", essential: true },
            { name: "Sun Protection", desc: "High SPF sunscreen, lip balm, and polarized sunglasses.", essential: true },
            { name: "First Aid Kit", desc: "Including blister care and altitude meds.", essential: true },
            { name: "Headlamp", desc: "Essential for pre-dawn starts and teahouses.", essential: true },
        ]
    }
];

export default function GearCategory() {
    return (
        <section className="py-12 space-y-20">
            {gearCategories.map((category, catIndex) => (
                <div key={category.title} className="relative">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-nepal-orange/10 rounded-2xl flex items-center justify-center text-nepal-orange shadow-inner">
                            {category.icon}
                        </div>
                        <h3 className="text-3xl font-display font-bold text-white tracking-tight">
                            {category.title}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {category.items.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-6 rounded-3xl bg-slate-900 border border-white/5 hover:border-nepal-orange/30 transition-all shadow-xl"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-lg font-bold text-white group-hover:text-nepal-orange transition-colors">
                                        {item.name}
                                    </h4>
                                    {item.essential && (
                                        <span className="text-[10px] font-bold bg-nepal-orange/10 text-nepal-orange px-2 py-0.5 rounded-full uppercase tracking-widest border border-nepal-orange/20">
                                            Essential
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
