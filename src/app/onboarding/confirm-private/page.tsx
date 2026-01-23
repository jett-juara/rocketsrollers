"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { motion } from "framer-motion";

export default function ConfirmPrivatePage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    // Kita butuh query buat dapetin ID atlet di Convex berdasarkan Clerk ID
    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const updateStatus = useMutation(api.users.updateMembershipStatus);

    if (!isLoaded || !athlete) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">Menyiapkan form...</div>;

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
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg bg-zinc-900/50 border border-white/10 p-10 rounded-3xl"
            >
                <div className="text-center mb-8">
                    <div className="text-5xl mb-6">👤</div>
                    <h1 className="text-3xl font-heading font-bold uppercase tracking-tight mb-4">
                        Konfirmasi Jalur Privat
                    </h1>
                    <p className="text-zinc-400 font-body text-sm leading-relaxed">
                        Dengan memilih jalur ini, kamu akan terdaftar sebagai atlet independen. Kamu bisa mendaftar lomba tanpa membutuhkan persetujuan dari klub manapun.
                    </p>
                </div>

                <div className="space-y-4 mb-10">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        <span className="text-xs font-body text-zinc-300">Terdaftar di klub virtual "PRIVAT"</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        <span className="text-xs font-body text-zinc-300">Akses penuh ke pendaftaran event mandiri</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleConfirm}
                        className="w-full bg-white text-black font-heading font-bold uppercase py-4 rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
                    >
                        Ya, Saya Atlet Privat
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="w-full bg-transparent text-zinc-500 font-body text-sm hover:text-white transition-colors py-2"
                    >
                        Kembali
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
