"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProfileSettingsPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const updateAthlete = useMutation(api.clubs.updateAthlete);

    const [form, setForm] = useState({
        fullName: "",
        birthDate: "",
        gender: "male" as "male" | "female"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (athlete) {
            setForm({
                fullName: athlete.fullName,
                birthDate: athlete.birthDate,
                gender: athlete.gender
            });
        }
    }, [athlete]);

    if (!isLoaded || athlete === undefined) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Membuka Berkas Atlet...
        </div>
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateAthlete({
                id: athlete._id,
                fullName: form.fullName,
                birthDate: form.birthDate,
                gender: form.gender
            });
            alert("Profil berhasil diperbarui!");
        } catch (error) {
            console.error(error);
            alert("Gagal memperbarui profil.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white px-6">
            <Header />
            <div className="pt-32 pb-20 max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/40 border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-md shadow-2xl"
                >
                    <div className="text-center mb-12">
                        <span className="text-brand-blue font-heading font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Account Settings</span>
                        <h1 className="text-5xl font-heading font-black uppercase tracking-tighter italic italic underline decoration-brand-blue/30 underline-offset-8">
                            Profile
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Nama Lengkap</label>
                            <input
                                type="text" required value={form.fullName}
                                onChange={e => setForm({ ...form, fullName: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 font-heading font-black text-sm uppercase focus:outline-none focus:border-brand-blue transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Tanggal Lahir</label>
                            <input
                                type="date" required value={form.birthDate}
                                onChange={e => setForm({ ...form, birthDate: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 font-body text-sm focus:outline-none focus:border-brand-blue transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Gender</label>
                            <div className="grid grid-cols-2 gap-4">
                                {["male", "female"].map((g) => (
                                    <button
                                        key={g} type="button"
                                        onClick={() => setForm({ ...form, gender: g as any })}
                                        className={`py-4 rounded-xl font-heading font-black uppercase text-[10px] tracking-widest border transition-all ${form.gender === g ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit" disabled={isSubmitting}
                                className="w-full bg-white text-black font-heading font-black uppercase tracking-[0.2em] py-6 rounded-2xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl disabled:opacity-50"
                            >
                                {isSubmitting ? "Saving..." : "Simpan Perubahan"}
                            </button>
                            <button
                                type="button" onClick={() => router.push("/dashboard")}
                                className="w-full mt-6 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                            >
                                Kembali ke Dashboard
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
