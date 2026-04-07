"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Compass, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationItem {
    name: string;
    type: string;
    href?: string;
    items?: {
        name: string;
        href: string;
        desc?: string;
    }[];
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigation: NavigationItem[] = [
        { name: "Meet the Locals", href: "/guides", type: "link" },
        {
            name: "Destinations",
            type: "dropdown",
            items: [
                { name: "Everest Region", href: "/destinations/everest-region", desc: "Base Camp, Gokyo, Three Passes" },
                { name: "Annapurna Region", href: "/destinations/annapurna-region", desc: "Circuit, ABC, Mardi, Poon Hill" },
                { name: "Manaslu Region", href: "/destinations/manaslu-region", desc: "Circuit, Larke Pass, Cultural" },
                { name: "Langtang Region", href: "/destinations/langtang-region", desc: "Valley, Gosainkunda, Culture" },
                { name: "Western Region", href: "/destinations/western-region", desc: "Mustang, Dolpo, Rara & National Parks" },
            ],
        },
        { name: "Weekend Escapes", href: "/weekend-escapes", type: "link" },
        {
            name: "Trekker Info",
            type: "dropdown",
            items: [
                { name: "Blog", href: "/blog" },
                { name: "Permits & Fees", href: "/permits" },
                { name: "Gear Lists", href: "/gear-list" },
                { name: "Visa Info", href: "/visa-info" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
            ],
        },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
                }`}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group z-50 relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-nepal-orange to-orange-600 rounded-lg flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-orange-500/20">
                        <Compass className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <span className="block text-xl font-display font-bold text-white tracking-tight leading-none">
                            TREKGUIDE<span className="text-nepal-orange">HUB</span>
                        </span>
                        <span className="block text-[10px] text-gray-400 uppercase tracking-widest leading-none">
                            Platform
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    {navigation.map((item) => (
                        <div
                            key={item.name}
                            className="relative group"
                            onMouseEnter={() => item.type === "dropdown" && setActiveDropdown(item.name)}
                        >
                            {item.type === "link" ? (
                                <Link
                                    href={item.href!}
                                    className="text-base font-bold text-gray-300 hover:text-white transition-colors relative py-2"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <button
                                    className={`text-base font-bold flex items-center gap-1.5 transition-colors py-2 ${activeDropdown === item.name ? "text-white" : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`} />
                                </button>
                            )}

                            {/* Dropdown Content */}
                            <AnimatePresence>
                                {item.type === "dropdown" && activeDropdown === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-10 w-64 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden p-2"
                                        style={{ left: item.name === "Destinations" ? "-20px" : "50%", x: item.name === "Destinations" ? 0 : "-50%" }}
                                    >
                                        <div className="space-y-1">
                                            {item.items?.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                                                >
                                                    <div className="text-sm font-bold text-white group-hover/item:text-nepal-orange transition-colors">
                                                        {subItem.name}
                                                    </div>
                                                    {subItem.desc && (
                                                        <div className="text-xs text-gray-500 mt-0.5">
                                                            {subItem.desc}
                                                        </div>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                    <Link href="/find-guide" className="bg-white/10 hover:bg-nepal-orange text-white px-6 py-2.5 rounded-full text-base font-bold transition-all border border-white/10 hover:border-nepal-orange shadow-lg hover:shadow-orange-500/20">
                        Find My Guide
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 text-gray-300 hover:text-white z-50 relative"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 bg-slate-950 z-40 lg:hidden overflow-y-auto pt-24 pb-8"
                    >
                        <div className="px-6 space-y-6">
                            {navigation.map((item) => (
                                <div key={item.name} className="border-b border-white/5 pb-4 last:border-0">
                                    {item.type === "link" ? (
                                        <Link
                                            href={item.href!}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-xl font-bold text-white hover:text-nepal-orange block"
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="text-xl font-bold text-gray-400">
                                                {item.name}
                                            </div>
                                            <div className="pl-4 space-y-3 border-l-2 border-white/10">
                                                {item.items?.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="block"
                                                    >
                                                        <div className="text-base font-medium text-white hover:text-nepal-orange transition-colors">
                                                            {subItem.name}
                                                        </div>
                                                        {subItem.desc && (
                                                            <div className="text-xs text-gray-500 mt-0.5">
                                                                {subItem.desc}
                                                            </div>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link href="/find-guide" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center bg-nepal-orange text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 mt-8">
                                Find My Guide
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
