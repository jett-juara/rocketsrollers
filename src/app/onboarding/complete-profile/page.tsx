"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CompleteProfilePage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const updateProfile = useMutation(api.users.syncUser);

    const [formData, setFormData] = useState({
        fullName: "",
        birthDate: "",
        gender: "male" as "male" | "female",
    });

    useEffect(() => {
        if (athlete) {
            setFormData({
                fullName: athlete.fullName || user?.fullName || "",
                birthDate: athlete.birthDate === "2000-01-01" ? "" : athlete.birthDate,
                gender: athlete.gender || "male",
            });
        }
    }, [athlete, user]);

    if (!isLoaded || !athlete) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
                Inisialisasi...
            </div>
        </div>
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile({
                clerkId: user?.id || "",
                email: user?.primaryEmailAddress?.emailAddress || "",
                fullName: formData.fullName,
                birthDate: formData.birthDate,
                gender: formData.gender,
            });
            router.push("/onboarding");
        } catch (error) {
            console.error("Gagal update profil:", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-xl"></div>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "33.33%" }}
                    className="h-full bg-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                ></motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-lg"
            >
                <div className="bg-zinc-900/40 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
                    <div className="text-center mb-12">
                        <span className="text-brand-blue font-heading font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                            Step 01 / 03
                        </span>
                        <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter mb-4 text-white">
                            Data Identity
                        </h1>
                        <p className="text-zinc-500 font-body text-sm leading-relaxed max-w-[280px] mx-auto">
                            Lengkapi identitas sesuai dokumen resmi untuk verifikasi kategori lomba.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="flex justify-between items-center px-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Nama Lengkap</span>
                                <span className="text-[9px] text-zinc-700 italic">Sesuai Akte / KK</span>
                            </label>
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 font-body focus:outline-none focus:border-brand-blue/50 focus:bg-black/60 transition-all text-lg tracking-tight placeholder:text-zinc-800"
                                placeholder="Masukkan nama lengkap..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Tanggal Lahir</label>
                                <input
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 font-body focus:outline-none focus:border-brand-blue/50 focus:bg-black/60 transition-all text-sm appearance-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Gender</label>
                                <div className="relative">
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as "male" | "female" })}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 font-body focus:outline-none focus:border-brand-blue/50 focus:bg-black/60 transition-all text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="male">Laki-laki</option>
                                        <option value="female">Perempuan</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-black font-heading font-black uppercase text-lg py-6 rounded-2xl hover:bg-brand-blue hover:text-white transition-all duration-500 transform hover:-translate-y-1 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative group overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Simpan Profile
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-zinc-600 font-body text-[10px] uppercase tracking-[0.3em]">
                    RocketsRollers Security Protocols Active
                </p>
            </motion.div>
        </div>
    );
}
