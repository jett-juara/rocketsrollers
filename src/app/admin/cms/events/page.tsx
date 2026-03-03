"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CalendarDays, Plus, Trash2, Edit3, MapPin, Clock, FileText, CheckCircle2 } from "lucide-react";

export default function CMSEventsPage() {
    const { user } = useUser();
    const events = useQuery(api.events.list);
    const createEvent = useMutation(api.events.create);
    const deleteEvent = useMutation(api.events.remove);

    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        location: "",
        description: "",
        type: "tickets" as "tickets" | "soon",
        isBadge: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createEvent({
                ...formData,
            });
            setIsAdding(false);
            setFormData({ name: "", date: "", location: "", description: "", type: "tickets", isBadge: false });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: any) => {
        if (!confirm("Hapus event ini?")) return;
        try {
            await deleteEvent({ id });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-[1200px]">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <CalendarDays className="w-5 h-5 text-brand-blue" />
                        <span className="text-zinc-500 font-heading font-black uppercase tracking-[0.4em] text-[10px]">Event Hub</span>
                    </div>
                    <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic leading-none">
                        Competition <span className="text-zinc-500">Series</span>
                    </h1>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-white text-black font-heading font-black uppercase text-[10px] tracking-widest px-8 py-4 rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl flex items-center gap-3"
                >
                    {isAdding ? "Cancel" : <><Plus className="w-4 h-4" /> New Series</>}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-12"
                    >
                        <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-white/10 p-12 rounded-[3rem] backdrop-blur-md grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Nama Series</label>
                                <input
                                    type="text" required value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 font-heading font-black uppercase text-sm tracking-widest focus:outline-none focus:border-brand-blue/50"
                                    placeholder="SERIES #2 MALANG"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Tanggal</label>
                                <input
                                    type="text" required value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 font-body focus:outline-none focus:border-brand-blue/50"
                                    placeholder="3 - 5 OKTOBER 2025"
                                />
                            </div>
                            <div className="space-y-2 text-[10px]">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Sirkuit / Lokasi</label>
                                <input
                                    type="text" required value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 font-body focus:outline-none focus:border-brand-blue/50"
                                    placeholder="KANJURUHAN, MALANG"
                                />
                            </div>
                            <div className="flex gap-8">
                                <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Status</label>
                                    <select
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 h-[68px] font-heading font-black uppercase text-[10px] tracking-widest appearance-none cursor-pointer focus:outline-none focus:border-brand-blue"
                                    >
                                        <option value="tickets">Open Registration</option>
                                        <option value="soon">Coming Soon</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-4 pt-4">
                                    <input
                                        type="checkbox" id="isBadge" checked={formData.isBadge}
                                        onChange={e => setFormData({ ...formData, isBadge: e.target.checked })}
                                        className="w-6 h-6 rounded border-white/10 bg-black/40 text-brand-blue focus:ring-brand-blue"
                                    />
                                    <label htmlFor="isBadge" className="font-heading font-black uppercase text-[10px] tracking-widest text-zinc-400">Featured</label>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Description</label>
                                <textarea
                                    required value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 font-body text-sm focus:outline-none focus:border-brand-blue/50 h-32 resize-none"
                                    placeholder="Short summary of the event..."
                                />
                            </div>
                            <div className="md:col-span-2">
                                <button type="submit" className="w-full bg-brand-blue text-white font-heading font-black uppercase tracking-[0.2em] py-6 rounded-2xl hover:bg-white hover:text-black transition-all shadow-2xl">
                                    Apply Event Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events?.map((event) => (
                    <div key={event._id} className="group bg-zinc-900/30 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md hover:border-brand-blue/30 transition-all relative overflow-hidden">
                        {event.isBadge && (
                            <div className="absolute top-0 right-0 bg-brand-blue/10 text-brand-blue text-[8px] font-black px-4 py-2 rounded-bl-2xl uppercase tracking-[0.2em] border-l border-b border-brand-blue/20">
                                Featured Series
                            </div>
                        )}
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-2 h-2 rounded-full ${event.type === 'tickets' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-zinc-700'}`}></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                                {event.type === 'tickets' ? 'Open Reg' : 'Soon'}
                            </span>
                        </div>
                        <h3 className="text-3xl font-heading font-black uppercase italic mb-6 group-hover:text-brand-blue transition-colors">
                            {event.name}
                        </h3>
                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3 text-zinc-500">
                                <MapPin className="w-4 h-4 text-brand-blue/50" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{event.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-500">
                                <Clock className="w-4 h-4 text-brand-blue/50" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-500">
                                <FileText className="w-4 h-4 text-brand-blue/50" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue underline cursor-pointer">Handbook Integrated</span>
                            </div>
                        </div>
                        <div className="flex gap-4 pt-6 border-t border-white/5">
                            <button className="flex-1 bg-white/5 text-zinc-500 text-[10px] font-black uppercase py-4 rounded-xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                                <Edit3 className="w-4 h-4" /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(event._id)}
                                className="flex-1 bg-red-500/10 text-red-500 text-[10px] font-black uppercase py-4 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
