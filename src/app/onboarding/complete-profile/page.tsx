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
    const updateProfile = useMutation(api.users.syncUser); // Re-use syncUser or create new

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

    if (!isLoaded || !athlete) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-widest animate-pulse">MEMBANGUN DATA...</div>;

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
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg bg-zinc-900/50 border border-white/10 p-10 rounded-3xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-heading font-bold uppercase tracking-tighter mb-4">Lengkapi Profil</h1>
                    <p className="text-zinc-400 font-body text-sm">Pastikan data sesuai dengan identitas resmi (Akte/KK) untuk keperluan kategori lomba.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Nama Lengkap</label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 font-body focus:outline-none focus:border-brand-blue/50 transition-all text-lg"
                            placeholder="Sesuai Akte Kelahiran (Optional for Dev)"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Tanggal Lahir</label>
                            <input
                                type="date"
                                value={formData.birthDate}
                                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 font-body focus:outline-none focus:border-brand-blue/50 transition-all text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Jenis Kelamin</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value as "male" | "female" })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 font-body focus:outline-none focus:border-brand-blue/50 transition-all text-sm appearance-none"
                            >
                                <option value="male">Laki-laki</option>
                                <option value="female">Perempuan</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-heading font-bold uppercase py-5 rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] mt-4"
                    >
                        Simpan & Lanjut
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
