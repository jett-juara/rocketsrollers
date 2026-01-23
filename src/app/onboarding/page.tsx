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
    const [selection, setSelection] = useState<string | null>(null);

    useEffect(() => {
        // BYPASS DEV: Nggak maksa ke complete-profile lagi biar bisa liat step lain
        /*
        if (athlete && athlete.birthDate === "2000-01-01") {
            router.replace("/onboarding/complete-profile");
        }
        */
    }, [athlete, router]);

    if (!isLoaded || !athlete) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-widest animate-pulse">MEMBANGUN DASHBOARD...</div>;

    const options = [
        {
            id: "club",
            title: "Join Klub Resmi",
            desc: "Saya tergabung dalam klub yang sudah terdaftar di RocketsRollers.",
            icon: "🏆",
            path: "/onboarding/join-club"
        },
        {
            id: "private",
            title: "Jalur Privat",
            desc: "Saya atlet independen dan tidak terafiliasi dengan klub manapun.",
            icon: "👤",
            path: "/onboarding/confirm-private"
        },
        {
            id: "register-club",
            title: "Daftar Klub Baru",
            desc: "Klub saya belum ada di sistem? Daftarkan klub kamu secara resmi di sini.",
            icon: "🆕",
            path: "/onboarding/register-club"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center bg-[url('/images/hero_bg.png')] bg-cover bg-fixed">
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-4xl"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tighter mb-4">
                        Halo, {user?.firstName || "Skater"}!
                    </h1>
                    <p className="text-zinc-400 font-body text-lg max-w-xl mx-auto">
                        Langkah terakhir sebelum mulai berkompetisi. Pilih status afiliasi kamu sekarang.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {options.map((opt) => (
                        <motion.button
                            key={opt.id}
                            whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push(opt.path)}
                            className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl text-left hover:bg-zinc-900/80 transition-all group"
                        >
                            <div className="text-4xl mb-6">{opt.icon}</div>
                            <h3 className="text-xl font-heading font-bold uppercase mb-2 group-hover:text-brand-blue transition-colors">
                                {opt.title}
                            </h3>
                            <p className="text-sm text-zinc-500 font-body leading-relaxed">
                                {opt.desc}
                            </p>
                            <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                Pilih Opsi <span className="ml-2">→</span>
                            </div>
                        </motion.button>
                    ))}
                </div>

                <div className="mt-16 text-center text-zinc-600 text-[10px] uppercase tracking-[0.3em]">
                    RocketsRollers Identification System v0.1
                </div>
            </motion.div>
        </div>
    );
}
