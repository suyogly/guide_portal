"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Ruler, Mountain, Clock } from "lucide-react";
import { useState } from "react";

export interface DayData {
    day: number;
    title: string;
    description: string;
    distance: string;
    elevationGain: string;
    time: string;
    altitude: number;
    isRestDay?: boolean;
    flexNote?: string;
    guideTip?: string;
}

interface DayByDayTimelineProps {
    data: DayData[];
    hoveredDay: number | null;
    setHoveredDay: (day: number | null) => void;
}

export default function DayByDayTimeline({ data, hoveredDay, setHoveredDay }: DayByDayTimelineProps) {
    const [expandedDay, setExpandedDay] = useState<number | null>(1); // Default open first day

    const toggleDay = (day: number) => {
        setExpandedDay(expandedDay === day ? null : day);
    };

    return (
        <div className="space-y-4">
            {data.map((item) => (
                <div
                    key={item.day}
                    className={`rounded-[2rem] border transition-all duration-500 overflow-hidden 
                    ${hoveredDay === item.day ? "border-nepal-orange/30 bg-slate-900/60" : "border-white/5 bg-slate-900/40"}`}
                    onMouseEnter={() => setHoveredDay(item.day)}
                    onMouseLeave={() => setHoveredDay(null)}
                >
                    <button
                        onClick={() => toggleDay(item.day)}
                        className="w-full flex items-center justify-between p-8 md:p-10 text-left focus:outline-none group"
                    >
                        <div className="flex items-center gap-8">
                            <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl font-bold font-display text-xl transition-all duration-300
                                ${hoveredDay === item.day ? "bg-nepal-orange text-white" : (item.isRestDay ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-gray-500")}
                                ${item.isRestDay ? 'ring-2 ring-blue-500/50' : ''}`}>
                                <span>{item.day}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                                    {item.isRestDay && (
                                        <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase py-1 px-2 rounded-full border border-blue-500/30">
                                            Acclimatization
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-5 text-sm text-white/30 font-medium">
                                    <span className="flex items-center gap-1.5"><Mountain className="w-4 h-4 text-nepal-orange/50" /> {item.altitude}m</span>
                                    <span className="flex items-center gap-1.5"><Ruler className="w-4 h-4 text-nepal-orange/50" /> {item.distance}</span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-nepal-orange/50" /> {item.time}</span>
                                </div>
                            </div>
                        </div>
                        <motion.div
                            animate={{ rotate: expandedDay === item.day ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="bg-white/5 p-2 rounded-full transition-colors group-hover:bg-white/10"
                        >
                            <ChevronDown className="w-6 h-6 text-white/20" />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {expandedDay === item.day && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            >
                                <div className="px-10 pb-10 pt-2 ml-20">
                                    <div className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                                        {item.description}
                                    </div>
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <div className="bg-emerald-500/10 rounded-xl px-5 py-3 border border-emerald-500/20 inline-flex flex-col">
                                            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.2em] mb-1">Elevation Gain</span>
                                            <span className="text-emerald-400 font-bold text-lg">{item.elevationGain}</span>
                                        </div>
                                        {item.flexNote && (
                                            <div className="bg-purple-500/10 rounded-xl px-4 py-3 border border-purple-500/20 flex items-start gap-3 flex-1 min-w-[250px]">
                                                <div className="text-purple-400 font-bold bg-purple-500/20 px-2 py-0.5 rounded text-xs uppercase">Flexibility</div>
                                                <p className="text-gray-300 text-sm">{item.flexNote}</p>
                                            </div>
                                        )}
                                        {item.guideTip && (
                                            <div className="bg-nepal-orange/10 rounded-xl px-4 py-3 border border-nepal-orange/20 flex items-start gap-3 flex-1 min-w-[250px]">
                                                <div className="text-nepal-orange font-bold bg-nepal-orange/20 px-2 py-0.5 rounded text-xs uppercase">Guide Tip</div>
                                                <p className="text-gray-300 text-sm">{item.guideTip}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
