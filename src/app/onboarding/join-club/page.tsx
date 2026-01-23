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

    if (!isLoaded || !athlete || !verifiedClubs) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">Mencari klub terdaftar...</div>;

    const filteredClubs = verifiedClubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleJoinRequest = async (clubId: any) => {
        try {
            await createRequest({
                athleteId: athlete._id,
                clubId: clubId
            });
            // Setelah request, arahkan ke dashboard dengan status pending
            router.push("/dashboard?status=pending");
        } catch (error) {
            console.error("Gagal mengirim permintaan:", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-3xl pt-20"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter mb-4">
                        Cari Klub Kamu
                    </h1>
                    <p className="text-zinc-400 font-body text-sm">
                        Pilih klub resmi yang sudah terdaftar di RocketsRollers untuk bergabung.
                    </p>
                </div>

                <div className="relative mb-10">
                    <input
                        type="text"
                        placeholder="Ketik nama klub..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-5 px-6 font-body text-lg focus:outline-none focus:border-brand-blue/50 transition-all"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                        SEARCH
                    </div>
                </div>

                <div className="grid gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredClubs.length > 0 ? (
                            filteredClubs.map((club) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    key={club._id}
                                    className="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:bg-zinc-900/60 transition-all"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-2xl font-heading font-bold overflow-hidden">
                                            {club.logo ? (
                                                <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                                            ) : (
                                                club.name.substring(0, 2).toUpperCase()
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-heading font-bold uppercase group-hover:text-brand-blue transition-colors">
                                                {club.name}
                                            </h3>
                                            <p className="text-xs text-zinc-500 font-body uppercase tracking-wider">
                                                {club.city || "Kota Tidak Diketahui"}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleJoinRequest(club._id)}
                                        className="bg-white text-black font-heading font-bold uppercase px-6 py-3 rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
                                    >
                                        Minta Gabung
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-20 text-zinc-600 font-body italic">
                                Klub tidak ditemukan. Pastikan ejaan benar atau coba jalur "Klub Belum Terdaftar".
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => router.back()}
                        className="text-zinc-500 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold"
                    >
                        ← Kembali ke Pilihan Jalur
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
