"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { useState } from "react";

export default function RegisterEventPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const { eventId } = useParams();

    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const event = useQuery(api.events.getById, { id: eventId as any });
    const register = useMutation(api.registrations.create);

    const [category, setCategory] = useState<"Pemula" | "Standard" | "Speed">("Standard");
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isLoaded || athlete === undefined || event === undefined) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Menyiapkan Formulir Pendaftaran...
        </div>
    );

    if (!athlete || !event) return null;

    const MATA_LOMBA = {
        Pemula: ["50m", "100m"],
        Standard: ["500m+D", "1000m"],
        Speed: ["200m DTT (Wajib)", "500m+D", "1000m", "Elimination", "PTP", "Relay"]
    };

    const handleEventToggle = (evt: string) => {
        setSelectedEvents(prev =>
            prev.includes(evt) ? prev.filter(e => e !== evt) : [...prev, evt]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedEvents.length === 0) {
            alert("Pilih minimal satu mata lomba!");
            return;
        }

        setIsSubmitting(true);
        try {
            await register({
                eventId: event._id,
                athleteId: athlete._id,
                category,
                selectedEvents
            });
            router.push("/dashboard?reg=success");
        } catch (error: any) {
            alert(error.message);
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/40 border border-white/10 p-8 md:p-14 rounded-[3rem] backdrop-blur-md shadow-2xl"
                >
                    <div className="text-center mb-12">
                        <span className="text-brand-blue font-heading font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Event Registration</span>
                        <h1 className="text-4xl font-heading font-black uppercase tracking-tighter mb-4 italic leading-tight">
                            {event.name}
                        </h1>
                        <p className="text-zinc-500 font-body text-sm max-w-md mx-auto leading-relaxed">
                            Pilih kategori dan mata lomba yang akan kamu ikuti. Pastikan pilihan sudah sesuai dengan regulasi KU.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Category Selection */}
                        <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 px-2">Pilih Kategori Utama</label>
                            <div className="grid grid-cols-3 gap-4">
                                {["Pemula", "Standard", "Speed"].map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => {
                                            setCategory(cat as any);
                                            setSelectedEvents([]);
                                        }}
                                        className={`py-4 rounded-xl font-heading font-black uppercase text-[10px] tracking-widest border transition-all ${category === cat ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Events Selection */}
                        <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 px-2">Pilih Nomor Lomba ({category})</label>
                            <div className="grid gap-3">
                                {MATA_LOMBA[category].map((evt) => (
                                    <button
                                        key={evt}
                                        type="button"
                                        onClick={() => handleEventToggle(evt)}
                                        className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${selectedEvents.includes(evt)
                                            ? 'bg-brand-blue/10 border-brand-blue text-white'
                                            : 'bg-black/40 border-white/5 text-zinc-500 hover:border-white/20'
                                            }`}
                                    >
                                        <span className="font-heading font-black uppercase text-xs tracking-widest">{evt}</span>
                                        {selectedEvents.includes(evt) && (
                                            <div className="w-5 h-5 bg-brand-blue rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-8">
                            <div className="text-center">
                                <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-2">Total Mata Lomba</p>
                                <p className="text-3xl font-heading font-black italic">{selectedEvents.length}</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || selectedEvents.length === 0}
                                className="w-full bg-white text-black font-heading font-black uppercase text-sm tracking-[0.2em] py-6 rounded-2xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl disabled:opacity-30 flex items-center justify-center gap-4"
                            >
                                {isSubmitting ? "Memproses..." : "Konfirmasi Pendaftaran Event"}
                            </button>

                            <button
                                type="button" onClick={() => router.back()}
                                className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 hover:text-white transition-colors"
                            >
                                Batal & Kembali
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
