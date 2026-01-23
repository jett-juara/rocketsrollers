"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function InviteAdminPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    if (!isLoaded) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">Memuat panduan...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl bg-zinc-900/50 border border-white/10 p-10 rounded-3xl"
            >
                <div className="text-center mb-10">
                    <div className="text-5xl mb-6">❓</div>
                    <h1 className="text-3xl font-heading font-bold uppercase tracking-tight mb-4">
                        Klub Kamu Belum Terdaftar?
                    </h1>
                    <p className="text-zinc-400 font-body text-sm leading-relaxed">
                        Jangan khawatir! Kamu tetap bisa mendaftar lomba dengan status **Privat** sementara sambil menunggu Admin Klub kamu mendaftarkan klub secara resmi.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <h4 className="font-heading font-bold text-brand-blue uppercase text-xs tracking-widest mb-3">Langkah 1</h4>
                        <p className="text-xs text-zinc-300 font-body leading-relaxed">
                            Daftar sebagai **Atlet Privat** sekarang agar kamu bisa segera melengkapi profil dan jadwal lomba.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <h4 className="font-heading font-bold text-brand-blue uppercase text-xs tracking-widest mb-3">Langkah 2</h4>
                        <p className="text-xs text-zinc-300 font-body leading-relaxed">
                            Hubungi Admin/Pelatih klub kamu dan minta mereka mendaftarkan klub di rocketsrollers.com.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => router.push("/onboarding/confirm-private")}
                        className="w-full bg-white text-black font-heading font-bold uppercase py-4 rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
                    >
                        Oke, Daftar Privat Dulu
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="w-full bg-transparent text-zinc-500 font-body text-sm hover:text-white transition-colors py-2"
                    >
                        Kembali Ke Pilihan
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <p className="text-[10px] text-zinc-600 font-body uppercase tracking-widest">
                        Nantinya kamu bisa pindah ke klub resmi setelah klub kamu terdaftar.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
