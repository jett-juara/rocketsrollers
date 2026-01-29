"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { motion } from "framer-motion";

export default function OnboardingPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });

    if (!isLoaded || !athlete) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Membangun Dashboard...
        </div>
    );

    const options = [
        {
            id: "club",
            title: "Join Klub Resmi",
            desc: "Saya tergabung dalam klub yang sudah terdaftar di RocketsRollers.",
            icon: "🏆",
            path: "/onboarding/join-club",
            color: "from-blue-500/20"
        },
        {
            id: "private",
            title: "Jalur Privat",
            desc: "Saya atlet independen dan tidak terafiliasi dengan klub manapun.",
            icon: "👤",
            path: "/onboarding/confirm-private",
            color: "from-zinc-500/20"
        },
        {
            id: "register-club",
            title: "Daftar Klub Baru",
            desc: "Klub saya belum ada di sistem? Daftarkan klub kamu secara resmi di sini.",
            icon: "🆕",
            path: "/onboarding/register-club",
            color: "from-emerald-500/20"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-xl"></div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
                <motion.div
                    initial={{ width: "33.33%" }}
                    animate={{ width: "66.66%" }}
                    className="h-full bg-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                ></motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-5xl"
            >
                <div className="text-center mb-16">
                    <span className="text-brand-blue font-heading font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                        Step 02 / 03
                    </span>
                    <h1 className="text-5xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-4 italic">
                        Halo, {user?.firstName || "Skater"}!
                    </h1>
                    <p className="text-zinc-500 font-body text-lg max-w-xl mx-auto leading-relaxed">
                        Langkah krusial sebelum masuk ke lintasan. <br />Pilih status afiliasimu untuk penentuan kategori.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {options.map((opt, index) => (
                        <motion.button
                            key={opt.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push(opt.path)}
                            className={`bg-zinc-900/40 border border-white/5 p-10 rounded-[2.5rem] text-left hover:bg-zinc-900/60 transition-all group relative overflow-hidden backdrop-blur-md shadow-2xl`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${opt.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            <div className="relative z-10">
                                <div className="text-5xl mb-10 transform group-hover:scale-110 transition-transform duration-500 inline-block">{opt.icon}</div>
                                <h3 className="text-2xl font-heading font-black uppercase mb-3 group-hover:text-brand-blue transition-colors">
                                    {opt.title}
                                </h3>
                                <p className="text-sm text-zinc-500 font-body leading-relaxed mb-8 pr-4">
                                    {opt.desc}
                                </p>
                                <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue opacity-50 group-hover:opacity-100 transition-all">
                                    Pilih Jalur INI <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                <div className="mt-20 text-center text-zinc-700 text-[10px] uppercase tracking-[0.4em] font-medium">
                    RocketsRollers Identity Verification System <span className="mx-2">|</span> v0.2.PREMIUM
                </div>
            </motion.div>
        </div>
    );
}
