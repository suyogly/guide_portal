"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, CheckCircle2, XCircle, Clock, MessageCircle } from "lucide-react";
import type { AvailabilityStatus } from "@/lib/guides";

interface Props {
    guideName: string;
    availabilityStatus: AvailabilityStatus;
    availableFromDate: string | null;
    unavailableDates: string[];
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function toYMD(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDisplayDate(ymd: string): string {
    const [y, m, d] = ymd.split("-").map(Number);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function daysUntil(ymd: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(ymd + "T00:00:00");
    return Math.ceil((target.getTime() - today.getTime()) / 86400000);
}

export default function GuideAvailabilityChecker({ guideName, availabilityStatus, availableFromDate, unavailableDates }: Props) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selected, setSelected] = useState<string | null>(null);

    const todayYMD = toYMD(today);
    const unavailableSet = new Set(unavailableDates);

    // Build calendar grid
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    // pad to full weeks
    while (cells.length % 7 !== 0) cells.push(null);

    function prevMonth() {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
    }
    function nextMonth() {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
    }

    function handleSelect(day: number) {
        const ymd = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const cellDate = new Date(ymd + "T00:00:00");
        if (cellDate < today) return; // past dates not selectable
        setSelected(prev => prev === ymd ? null : ymd);
    }

    // Determine availability for selected date
    type DateResult = "available" | "unavailable" | "past";
    function getDateResult(ymd: string): DateResult {
        const d = new Date(ymd + "T00:00:00");
        if (d < today) return "past";
        if (unavailableSet.has(ymd)) return "unavailable";
        return "available";
    }

    const selectedResult = selected ? getDateResult(selected) : null;

    // Overall status config
    const STATUS_CONFIG = {
        AVAILABLE: {
            dot: "bg-green-400",
            badge: "bg-green-500/15 text-green-400 border-green-500/25",
            label: "Available Now",
        },
        UNAVAILABLE: {
            dot: "bg-red-400",
            badge: "bg-red-500/15 text-red-400 border-red-500/25",
            label: "Unavailable",
        },
        AVAILABLE_SOON: {
            dot: "bg-yellow-400",
            badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
            label: availableFromDate
                ? `Available in ${daysUntil(availableFromDate)} days`
                : "Available Soon",
        },
    };

    const cfg = STATUS_CONFIG[availabilityStatus];
    const firstName = guideName.split(" ")[0];

    return (
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">

            {/* Status header */}
            <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot} ${availabilityStatus === "AVAILABLE" ? "animate-pulse" : ""}`} />
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}>
                        {cfg.label}
                    </span>
                </div>
                {availabilityStatus === "AVAILABLE_SOON" && availableFromDate && (
                    <span className="text-[11px] text-gray-500">
                        from {formatDisplayDate(availableFromDate)}
                    </span>
                )}
            </div>

            <div className="border-t border-white/5 mx-5" />

            {/* Toggle button */}
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-sm text-gray-300 hover:text-white transition-colors group"
            >
                <span className="flex items-center gap-2 font-semibold">
                    <CalendarDays className="w-4 h-4 text-nepal-orange" />
                    Check a specific date
                </span>
                <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
            </button>

            {/* Calendar dropdown */}
            {open && (
                <div className="border-t border-white/5">
                    {/* Month nav */}
                    <div className="flex items-center justify-between px-5 pt-4 pb-2">
                        <button
                            onClick={prevMonth}
                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            aria-label="Previous month"
                        >
                            <ChevronLeft className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                        <p className="text-sm font-bold text-white">
                            {MONTHS[viewMonth]} {viewYear}
                        </p>
                        <button
                            onClick={nextMonth}
                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            aria-label="Next month"
                        >
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 px-4 pb-1">
                        {DAYS.map(d => (
                            <div key={d} className="text-center text-[10px] font-bold text-gray-600 uppercase py-1">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Date cells */}
                    <div className="grid grid-cols-7 px-4 pb-4 gap-y-0.5">
                        {cells.map((day, idx) => {
                            if (!day) return <div key={idx} />;
                            const ymd = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                            const isPast = new Date(ymd + "T00:00:00") < today;
                            const isToday = ymd === todayYMD;
                            const isUnavailable = unavailableSet.has(ymd);
                            const isSelected = selected === ymd;

                            let cellClass = "relative flex items-center justify-center h-8 w-full rounded-lg text-xs font-semibold transition-all duration-150 ";

                            if (isPast) {
                                cellClass += "text-gray-700 cursor-not-allowed";
                            } else if (isSelected) {
                                cellClass += "bg-nepal-orange text-white shadow-md shadow-nepal-orange/30 scale-105";
                            } else if (isUnavailable) {
                                cellClass += "text-red-400/70 cursor-pointer hover:bg-red-500/10";
                            } else if (isToday) {
                                cellClass += "text-nepal-orange border border-nepal-orange/40 cursor-pointer hover:bg-nepal-orange/10";
                            } else {
                                cellClass += "text-gray-300 cursor-pointer hover:bg-white/8 hover:text-white";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => !isPast && handleSelect(day)}
                                    className={cellClass}
                                    disabled={isPast}
                                >
                                    {day}
                                    {isUnavailable && !isPast && !isSelected && (
                                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400/60" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Result pill */}
                    {selected && selectedResult && (
                        <div className="px-4 pb-4">
                            {selectedResult === "available" ? (
                                <div className="flex items-center gap-2.5 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                                    <div>
                                        <p className="text-green-400 text-xs font-bold">{firstName} is available</p>
                                        <p className="text-gray-500 text-[11px] mt-0.5">{formatDisplayDate(selected)}</p>
                                    </div>
                                </div>
                            ) : selectedResult === "unavailable" ? (
                                <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                                    <div>
                                        <p className="text-red-400 text-xs font-bold">{firstName} is unavailable</p>
                                        <p className="text-gray-500 text-[11px] mt-0.5">{formatDisplayDate(selected)} is already booked</p>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}

                    {/* Legend */}
                    <div className="flex items-center gap-4 px-5 pb-4 text-[10px] text-gray-600">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400/60" /> Booked
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full border border-nepal-orange/40" /> Today
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-nepal-orange" /> Selected
                        </span>
                    </div>
                </div>
            )}

            {/* Inquire CTA at bottom */}
            <div className="px-5 pb-5 pt-1">
                <a
                    href={`mailto:hello@trekguidehub.com?subject=Availability inquiry for ${guideName}${selected ? ` — ${formatDisplayDate(selected)}` : ""}`}
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-nepal-orange px-6 py-3 font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 text-sm"
                >
                    <MessageCircle className="w-4 h-4" />
                    {selected && selectedResult === "available"
                        ? `Book ${firstName} for ${formatDisplayDate(selected)}`
                        : `Inquire About ${firstName}`}
                </a>
                <p className="text-center text-gray-600 text-[11px] mt-2.5">
                    We&apos;ll confirm within 24 hours
                </p>
            </div>
        </div>
    );
}
