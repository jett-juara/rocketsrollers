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

    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const registerClub = useMutation(api.clubs.registerNewClub);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        picName: "",
        picPhone: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isLoaded || !athlete) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Memuat Panel...
        </div>
    );

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
                athleteId: athlete._id,
            });
            router.push("/onboarding/register-club/success");
        } catch (error) {
            console.error("Gagal daftar klub:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-2xl bg-zinc-900/40 border border-white/10 p-8 md:p-14 rounded-[3rem] backdrop-blur-md shadow-2xl"
            >
                <div className="text-center mb-12">
                    <div className="text-6xl mb-8 transform hover:scale-110 transition-transform duration-500 inline-block">🆕</div>
                    <span className="text-brand-blue font-heading font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
                        Registrasi Entitas
                    </span>
                    <h1 className="text-4xl font-heading font-black uppercase tracking-tighter mb-4 italic">Daftar Klub Baru</h1>
                    <p className="text-zinc-500 font-body text-sm max-w-sm mx-auto leading-relaxed">
                        Daftarkan klubmu secara resmi. Tim verifikator RR akan meninjau data dalam 1x24 jam.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="md:col-span-2 space-y-2">
                            <label className="block px-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Nama Resmi Klub</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 font-body focus:outline-none focus:border-brand-blue/50 focus:bg-black/60 transition-all text-lg tracking-tight placeholder:text-zinc-800"
                                placeholder="Contoh: Rockets Roller Club Malang"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block px-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Kota / Kabupaten</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 font-body focus:outline-none focus:border-brand-blue/50 focus:bg-black/60 transition-all text-sm tracking-widest placeholder:text-zinc-800"
                                placeholder="MALANG"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block px-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Kontak WA PIC</label>
                            <input
                                type="text"
                                value={formData.picPhone}
                                onChange={(e) => setFormData({ ...formData, picPhone: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 font-body focus:outline-none focus:border-brand-blue/50 focus:bg-black/60 transition-all text-sm tracking-widest placeholder:text-zinc-800"
                                placeholder="0812XXXXXXXX"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="block px-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Alamat Lengkap / Homebase</label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 font-body focus:outline-none focus:border-brand-blue/50 focus:bg-black/60 transition-all h-28 resize-none text-sm leading-relaxed placeholder:text-zinc-800"
                                placeholder="Tuliskan alamat lengkap homebase klub..."
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="block px-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Nama Penanggung Jawab (PIC)</label>
                            <input
                                type="text"
                                value={formData.picName}
                                onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 font-body focus:outline-none focus:border-brand-blue/50 focus:bg-black/60 transition-all text-sm tracking-widest placeholder:text-zinc-800"
                                placeholder="NAMA LENGKAP PENGURUS/PELATIH"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-12">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 border border-white/5 text-zinc-600 font-black uppercase text-[10px] tracking-[0.4em] py-5 rounded-2xl hover:bg-white/5 hover:text-white transition-all outline-none"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-[2] bg-white text-black font-heading font-black uppercase text-sm tracking-widest py-5 rounded-2xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl disabled:opacity-50 group relative overflow-hidden"
                        >
                            <span className="relative z-10">{isSubmitting ? "Mendaftarkan..." : "Daftarkan Klub"}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
