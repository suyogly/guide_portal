"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe } from "lucide-react";

const contactMethods = [
    {
        title: "Email Us",
        value: "hello@trekguidehub.com",
        desc: "Expect a response within 24 hours.",
        icon: <Mail className="w-6 h-6" />,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "WhatsApp",
        value: "+977 980-0000000",
        desc: "Instant chat for urgent queries.",
        icon: <MessageSquare className="w-6 h-6" />,
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "Office Address",
        value: "Thamel, Kathmandu",
        desc: "Next to Garden of Dreams, Building 4B.",
        icon: <MapPin className="w-6 h-6" />,
        color: "text-red-400",
        bg: "bg-red-400/10",
    },
];

export default function ContactInfo() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
                {contactMethods.map((method, index) => (
                    <motion.div
                        key={method.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex items-start gap-6 group"
                    >
                        <div className={`w-14 h-14 ${method.bg} ${method.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                            {method.icon}
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{method.title}</h4>
                            <div className="text-xl font-bold text-white mb-2">{method.value}</div>
                            <p className="text-sm text-gray-500">{method.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-slate-900 border border-white/5"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-5 h-5 text-nepal-orange" />
                    <h4 className="font-bold text-white">Office Hours</h4>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Sunday - Friday</span>
                        <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Saturday</span>
                        <span className="text-white font-medium">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="pt-2 text-xs text-gray-600 italic">
                        * Nepal Time (GMT +5:45)
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
