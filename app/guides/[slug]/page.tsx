import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    MoveLeft,
    BadgeCheck,
    Star,
    MapPin,
    Trophy,
    Globe,
    DollarSign,
    ShieldCheck,
    User,
    CreditCard,
    Route,
    MessageCircle,
} from "lucide-react";
import { getAllGuides, getGuideBySlug } from "@/lib/db";
import GuideAvailabilityChecker from "@/components/GuideAvailabilityChecker";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

const PROFICIENCY_STYLE: Record<string, string> = {
    Native: "bg-nepal-orange/10 text-nepal-orange border-nepal-orange/20",
    Fluent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Basic: "bg-white/5 text-gray-400 border-white/10",
};

export async function generateStaticParams() {
    const guides = await getAllGuides();
    return guides.map((g) => ({ slug: g.slug }));
}

export default async function GuideProfilePage({ params }: PageProps) {
    const { slug } = await params;
    const guide = await getGuideBySlug(slug);
    if (!guide) notFound();

    const firstName = guide.name.split(" ")[0];

    return (
        <>
            <main className="min-h-screen bg-slate-950 text-white pb-28 md:pb-16">

                {/* ── Cover ───────────────────────────────────── */}
                <div className="relative h-[50vw] max-h-[58vh] min-h-[260px] w-full bg-slate-900">
                    <Image
                        src={guide.image}
                        alt={guide.name}
                        fill
                        className="object-cover object-top opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                    <div className="absolute inset-0 bg-blue-950/20" />

                    {/* back link */}
                    <div className="absolute top-[4.5rem] sm:top-28 left-0 w-full z-20 px-4 sm:px-6">
                        <div className="max-w-5xl mx-auto">
                            <Link
                                href="/guides"
                                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                <MoveLeft className="w-4 h-4" />
                                All Guides
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── Profile card ────────────────────────────── */}
                <div className="relative z-10 -mt-14 sm:-mt-16 px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                            {/* top: avatar + name row */}
                            <div className="px-5 sm:px-8 pt-5 sm:pt-7 pb-5 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">

                                {/* avatar */}
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full overflow-hidden ring-[3px] ring-nepal-orange shadow-lg shadow-nepal-orange/20">
                                    <Image
                                        src={guide.image}
                                        alt={guide.name}
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>

                                {/* name + sub + rating */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                                        <div>
                                            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                                                {guide.name}
                                            </h1>
                                            <p className="text-nepal-orange text-sm font-semibold mt-0.5">{guide.specialty}</p>
                                        </div>
                                        {/* rate badge — desktop top-right */}
                                        <div className="hidden sm:flex items-baseline gap-1 bg-nepal-orange/10 border border-nepal-orange/20 rounded-2xl px-4 py-2">
                                            <span className="text-3xl font-display font-bold text-nepal-orange">${guide.ratePerDay}</span>
                                            <span className="text-nepal-orange/60 text-xs">/&nbsp;day</span>
                                        </div>
                                    </div>

                                    {/* quote */}
                                    <p className="text-gray-400 text-sm italic leading-relaxed border-l-2 border-nepal-orange/30 pl-3 mt-2 line-clamp-2">
                                        "{guide.quote}"
                                    </p>

                                    {/* rating + stat row */}
                                    <div className="flex flex-wrap items-center gap-3 mt-3">
                                        <div className="flex items-center gap-1">
                                            {[1,2,3,4,5].map((s) => (
                                                <Star
                                                    key={s}
                                                    className={`w-3.5 h-3.5 ${s <= Math.round(guide.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                                                />
                                            ))}
                                            <span className="text-white font-bold text-sm ml-1">{guide.rating.toFixed(1)}</span>
                                        </div>
                                        <span className="text-gray-600 text-xs">·</span>
                                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                            <Trophy className="w-3 h-3 text-nepal-orange" />
                                            {guide.experience}
                                        </div>
                                        <span className="text-gray-600 text-xs">·</span>
                                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                            <User className="w-3 h-3 text-nepal-orange" />
                                            {guide.gender}
                                        </div>
                                        {/* rate badge — mobile inline */}
                                        <div className="flex sm:hidden items-baseline gap-0.5 bg-nepal-orange/10 border border-nepal-orange/20 rounded-xl px-3 py-1">
                                            <span className="text-nepal-orange font-bold text-sm">${guide.ratePerDay}</span>
                                            <span className="text-nepal-orange/60 text-[10px]">/day</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/5 mx-5 sm:mx-8" />

                            {/* metadata grid */}
                            <div className="px-5 sm:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">

                                {/* Languages */}
                                <div>
                                    <p className="uppercase tracking-widest text-[10px] text-gray-500 font-bold mb-2.5 flex items-center gap-1.5">
                                        <Globe className="w-3 h-3 text-nepal-orange" /> Languages
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {guide.languages.map((l) => (
                                            <span
                                                key={l.language}
                                                className={`inline-flex items-center gap-1 border px-2.5 py-1 rounded-full text-[11px] font-semibold ${PROFICIENCY_STYLE[l.proficiency]}`}
                                            >
                                                {l.language}
                                                <span className="opacity-50 font-normal text-[10px]">· {l.proficiency}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Specialization */}
                                <div>
                                    <p className="uppercase tracking-widest text-[10px] text-gray-500 font-bold mb-2.5 flex items-center gap-1.5">
                                        <MapPin className="w-3 h-3 text-nepal-orange" /> Specialization
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="bg-nepal-orange/10 text-nepal-orange border border-nepal-orange/20 px-2.5 py-1 rounded-full text-[11px] font-bold">
                                            {guide.region}
                                        </span>
                                        {guide.tags.filter((t) => !t.startsWith("Lic.")).map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-white/5 text-gray-300 border border-white/10 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Routes */}
                                <div>
                                    <p className="uppercase tracking-widest text-[10px] text-gray-500 font-bold mb-2.5 flex items-center gap-1.5">
                                        <Route className="w-3 h-3 text-nepal-orange" /> Routes
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {guide.specializedRoutes.map((route) => (
                                            <span
                                                key={route}
                                                className="bg-white/[0.04] text-gray-300 border border-white/10 px-2.5 py-1 rounded-xl text-[11px] font-semibold hover:border-nepal-orange/30 transition-colors"
                                            >
                                                {route}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/5 mx-5 sm:mx-8" />

                            {/* Credentials row */}
                            <div className="px-5 sm:px-8 py-4 flex flex-wrap items-center gap-3">
                                <p className="uppercase tracking-widest text-[10px] text-gray-500 font-bold flex items-center gap-1.5 mr-1">
                                    <ShieldCheck className="w-3 h-3 text-nepal-orange" /> Credentials
                                </p>
                                {guide.kycVerified && (
                                    <span className="inline-flex items-center gap-1.5 bg-green-500/15 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-[11px] font-bold">
                                        <BadgeCheck className="w-3 h-3" /> KYC Verified
                                    </span>
                                )}
                                {guide.licenseNumber ? (
                                    <span className="inline-flex items-center gap-1.5 bg-white/5 text-gray-300 border border-white/10 px-3 py-1 rounded-full text-[11px] font-bold">
                                        <CreditCard className="w-3 h-3 text-nepal-orange" /> {guide.licenseNumber}
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 bg-white/5 text-gray-500 border border-white/8 px-3 py-1 rounded-full text-[11px]">
                                        <CreditCard className="w-3 h-3" /> No license on file
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Body: about + gallery | sidebar ──────────── */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT: About + Photo gallery */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* About */}
                            <section>
                                <p className="uppercase tracking-widest text-xs text-gray-500 font-bold mb-3">About</p>
                                <p className="text-gray-300 leading-relaxed text-[15px]">{guide.description}</p>
                            </section>

                            {/* Photo gallery — 2 per row */}
                            {guide.photos.length > 0 && (
                                <section>
                                    <p className="uppercase tracking-widest text-xs text-gray-500 font-bold mb-3">Photos</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {guide.photos.map((photo, i) => (
                                            <div
                                                key={i}
                                                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 group"
                                            >
                                                <Image
                                                    src={photo}
                                                    alt={`${guide.name} on trail ${i + 1}`}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* RIGHT: Sticky sidebar */}
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-28 space-y-5">

                                {/* Rate card */}
                                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                                    <p className="uppercase tracking-widest text-xs text-gray-500 font-bold mb-3">Daily Rate</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-display font-bold text-white">${guide.ratePerDay}</span>
                                        <span className="text-gray-400 text-sm">/&nbsp;day</span>
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1.5">
                                        Paid directly to {firstName}. No agency markup.
                                    </p>
                                </div>

                                {/* Availability checker */}
                                <GuideAvailabilityChecker
                                    guideName={guide.name}
                                    availabilityStatus={guide.availabilityStatus}
                                    availableFromDate={guide.availableFromDate}
                                    unavailableDates={guide.unavailableDates}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom CTA strip (desktop) ─────────────── */}
                <div className="hidden md:block max-w-5xl mx-auto px-4 sm:px-6 mt-12">
                    <div className="bg-gradient-to-r from-nepal-orange/10 via-orange-500/5 to-transparent border border-nepal-orange/15 rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
                        <div>
                            <p className="text-white font-display font-bold text-xl mb-1">
                                Ready to trek with {firstName}?
                            </p>
                            <p className="text-gray-400 text-sm">
                                Send an inquiry and we&apos;ll confirm availability within 24 hours.
                            </p>
                        </div>
                        <a
                            href={`mailto:hello@trekguidehub.com?subject=Booking inquiry for ${guide.name}`}
                            className="shrink-0 rounded-full bg-nepal-orange px-8 py-3.5 font-semibold text-white shadow-lg shadow-nepal-orange/25 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 text-sm whitespace-nowrap"
                        >
                            Send Inquiry
                        </a>
                    </div>
                </div>
            </main>

            {/* ── Mobile sticky bottom bar ──────────────────── */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${
                                guide.availabilityStatus === "AVAILABLE" ? "bg-green-400 animate-pulse" :
                                guide.availabilityStatus === "UNAVAILABLE" ? "bg-red-400" : "bg-yellow-400"
                            }`} />
                            <p className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">
                                {guide.availabilityStatus === "AVAILABLE" ? "Available" :
                                 guide.availabilityStatus === "UNAVAILABLE" ? "Unavailable" : "Available Soon"}
                            </p>
                        </div>
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-white font-display font-bold text-2xl">${guide.ratePerDay}</span>
                            <span className="text-gray-500 text-xs">/&nbsp;day</span>
                        </div>
                    </div>
                    <a
                        href={`mailto:hello@trekguidehub.com?subject=Inquiry for ${guide.name}`}
                        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-nepal-orange py-3 font-semibold text-white shadow-lg shadow-nepal-orange/25 text-sm"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Check Availability
                    </a>
                </div>
            </div>
        </>
    );
}
