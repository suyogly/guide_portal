"use client";

import { useState } from "react";
import { Shield, Users } from "lucide-react";
import AltitudeChart from "./AltitudeChart";
import DayByDayTimeline, { DayData } from "./DayByDayTimeline";
import BookingSidebar from "./BookingSidebar";
import FAQ from "./FAQ";
import ValueProposition from "./ValueProposition";
import GuideCredentials from "./GuideCredentials";
import CostBreakdown from "./CostBreakdown";
import PermitsLogistics from "./PermitsLogistics";
import GuideCtaSection from "./GuideCtaSection";
import SafetyProtocol from "./SafetyProtocol";
import RelatedTreks from "./RelatedTreks";

export default function ItineraryView({ data, description, faqs, mapImage, slug }: {
    data: DayData[],
    description?: string,
    faqs?: { question: string, answer: string }[],
    mapImage?: string,
    slug?: string
}) {
    const [hoveredDay, setHoveredDay] = useState<number | null>(null);

    return (
        <div className="space-y-12">
            {/* Header with Type Toggle */}


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-16">
                    {/* Trek Description */}
                    {description && (
                        <section className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                                {slug === 'ebc-trek' ? 'Everest Base Camp Trek' : slug === 'gokyo-lakes' ? 'Gokyo Lakes Trek' : slug === 'three-passes' ? 'Everest Three Passes' : 'Overview'}
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {description}
                            </p>
                        </section>
                    )}

                    {['ebc-trek', 'gokyo-lakes', 'three-passes'].includes(slug || '') && (
                        <div className="space-y-16">
                            <ValueProposition />
                            <GuideCredentials />
                        </div>
                    )}

                    {/* Visual Map Overview */}
                    {mapImage && (
                        <section className="space-y-10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-4xl font-display font-bold">Route Map</h2>
                                <span className="text-nepal-orange text-xs font-bold uppercase tracking-[0.2em]">Visual Overview</span>
                            </div>
                            <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 shadow-2xl">
                                <img
                                    src={mapImage}
                                    alt="Trek Route Map"
                                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <p className="text-white/60 text-sm font-medium italic">
                                        * This map is a representative visualization of the Lukla to Gokyo Lake route.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    <section className="space-y-10">
                        <h2 className="text-4xl font-display font-bold">Altitude Profile</h2>
                        <div className="space-y-8">
                            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                                Analyze the elevation gain and acclimatization schedule. Proper acclimatization is key to a successful summit of Base Camp.
                            </p>
                            <AltitudeChart data={data} hoveredDay={hoveredDay} />
                        </div>
                    </section>

                    <section className="space-y-10">
                        <h2 className="text-4xl font-display font-bold">Day by Day Itinerary</h2>
                        <DayByDayTimeline
                            data={data}
                            hoveredDay={hoveredDay}
                            setHoveredDay={setHoveredDay}
                        />
                    </section>

                    {['ebc-trek', 'gokyo-lakes', 'three-passes'].includes(slug || '') && (
                        <div className="space-y-16">
                            {slug === 'gokyo-lakes' ? (
                                <CostBreakdown
                                    days={11}
                                    guideRate={30}
                                    permitCost={50}
                                    agencyCost="$1,400+"
                                    trekName="Gokyo Lakes"
                                />
                            ) : slug === 'three-passes' ? (
                                <CostBreakdown
                                    days={20}
                                    guideRate={30}
                                    permitCost={50}
                                    agencyCost="$2,200+"
                                    trekName="Three Passes"
                                />
                            ) : (
                                <CostBreakdown />
                            )}
                            <PermitsLogistics />
                            <GuideCtaSection />
                            <SafetyProtocol />
                        </div>
                    )}

                    {faqs && faqs.length > 0 && (
                        <FAQ items={faqs} />
                    )}

                    {['ebc-trek', 'gokyo-lakes', 'three-passes'].includes(slug || '') && (
                        <div className="pt-8 border-t border-white/10">
                            <RelatedTreks currentSlug={slug} />
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <BookingSidebar />
                </div>
            </div>
        </div>
    );
}
