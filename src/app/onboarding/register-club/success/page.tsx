"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterClubSuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg text-center bg-zinc-900/50 border border-white/10 p-12 rounded-3xl"
            >
                <div className="text-6xl mb-8">🚀</div>
                <h1 className="text-3xl font-heading font-bold uppercase tracking-tight mb-4 text-brand-blue">
                    Pendaftaran Terkirim!
                </h1>
                <p className="text-zinc-400 font-body text-sm leading-relaxed mb-10">
                    Klub kamu sedang dalam antrean verifikasi oleh tim RocketsRollers. Kami akan segera menghubungi nomor WhatsApp yang terdaftar untuk validasi data.
                </p>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-left mb-10">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Estimasi Waktu</h4>
                    <p className="text-sm font-body text-zinc-200">1 - 2 Hari Kerja (Senin - Jumat)</p>
                </div>

                <button
                    onClick={() => router.push("/")}
                    className="w-full bg-white text-black font-heading font-bold uppercase py-4 rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
                >
                    Kembali ke Beranda
                </button>
            </motion.div>
        </div>
    );
}
