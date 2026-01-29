"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminResultsPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const { eventId } = useParams();

    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const event = useQuery(api.events.getById, { id: eventId as any });
    const registrations = useQuery(api.registrations.getForEvent, {
        eventId: eventId as any,
        adminClerkId: user?.id || ""
    });

    const inputResult = useMutation(api.admin.inputResult);

    const [selectedReg, setSelectedReg] = useState<any>(null);
    const [resultForm, setResultForm] = useState({
        subEvent: "",
        score: "",
        rank: 1
    });

    if (!isLoaded || athlete === undefined || registrations === undefined || event === undefined) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Memuat Data Pendaftar...
        </div>
    );

    const isAdmin = athlete?.role === "superadmin" || athlete?.role === "admin";
    if (!isAdmin) {
        router.push("/");
        return null;
    }

    const handleInputResult = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedReg) return;

        try {
            await inputResult({
                athleteId: selectedReg.athleteId,
                eventId: event._id,
                category: selectedReg.category,
                subEvent: resultForm.subEvent,
                score: resultForm.score,
                rank: resultForm.rank,
                adminClerkId: user?.id || ""
            });
            alert("Hasil berhasil disimpan!");
            setSelectedReg(null);
            setResultForm({ subEvent: "", score: "", rank: 1 });
        } catch (error) {
            console.error(error);
            alert("Gagal simpan hasil.");
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-[1366px] mx-auto">
                <div className="mb-16">
                    <button onClick={() => router.push("/admin/events")} className="text-zinc-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.5em] mb-4">← Back to Events</button>
                    <h1 className="text-5xl font-heading font-black uppercase tracking-tighter italic leading-none">
                        Results: <span className="text-brand-blue">{event.name}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* List Pendaftar */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/5">
                                    <tr>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Atlet</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">KU</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Kategori</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {registrations.map((reg) => (
                                        <tr key={reg._id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-6">
                                                <div className="font-heading font-black uppercase text-sm italic">{reg.athleteName}</div>
                                                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{reg.clubName}</div>
                                            </td>
                                            <td className="p-6 font-heading font-black text-brand-blue">KU {reg.ku}</td>
                                            <td className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">{reg.category}</td>
                                            <td className="p-6">
                                                <button
                                                    onClick={() => {
                                                        setSelectedReg(reg);
                                                        setResultForm({ ...resultForm, subEvent: reg.events[0] || "" });
                                                    }}
                                                    className="bg-white text-black text-[10px] font-black uppercase px-6 py-3 rounded-xl hover:bg-brand-blue hover:text-white transition-all"
                                                >
                                                    Pilih
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {registrations.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-20 text-center text-zinc-700 font-body italic">Belum ada pendaftar terverifikasi untuk event ini.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Input Form */}
                    <div className="space-y-8">
                        {selectedReg ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-zinc-900/40 border border-brand-blue/30 p-10 rounded-[3rem] backdrop-blur-md sticky top-32"
                            >
                                <span className="text-brand-blue font-heading font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Input Score</span>
                                <h2 className="text-2xl font-heading font-black uppercase italic mb-8">{selectedReg.athleteName}</h2>

                                <form onSubmit={handleInputResult} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Nomor Lomba</label>
                                        <select
                                            value={resultForm.subEvent}
                                            onChange={e => setResultForm({ ...resultForm, subEvent: e.target.value })}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 font-heading font-black uppercase text-xs tracking-widest focus:outline-none focus:border-brand-blue/50"
                                        >
                                            {selectedReg.events.map((e: string) => (
                                                <option key={e} value={e}>{e}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Skor (Waktu/Jarak)</label>
                                        <input
                                            type="text" required value={resultForm.score}
                                            onChange={e => setResultForm({ ...resultForm, score: e.target.value })}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 font-body focus:outline-none focus:border-brand-blue/50"
                                            placeholder="contoh: 45.23s"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Peringkat (Rank)</label>
                                        <input
                                            type="number" min="1" required value={resultForm.rank}
                                            onChange={e => setResultForm({ ...resultForm, rank: parseInt(e.target.value) })}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 font-heading font-black text-xl text-brand-blue focus:outline-none focus:border-brand-blue/50"
                                        />
                                    </div>
                                    <div className="pt-4">
                                        <button type="submit" className="w-full bg-brand-blue text-white font-heading font-black uppercase tracking-[0.2em] py-5 rounded-xl hover:bg-white hover:text-black transition-all shadow-2xl">
                                            Simpan & Hitung Poin
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedReg(null)}
                                            className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-all"
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        ) : (
                            <div className="bg-zinc-900/40 border border-white/5 p-16 rounded-[3rem] backdrop-blur-md text-center">
                                <p className="text-zinc-600 font-body text-sm italic">Pilih atlet dari tabel di samping untuk memasukkan hasil lomba.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
