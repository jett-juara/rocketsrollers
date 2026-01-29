"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { motion } from "framer-motion";

export default function ConfirmPrivatePage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const updateStatus = useMutation(api.users.updateMembershipStatus);

    if (!isLoaded || !athlete) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Menyiapkan form...
        </div>
    );

    const handleConfirm = async () => {
        try {
            await updateStatus({
                athleteId: athlete._id,
                status: "private"
            });
            router.push("/dashboard");
        } catch (error) {
            console.error("Gagal update status:", error);
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
                className="relative z-10 w-full max-w-lg bg-zinc-900/40 border border-white/10 p-10 md:p-14 rounded-[3rem] backdrop-blur-md shadow-2xl"
            >
                <div className="text-center mb-12">
                    <div className="text-6xl mb-8 transform hover:scale-110 transition-transform duration-500 inline-block">👤</div>
                    <span className="text-brand-blue font-heading font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
                        Jalur Kompetisi
                    </span>
                    <h1 className="text-4xl font-heading font-black uppercase tracking-tighter mb-4 italic">
                        Konfirmasi Privat
                    </h1>
                    <p className="text-zinc-500 font-body text-sm leading-relaxed">
                        Kamu akan terdaftar sebagai <span className="text-white font-bold">Atlet Independen</span>. <br />Bebas mendaftar event tanpa approval klub.
                    </p>
                </div>

                <div className="space-y-4 mb-12">
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5 flex items-center gap-5 group hover:border-brand-blue/30 transition-colors">
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-zinc-400 group-hover:text-zinc-200 transition-colors">Afiliasi Virtual "PRIVAT"</span>
                    </div>
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5 flex items-center gap-5 group hover:border-brand-blue/30 transition-colors">
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-zinc-400 group-hover:text-zinc-200 transition-colors">Akses Pendaftaran Mandiri</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleConfirm}
                        className="w-full bg-white text-black font-heading font-black uppercase text-sm tracking-widest py-5 rounded-2xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl group/btn overflow-hidden relative"
                    >
                        <span className="relative z-10">Ya, Saya Atlet Privat</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-blue-400 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="w-full bg-transparent text-zinc-600 font-black uppercase text-[10px] tracking-[0.4em] hover:text-white transition-all py-3"
                    >
                        Pilih Jalur Lain
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
