import React from "react";
import { MapPin, Users, Activity, Wallet, Calendar, User, Mail, MessageSquare, Send } from "lucide-react";

const REGIONS = ["Everest Region", "Annapurna Region", "Manaslu Region", "Langtang Region", "Western Region", "I'm not sure yet!"];
const STYLES = ["Private Guide (Just me/my group)", "Join a Group"];
const PACES = ["Easy / Beginner", "Moderate / Intermediate", "Challenging / Expert"];
const BUDGETS = ["Budget (Standard teahouses)", "Comfort (Upgraded lodges where available)", "Luxury (Premium lodges/helicopter returns)"];
const GENDERS = ["No Preference", "Female Guide", "Male Guide"];

const FormSection = ({ icon: Icon, title, description, children }: any) => (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                <Icon className="w-6 h-6 text-nepal-orange" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
        </div>
        {children}
    </div>
);

export default function MatchmakerForm() {
    return (
        <form action="https://formsubmit.co/sarojsapkota19970711@gmail.com" method="POST" className="space-y-6">
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New TrekGuide Hub Lead!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="grid md:grid-cols-2 gap-6">
                <FormSection icon={MapPin} title="Destination" description="Where do you want to trek?">
                    <select
                        name="Region"
                        required
                        defaultValue=""
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange transition-all appearance-none cursor-pointer"
                    >
                        <option value="" disabled>Select a region...</option>
                        {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </FormSection>

                <FormSection icon={Users} title="Trek Style" description="Group or private guide?">
                    <select
                        name="Trek_Style"
                        required
                        defaultValue=""
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange transition-all appearance-none cursor-pointer"
                    >
                        <option value="" disabled>Select a style...</option>
                        {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </FormSection>

                <FormSection icon={Activity} title="Pace & Fitness" description="How intense should it be?">
                    <select
                        name="Pace"
                        required
                        defaultValue=""
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange transition-all appearance-none cursor-pointer"
                    >
                        <option value="" disabled>Select your pace...</option>
                        {PACES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </FormSection>

                <FormSection icon={Wallet} title="Accommodation" description="What's your comfort level?">
                    <select
                        name="Budget"
                        required
                        defaultValue=""
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange transition-all appearance-none cursor-pointer"
                    >
                        <option value="" disabled>Select a budget style...</option>
                        {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </FormSection>

                <FormSection icon={User} title="Guide" description="Gender preference or specific guide name?">
                    <div className="space-y-4">
                        <select
                            name="Guide_Gender"
                            required
                            defaultValue=""
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange transition-all appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Select gender preference...</option>
                            {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <input
                            type="text"
                            name="Guide_Name"
                            placeholder="Specific Guide Name (Optional)"
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange transition-all"
                        />
                    </div>
                </FormSection>

                <FormSection icon={Calendar} title="Travel Dates" description="When are you planning to go?">
                    <input
                        type="text"
                        name="Travel_Dates"
                        required
                        placeholder="e.g., October 2026 or dates"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange transition-all"
                    />
                </FormSection>
            </div>

            <FormSection icon={Mail} title="Contact Information" description="How should we reach you with your matches?">
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="Name"
                        required
                        placeholder="Full Name"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange transition-all"
                    />
                    <input
                        type="email"
                        name="Email"
                        required
                        placeholder="Email Address"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange transition-all"
                    />
                </div>
            </FormSection>

            <FormSection icon={MessageSquare} title="Special Requests" description="Any medical conditions, dietary needs, or specific goals? (Optional)">
                <textarea
                    name="Requests"
                    rows={4}
                    placeholder="Tell us anything else we should know to make your trek perfect..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange transition-all resize-none"
                />
            </FormSection>

            <div className="pt-6">
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-nepal-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] hover:-translate-y-1"
                >
                    Get your guide
                    <Send className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">
                    No payment required. We'll connect you with vetted local experts based on your preferences.
                </p>
                <p className="text-center text-xs text-gray-500 mt-2">
                    Submitting this form will securely send your details to our team. Please check your email inbox to confirm.
                </p>
            </div>
        </form>
    );
}
