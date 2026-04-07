"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    ReferenceDot,
    ReferenceArea,
} from "recharts";
import { DayData } from "./DayByDayTimeline";

interface AltitudeChartProps {
    data: DayData[];
    hoveredDay: number | null;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const altitude = payload[0].value;
        // Standard barometric formula approximation for effective oxygen relative to sea level
        // O2% approx 20.9 * e^(-altitude/8000) is a simplified model often used in trekking
        // Actually, effective oxygen roughly halves at 5500m.
        // A common approximation for "Effective Oxygen Percentage" relative to sea level (100% at 0m)
        // is (Current Pressure / Sea Level Pressure) * 100.
        // P/P0 = exp(-h/scale_height). Scale height ~ 8000m.
        const effectiveOxygenRatio = Math.exp(-altitude / 8200);
        const effectiveOxygenPercent = (effectiveOxygenRatio * 100).toFixed(1);

        return (
            <div className="bg-slate-900/90 backdrop-blur-md border border-white/20 p-4 rounded-lg shadow-xl z-50">
                <p className="text-nepal-orange font-bold text-lg">{payload[0].payload.title}</p>
                <p className="text-gray-300">Day {label}</p>
                <div className="mt-2 space-y-1">
                    <p className="text-white font-mono text-sm">
                        Altitude: <span className="font-bold">{altitude}m</span>
                    </p>
                    <p className="text-blue-300 font-mono text-sm">
                        Effective O₂: <span className="font-bold">{effectiveOxygenPercent}%</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function AltitudeChart({ data, hoveredDay }: AltitudeChartProps) {
    return (
        <div className="w-full h-[450px] bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Elevation Profile</h3>
                <div className="text-white/30 text-xs font-mono">6000m --</div>
            </div>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorAltitude" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF671F" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#FF671F" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="day"
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            unit="m"
                            domain={[0, 6000]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceArea y1={3000} y2={5000} fill="rgba(255,165,0,0.05)" />
                        <ReferenceArea y1={5000} y2={6000} fill="rgba(255,0,0,0.05)" />

                        {/* Text for AMS zones */}
                        <ReferenceLine y={3000} stroke="rgba(255,165,0,0.2)" strokeDasharray="3 3">
                            {/* Wait, Recharts ReferenceLine label inside might be tricky, let's keep it simple with just lines and areas */}
                        </ReferenceLine>
                        <ReferenceLine y={5000} stroke="rgba(255,0,0,0.2)" strokeDasharray="3 3" />

                        <Area
                            type="monotone"
                            dataKey="altitude"
                            stroke="#FF671F"
                            strokeWidth={3}
                            fill="url(#colorAltitude)"
                            animationDuration={1500}
                        />
                        {hoveredDay && (
                            <ReferenceLine
                                x={hoveredDay}
                                stroke="#FF671F"
                                strokeDasharray="3 3"
                            />
                        )}
                        {hoveredDay && (
                            <ReferenceDot
                                x={hoveredDay}
                                y={data.find(d => d.day === hoveredDay)?.altitude}
                                r={6}
                                fill="#FF671F"
                                stroke="#020617"
                                strokeWidth={2}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-white/20 font-mono tracking-widest">
                <span>0m</span>
                <span className="ml-auto">12 days</span>
            </div>
        </div>
    );
}
