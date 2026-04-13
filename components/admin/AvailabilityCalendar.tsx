"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, XCircle } from "lucide-react";

// ─── Utility helpers ──────────────────────────────────────────────────────────

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Auto-compute availability status purely from the list of blocked dates.
 *
 * Rules:
 *  - today is not blocked → AVAILABLE
 *  - today is blocked and there's an unblocked date within 365 days → AVAILABLE_SOON
 *  - blocked for the entire next year → UNAVAILABLE
 */
export function computeAvailability(dates: string[]): {
  status: "AVAILABLE" | "UNAVAILABLE" | "AVAILABLE_SOON";
  availableFromDate: string;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toDateStr(today);

  if (!dates.includes(todayStr)) {
    return { status: "AVAILABLE", availableFromDate: "" };
  }

  // Seek the first open day after today
  const check = new Date(today);
  for (let i = 1; i <= 365; i++) {
    check.setDate(check.getDate() + 1);
    const ds = toDateStr(check);
    if (!dates.includes(ds)) {
      return { status: "AVAILABLE_SOON", availableFromDate: ds };
    }
  }

  return { status: "UNAVAILABLE", availableFromDate: "" };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const STATUS_META = {
  AVAILABLE: {
    icon: CheckCircle2,
    label: "Available",
    cls: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
  },
  UNAVAILABLE: {
    icon: XCircle,
    label: "Unavailable",
    cls: "text-red-400",
    border: "border-red-400/20",
    bg: "bg-red-400/5",
  },
  AVAILABLE_SOON: {
    icon: Clock,
    label: "Available Soon",
    cls: "text-amber-400",
    border: "border-amber-400/20",
    bg: "bg-amber-400/5",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  /** Blocked / unavailable dates as YYYY-MM-DD strings */
  unavailableDates: string[];
  onChange: (
    dates: string[],
    status: "AVAILABLE" | "UNAVAILABLE" | "AVAILABLE_SOON",
    availableFromDate: string
  ) => void;
}

export default function AvailabilityCalendar({ unavailableDates, onChange }: Props) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const todayStr = useMemo(() => toDateStr(today), [today]);

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const blockedSet = useMemo(() => new Set(unavailableDates), [unavailableDates]);

  /** Build the grid cells for the current view-month (null = padding cell) */
  const cells = useMemo<(number | null)[]>(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstWeekDay = new Date(year, month, 1).getDay(); // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startPad = (firstWeekDay + 6) % 7; // shift so Monday = 0

    const arr: (number | null)[] = [];
    for (let i = 0; i < startPad; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [viewDate]);

  const availability = useMemo(
    () => computeAvailability(unavailableDates),
    [unavailableDates]
  );

  function prevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }
  function nextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function handleDayClick(day: number) {
    const dateObj = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    dateObj.setHours(0, 0, 0, 0);
    if (dateObj < today) return; // no editing past dates

    const ds = toDateStr(dateObj);
    const newSet = new Set(blockedSet);
    newSet.has(ds) ? newSet.delete(ds) : newSet.add(ds);

    const sorted = Array.from(newSet).sort();
    const { status, availableFromDate } = computeAvailability(sorted);
    onChange(sorted, status, availableFromDate);
  }

  const { icon: StatusIcon, label, cls, border, bg } = STATUS_META[availability.status];

  return (
    <div className="space-y-3">
      {/* Calendar card */}
      <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden select-none">
        {/* Month nav */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-white">
            {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day-of-week header */}
        <div className="grid grid-cols-7 border-b border-white/5">
          {WEEK_DAYS.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-[10px] uppercase tracking-widest font-semibold text-gray-600"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`pad-${idx}`} className="aspect-square" />;
            }

            const dateObj = new Date(
              viewDate.getFullYear(),
              viewDate.getMonth(),
              day
            );
            dateObj.setHours(0, 0, 0, 0);
            const ds = toDateStr(dateObj);
            const isPast = dateObj < today;
            const isToday = ds === todayStr;
            const isBlocked = blockedSet.has(ds);

            let cls =
              "aspect-square flex items-center justify-center text-xs font-medium transition-colors rounded-sm";

            if (isPast) {
              cls += " text-gray-700 cursor-default";
            } else if (isBlocked) {
              cls +=
                " bg-red-500/20 text-red-400 hover:bg-red-500/30 cursor-pointer";
            } else if (isToday) {
              cls +=
                " text-nepal-orange ring-1 ring-inset ring-nepal-orange/50 hover:bg-nepal-orange/10 cursor-pointer";
            } else {
              cls +=
                " text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer";
            }

            return (
              <div
                key={ds}
                className={cls}
                onClick={() => !isPast && handleDayClick(day)}
                title={isBlocked ? "Mark as available" : "Mark as unavailable"}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-red-500/20 border border-red-500/20" />
            <span className="text-[10px] text-gray-600">Unavailable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm ring-1 ring-nepal-orange/50" />
            <span className="text-[10px] text-gray-600">Today</span>
          </div>
          <p className="ml-auto text-[10px] text-gray-600">Click date to toggle</p>
        </div>
      </div>

      {/* Auto-computed status badge */}
      <div className={`flex items-start gap-3 p-4 rounded-xl border ${border} ${bg}`}>
        <StatusIcon className={`w-5 h-5 ${cls} shrink-0 mt-0.5`} />
        <div>
          <p className={`text-sm font-semibold ${cls}`}>{label}</p>
          {availability.status === "AVAILABLE_SOON" && availability.availableFromDate && (
            <p className="text-xs text-gray-500 mt-0.5">
              Next available:{" "}
              <span className="text-amber-300 font-semibold">
                {new Date(availability.availableFromDate + "T12:00:00").toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                )}
              </span>
            </p>
          )}
          {availability.status === "AVAILABLE" && unavailableDates.length > 0 && (
            <p className="text-xs text-gray-500 mt-0.5">
              {unavailableDates.length} specific date
              {unavailableDates.length !== 1 ? "s" : ""} blocked
            </p>
          )}
          {availability.status === "AVAILABLE" && unavailableDates.length === 0 && (
            <p className="text-xs text-gray-500 mt-0.5">
              No dates blocked — click any future date to mark unavailable
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
