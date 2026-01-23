"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterClubPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    // Create new mutation for club registration
    const registerClub = useMutation(api.clubs.registerNewClub);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        picName: "",
        picPhone: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isLoaded) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-widest animate-pulse">MEMUAT PANEL ADMIN...</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await registerClub({
                name: formData.name,
                address: formData.address,
                city: formData.city,
                picName: formData.picName,
                picPhone: formData.picPhone,
            });
            // After registration, show success state or redirect
            router.push("/onboarding/register-club/success");
        } catch (error) {
            console.error("Gagal daftar klub:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl bg-zinc-900/50 border border-white/10 p-10 rounded-3xl"
            >
                <div className="text-center mb-10">
                    <div className="text-5xl mb-4">🏆</div>
                    <h1 className="text-3xl font-heading font-bold uppercase tracking-tighter mb-4">Daftarkan Klub Baru</h1>
                    <p className="text-zinc-400 font-body text-sm">Masukan data resmi klub kamu. Tim admin kami akan melakukan verifikasi sebelum klub muncul di daftar publik.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Nama Resmi Klub</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 font-body focus:outline-none focus:border-brand-blue/50 transition-all"
                                placeholder="Contoh: Rockets Roller Club Malang (Optional for Dev)"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Kota / Kabupaten</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 font-body focus:outline-none focus:border-brand-blue/50 transition-all"
                                placeholder="Malang (Optional for Dev)"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Kontak WA PIC</label>
                            <input
                                type="text"
                                value={formData.picPhone}
                                onChange={(e) => setFormData({ ...formData, picPhone: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 font-body focus:outline-none focus:border-brand-blue/50 transition-all"
                                placeholder="0812xxxxxx (Optional for Dev)"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Alamat Lengkap / Homebase</label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 font-body focus:outline-none focus:border-brand-blue/50 transition-all h-24 resize-none"
                                placeholder="Jalan Raya Kanjuruhan No. 1... (Optional for Dev)"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Nama Penanggung Jawab (PIC)</label>
                            <input
                                type="text"
                                value={formData.picName}
                                onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 font-body focus:outline-none focus:border-brand-blue/50 transition-all"
                                placeholder="Nama Lengkap Pelatih/Pengurus (Optional for Dev)"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 border border-white/10 text-white font-heading font-bold uppercase py-4 rounded-xl hover:bg-white/5 transition-all outline-none"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-[2] bg-brand-blue text-white font-heading font-bold uppercase py-4 rounded-xl hover:bg-blue-600 transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-50"
                        >
                            {isSubmitting ? "Mendaftarkan..." : "Daftarkan Klub"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
