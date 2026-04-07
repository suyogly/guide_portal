import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Mountain } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#020617] border-t border-white/5 pt-24 pb-12 text-white/40">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
                {/* Brand Column */}
                <div className="space-y-8 lg:col-span-1">
                    <div className="flex items-center gap-2">
                        <Mountain className="w-8 h-8 text-nepal-orange" />
                        <span className="text-xl font-display font-bold text-white tracking-tight uppercase">
                            TREKGUIDE<span className="text-nepal-orange">HUB</span>
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-xs">
                        The premier platform for solo travelers in Nepal. Connecting you with vetted guides, authentic experiences, and lifelong friends.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Facebook className="w-4 h-4" /></a>
                        <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Instagram className="w-4 h-4" /></a>
                        <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Twitter className="w-4 h-4" /></a>
                    </div>
                </div>

                {/* By Region */}
                <div className="lg:col-span-1">
                    <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">By Region</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="#" className="hover:text-white transition-colors">Everest Region</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Annapurna Region</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Manaslu Region</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Langtang Region</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Upper Mustang</Link></li>
                    </ul>
                </div>



                {/* Resources */}
                <div className="lg:col-span-1">
                    <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Resources</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/blog" className="hover:text-white transition-colors font-bold text-nepal-orange">Blog</Link></li>
                        <li><Link href="/permits" className="hover:text-white transition-colors">Permits & TIMS</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Altitude Sickness Guide</Link></li>
                        <li><Link href="/gear-list" className="hover:text-white transition-colors">Gear List</Link></li>
                        <li><Link href="/visa-info" className="hover:text-white transition-colors">Visa Information</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="lg:col-span-1">
                    <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Contact</h3>
                    <ul className="space-y-6 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-nepal-orange shrink-0" />
                            <span>Thamel, Kathmandu, Nepal<br />(Next to Garden of Dreams)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-nepal-orange shrink-0" />
                            <a href="mailto:hello@trekguidehub.com" className="hover:text-white">hello@trekguidehub.com</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-nepal-orange shrink-0" />
                            <a href="tel:+97714423456" className="hover:text-white">+977 1 442 3456</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
                <p>&copy; {new Date().getFullYear()} TrekGuide Hub. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <a href="#" className="hover:text-white">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
}
