"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Trash2, Plus, ListChecks } from "lucide-react";

interface ChecklistItem {
    id: number;
    text: string;
    completed: boolean;
}

export default function GearChecklist() {
    const [items, setItems] = useState<ChecklistItem[]>([
        { id: 1, text: "Break-in my trekking boots", completed: false },
        { id: 2, text: "Purchase travel insurance with heli-evac", completed: false },
        { id: 3, text: "Get medical clearance/check-up", completed: false },
        { id: 4, text: "Pack a down jacket rated for -15°C", completed: false },
    ]);
    const [newItem, setNewItem] = useState("");

    const toggleItem = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.trim()) return;
        setItems([...items, { id: Date.now(), text: newItem, completed: false }]);
        setNewItem("");
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const completedCount = items.filter(i => i.completed).length;

    return (
        <section className="max-w-3xl mx-auto py-12 px-6 rounded-[2.5rem] bg-slate-900/50 border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-nepal-orange rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                        <ListChecks className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Your Prep List</h3>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Progress</div>
                    <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-nepal-orange"
                                initial={{ width: 0 }}
                                animate={{ width: `${(completedCount / items.length) * 100}%` }}
                            />
                        </div>
                        <span className="text-xs font-bold text-white">{completedCount}/{items.length}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={addItem} className="flex gap-2 mb-8">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add custom item (e.g. Extra camera batteries)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-nepal-orange/50 transition-colors"
                />
                <button
                    type="submit"
                    className="bg-white/10 hover:bg-nepal-orange text-white p-4 rounded-2xl transition-all group"
                >
                    <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
            </form>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${item.completed
                                    ? "bg-white/5 border-white/5 opacity-50"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                                }`}
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="flex items-center gap-4 flex-1 text-left"
                            >
                                {item.completed ? (
                                    <CheckCircle2 className="w-6 h-6 text-nepal-orange shrink-0" />
                                ) : (
                                    <Circle className="w-6 h-6 text-gray-600 shrink-0" />
                                )}
                                <span className={`text-[15px] font-medium transition-all ${item.completed ? "text-gray-500 line-through" : "text-gray-200"
                                    }`}>
                                    {item.text}
                                </span>
                            </button>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {items.length === 0 && (
                <div className="text-center py-12 text-gray-500 italic">
                    Your list is empty. Add something to get started!
                </div>
            )}
        </section>
    );
}
