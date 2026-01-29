"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function AdminEventsPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const events = useQuery(api.events.list);

    const createEvent = useMutation(api.events.create);
    const updateEvent = useMutation(api.events.update);
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

    if (!isLoaded || athlete === undefined || events === undefined) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Memuat Data Event...
        </div>
    );

    const isAdmin = athlete?.role === "superadmin" || athlete?.role === "admin";
    if (!isAdmin) {
        router.push("/");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createEvent({
                ...formData,
                adminClerkId: user?.id || ""
            });
            setIsAdding(false);
            setFormData({ name: "", date: "", location: "", description: "", type: "tickets", isBadge: false });
        } catch (error) {
            console.error("Gagal buat event:", error);
        }
    };

    const handleDelete = async (id: any) => {
        if (!confirm("Hapus event ini? Data pendaftaran yang terkait mungkin bermasalah.")) return;
        try {
            await deleteEvent({ id, adminClerkId: user?.id || "" });
        } catch (error) {
            console.error("Gagal hapus:", error);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-[1366px] mx-auto">
                <div className="mb-16 flex items-end justify-between">
                    <div>
                        <button onClick={() => router.push("/admin")} className="text-zinc-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.5em] mb-4">← Dashboard</button>
                        <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic">Manage <span className="text-brand-blue">Events</span></h1>
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-white text-black font-heading font-black uppercase text-xs tracking-widest px-8 py-4 rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl"
                    >
                        {isAdding ? "Batal" : "+ Series Baru"}
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {isAdding && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mb-16"
                        >
                            <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-white/10 p-12 rounded-[3rem] backdrop-blur-md grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Nama Series</label>
                                    <input
                                        type="text" required value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 font-body focus:outline-none focus:border-brand-blue/50 text-lg"
                                        placeholder="SERIES #2 MALANG"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Tanggal Pelaksanaan</label>
                                    <input
                                        type="text" required value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 font-body focus:outline-none focus:border-brand-blue/50 text-lg"
                                        placeholder="3 - 5 OKTOBER 2025"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Lokasi / Sirkuit</label>
                                    <input
                                        type="text" required value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 font-body focus:outline-none focus:border-brand-blue/50 text-lg"
                                        placeholder="KANJURUHAN, MALANG"
                                    />
                                </div>
                                <div className="flex gap-8">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Status</label>
                                        <select
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 font-heading font-black uppercase text-xs tracking-widest focus:outline-none focus:border-brand-blue/50 h-[68px]"
                                        >
                                            <option value="tickets">OPEN REGISTRATION</option>
                                            <option value="soon">COMING SOON</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-4 pt-4">
                                        <input
                                            type="checkbox" id="isBadge" checked={formData.isBadge}
                                            onChange={e => setFormData({ ...formData, isBadge: e.target.checked })}
                                            className="w-6 h-6 rounded border-white/10 bg-black/40 text-brand-blue focus:ring-brand-blue"
                                        />
                                        <label htmlFor="isBadge" className="font-heading font-black uppercase text-[10px] tracking-widest text-zinc-400">Featured Badge</label>
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Short Description</label>
                                    <textarea
                                        required value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 font-body focus:outline-none focus:border-brand-blue/50 h-32 resize-none"
                                        placeholder="Tuliskan info singkat mengenai series ini..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <button type="submit" className="w-full bg-brand-blue text-white font-heading font-black uppercase tracking-[0.2em] py-6 rounded-2xl hover:bg-white hover:text-black transition-all shadow-2xl">
                                        Publish Series Competiton
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div key={event._id} className="group bg-zinc-900/30 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-md hover:border-brand-blue/30 transition-all flex flex-col relative overflow-hidden">
                            {event.isBadge && <div className="absolute top-0 right-0 bg-brand-blue text-[8px] font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest">Featured</div>}
                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 block ${event.type === 'tickets' ? 'text-green-500' : 'text-zinc-600'}`}>
                                {event.type === 'tickets' ? '● Open Reg' : '○ Coming Soon'}
                            </span>
                            <h3 className="text-3xl font-heading font-black uppercase italic mb-4 group-hover:text-brand-blue transition-colors">
                                {event.name}
                            </h3>
                            <div className="space-y-4 mb-12 flex-grow">
                                <p className="text-zinc-400 font-body text-sm leading-relaxed">{event.description}</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                                    <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                                    <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{event.location}</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => router.push(`/admin/events/${event._id}/results`)}
                                    className="flex-[2] bg-brand-blue text-white text-[10px] font-black uppercase py-4 rounded-xl hover:bg-white hover:text-black transition-all"
                                >
                                    Input Hasil
                                </button>
                                <button className="flex-1 bg-white/5 text-zinc-500 text-[10px] font-black uppercase py-4 rounded-xl hover:bg-white hover:text-black transition-all">Edit</button>
                                <button onClick={() => handleDelete(event._id)} className="flex-1 bg-red-500/10 text-red-500 text-[10px] font-black uppercase py-4 rounded-xl hover:bg-red-500 hover:text-white transition-all">Del</button>
                            </div>
                        </div>
                    ))}
                    {events.length === 0 && !isAdding && (
                        <div className="md:col-span-3 py-32 text-center border border-zinc-900 border-dashed rounded-[3rem] text-zinc-700 font-body italic">
                            Belum ada seri kompetisi yang terdaftar.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
