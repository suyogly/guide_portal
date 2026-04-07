import { Calculator, CheckCircle2, Info } from "lucide-react";

interface CostBreakdownProps {
    days?: number;
    guideRate?: number;
    permitCost?: number;
    agencyCost?: string;
    trekName?: string;
}

export default function CostBreakdown({
    days = 14,
    guideRate = 30,
    permitCost = 50,
    agencyCost = "$1,800+",
    trekName = "EBC"
}: CostBreakdownProps) {
    const totalGuideCost = days * guideRate;
    const totalFoodCost = days * 35; // Assuming $35/day for food & accommodation
    const totalCost = totalGuideCost + permitCost + totalFoodCost;

    return (
        <section className="space-y-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <span className="text-nepal-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">100% Transparent</span>
                    <h2 className="text-4xl font-display font-bold text-white mb-4">Estimated Budget</h2>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        We don't sell "all-inclusive packages" because you shouldn't pay a premium for food you don't eat. Here is what a {days}-day {trekName} trek actually costs.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Cost Breakdown Column */}
                <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Calculator className="w-6 h-6 text-blue-400" />
                        Average {days}-Day Cost per Person
                    </h3>

                    <ul className="space-y-6">
                        <li className="flex justify-between items-end border-b border-white/5 pb-4">
                            <div>
                                <div className="text-white font-bold text-lg mb-1">Expert Local Guide</div>
                                <div className="text-gray-400 text-sm">~${guideRate}/day (shared up to 4 people)</div>
                            </div>
                            <div className="text-xl font-bold text-white">${totalGuideCost} <span className="text-xs text-gray-500 font-normal">total</span></div>
                        </li>
                        <li className="flex justify-between items-end border-b border-white/5 pb-4">
                            <div>
                                <div className="text-white font-bold text-lg mb-1">Permits & Fees</div>
                                <div className="text-gray-400 text-sm">Sagarmatha NP + Khumbu Municpality</div>
                            </div>
                            <div className="text-xl font-bold text-white">~${permitCost} <span className="text-xs text-gray-500 font-normal">total</span></div>
                        </li>
                        <li className="flex justify-between items-end border-b border-white/5 pb-4">
                            <div>
                                <div className="text-white font-bold text-lg mb-1">Teahouses & Food</div>
                                <div className="text-gray-400 text-sm">~$35/day (pay directly as you go)</div>
                            </div>
                            <div className="text-xl font-bold text-white">~${totalFoodCost} <span className="text-xs text-gray-500 font-normal">total</span></div>
                        </li>
                        <li className="flex justify-between items-end pt-2">
                            <div>
                                <div className="text-emerald-400 font-bold text-xl mb-1">Total Independent Cost</div>
                                <div className="text-gray-400 text-sm">vs {agencyCost} with standard agencies</div>
                            </div>
                            <div className="text-3xl font-display font-bold text-emerald-400">~${totalCost}</div>
                        </li>
                    </ul>

                    <p className="text-xs text-gray-500 italic mt-6 flex items-start gap-2">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        Costs vary based on personal eating habits and group size. Flights to Lukla (~$220 each way) are not included.
                    </p>
                </div>

                {/* Guarantee Column */}
                <div className="bg-gradient-to-br from-nepal-orange/20 to-orange-900/10 border border-nepal-orange/30 rounded-3xl p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-6">Our "No Hidden Fees" Guarantee</h3>
                    <ul className="space-y-5">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-nepal-orange flex-shrink-0" />
                            <p className="text-gray-300">You pay the guide directly for their daily rate. No platform commission shaved off their earnings.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-nepal-orange flex-shrink-0" />
                            <p className="text-gray-300">Pay for your own food and accommodation at the teahouses—avoiding standard package meal budgets.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-nepal-orange flex-shrink-0" />
                            <p className="text-gray-300">Your guide handles all permit paperwork at cost—no administration fees added.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
