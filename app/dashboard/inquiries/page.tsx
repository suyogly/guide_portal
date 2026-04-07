"use client";

import { motion } from "framer-motion";
import {
    Users,
    MessageSquare,
    TrendingUp,
    Calendar,
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
    Search,
    Filter,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Globe
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const INQUIRIES = [
    {
        id: "1",
        name: "Sarah Jenkins",
        email: "sarah.j@example.com",
        trek: "Everest Base Camp",
        travelers: "2",
        date: "2026-05-12",
        status: "New",
        message: "Looking for a private trek with an experienced female guide if possible. We are both intermediate hikers."
    },
    {
        id: "2",
        name: "Mark Thompson",
        email: "m.thompson@trek.net",
        trek: "Annapurna Circuit",
        travelers: "1",
        date: "2026-04-20",
        status: "Contacted",
        message: "Interested in the group departure. How many spots are left currently?"
    },
    {
        id: "3",
        name: "Elena Rodriguez",
        email: "elena.ro@gmail.com",
        trek: "Manaslu Circuit",
        travelers: "4",
        date: "2026-10-05",
        status: "Confirmed",
        message: "Planning a family trip. Need to know if kids aged 14 can handle the pass."
    },
    {
        id: "4",
        name: "David Chen",
        email: "david.c@tech.corp",
        trek: "Upper Mustang",
        travelers: "6+",
        date: "2026-06-15",
        status: "New",
        message: "Corporate retreat inquiry. We interested in the cultural aspect and photography opportunities."
    }
];

export default function InquiriesDashboard() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200 pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-2">
                            Inquiry <span className="text-nepal-orange">Dashboard</span>
                        </h1>
                        <p className="text-slate-400">Manage and convert your Himalayan adventure leads.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-900/50 border border-white/5 p-1 rounded-xl flex">
                            <button className="px-4 py-2 bg-white/5 rounded-lg text-sm font-bold text-white">List View</button>
                            <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-300">Analytics</button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Total Inquiries", value: "1,284", icon: MessageSquare, trend: "+12.5%", color: "blue" },
                        { label: "Active Leads", value: "42", icon: Users, trend: "+4.2%", color: "orange" },
                        { label: "Conversion Rate", value: "18.4%", icon: TrendingUp, trend: "+2.1%", color: "emerald" },
                        { label: "Response Time", value: "1.2h", icon: Clock, trend: "-15min", color: "purple" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                                </div>
                                <span className={`text-xs font-bold text-${stat.trend.startsWith('+') ? 'emerald' : 'nepal-orange'}-400 bg-white/5 px-2 py-1 rounded-lg`}>
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-slate-900/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
                    <div className="p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search by name, email or trek..."
                                className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-nepal-orange/50 transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all">
                                <Filter className="w-4 h-4" />
                                <span>Filter</span>
                            </button>
                            <button className="flex items-center gap-2 px-6 py-2.5 bg-nepal-orange hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/10">
                                <span>Export Leads</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/[0.02] text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="px-8 py-5">Full Name & Contact</th>
                                    <th className="px-8 py-5">Preferred Trek</th>
                                    <th className="px-8 py-5">Group Size</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5">Date Received</th>
                                    <th className="px-8 py-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {INQUIRIES.map((inquiry) => (
                                    <tr key={inquiry.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-sm font-bold text-white">
                                                    {inquiry.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white group-hover:text-nepal-orange transition-colors">{inquiry.name}</p>
                                                    <p className="text-xs text-slate-500">{inquiry.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-medium text-slate-300">{inquiry.trek}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                                                <Users className="w-3 h-3 text-slate-500" />
                                                <span className="text-sm text-slate-300">{inquiry.travelers}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${inquiry.status === 'New' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' :
                                                inquiry.status === 'Contacted' ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' :
                                                    'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                                                }`}>
                                                {inquiry.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-slate-500">
                                            {inquiry.date}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 border-t border-white/5 text-center">
                        <p className="text-slate-500 text-sm italic">
                            Showing all 4 test submissions for prototype demonstration.
                        </p>
                    </div>
                </div>

                {/* Integration Info */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-nepal-orange/5 to-transparent border border-nepal-orange/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-2">
                            <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                Live Lead Routing Active
                            </h4>
                            <p className="text-slate-400 max-w-xl">
                                Every time a traveler submits the "Book Your Trek" form on any itinerary page, their details are automatically categorized and listed here in real-time.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center mb-2">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Email Sync</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center mb-2 text-emerald-400">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Global CRM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
