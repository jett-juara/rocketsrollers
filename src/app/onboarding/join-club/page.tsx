"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JoinClubPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const verifiedClubs = useQuery(api.clubs.get);
    const createRequest = useMutation(api.clubs.createMembershipRequest);

    if (!isLoaded || !athlete || !verifiedClubs) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Mencari klub terdaftar...
        </div>
    );

    const filteredClubs = verifiedClubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (club.city && club.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleJoinRequest = async (clubId: any) => {
        try {
            await createRequest({
                athleteId: athlete._id,
                clubId: clubId
            });
            router.push("/dashboard?status=pending");
        } catch (error) {
            console.error("Gagal mengirim permintaan:", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-xl"></div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
                <motion.div
                    initial={{ width: "66.66%" }}
                    animate={{ width: "100%" }}
                    className="h-full bg-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                ></motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-3xl pt-20"
            >
                <div className="text-center mb-12">
                    <span className="text-brand-blue font-heading font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                        Step 03 / 03
                    </span>
                    <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-4 italic">
                        Cari Klub Kamu
                    </h1>
                    <p className="text-zinc-500 font-body text-sm max-w-md mx-auto leading-relaxed">
                        Pilih klub resmi yang sudah terdaftar di RocketsRollers untuk bergabung dan berkompetisi secara kolektif.
                    </p>
                </div>

                <div className="relative mb-12 group">
                    <input
                        type="text"
                        placeholder="Ketik nama klub atau kota..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl py-6 px-8 font-body text-xl focus:outline-none focus:border-brand-blue/50 focus:bg-zinc-900/60 transition-all backdrop-blur-sm shadow-2xl"
                    />
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-700 font-black uppercase tracking-[0.3em] text-[10px] py-1 px-3 border border-zinc-900 rounded-lg">
                        SEARCH
                    </div>
                </div>

                <div className="grid gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredClubs.length > 0 ? (
                            filteredClubs.map((club, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={club._id}
                                    className="bg-zinc-900/30 border border-white/5 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between group hover:bg-zinc-900/60 transition-all backdrop-blur-md"
                                >
                                    <div className="flex items-center gap-8 mb-6 md:mb-0 w-full md:w-auto">
                                        <div className="w-20 h-20 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center text-3xl font-heading font-black overflow-hidden shadow-inner group-hover:border-brand-blue/30 transition-colors">
                                            {club.logo ? (
                                                <img src={club.logo} alt={club.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            ) : (
                                                <span className="text-zinc-800 group-hover:text-brand-blue transition-colors">{club.name.substring(0, 2).toUpperCase()}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-heading font-black uppercase group-hover:text-brand-blue transition-colors mb-1 italic">
                                                {club.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-brand-blue transition-colors"></div>
                                                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] group-hover:text-zinc-400 transition-colors">
                                                    {club.city || "LOKASI TIDAK TERDATA"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleJoinRequest(club._id)}
                                        className="w-full md:w-auto bg-white text-black font-heading font-black uppercase text-xs tracking-widest px-8 py-4 rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-3 group/btn"
                                    >
                                        Minta Gabung
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-24 bg-zinc-900/10 border border-zinc-900/50 border-dashed rounded-[2rem]"
                            >
                                <div className="text-4xl mb-4 opacity-20">🔎</div>
                                <p className="text-zinc-700 font-body italic text-sm">
                                    Klub tidak ditemukan. <br />Pastikan ejaan benar atau coba jalur <span className="text-zinc-500 font-bold uppercase not-italic">Klub Belum Terdaftar</span>.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => router.back()}
                        className="group inline-flex items-center gap-3 text-zinc-700 hover:text-white transition-all uppercase text-[10px] tracking-[0.4em] font-black"
                    >
                        <span className="group-hover:-translate-x-2 transition-transform">←</span> Kembali ke Pilihan Jalur
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
