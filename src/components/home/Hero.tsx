"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Hero() {
    const landingData = useQuery(api.landing.getLandingData);

    const content = {
        title: landingData?.heroTitle || "ROCKETS\nROLLERS",
        slogan: landingData?.heroSlogan || "Speed • Skill • Glory",
        eventInfo: landingData?.heroEventInfo || "Sirkuit Kanjuruhan, Malang | 3 – 5 Okt",
        primaryLabel: landingData?.primaryCtaLabel || "Daftar Klub",
        primaryLink: landingData?.primaryCtaLink || "/onboarding/join-club",
        secondaryLabel: landingData?.secondaryCtaLabel || "Jalur Privat",
        secondaryLink: landingData?.secondaryCtaLink || "/onboarding/confirm-private",
        bgUrl: landingData?.heroBgUrl || "/images/hero_bg.png"
    };

    return (
        <header className="relative h-screen min-h-[850px] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Layer with Animation */}
            <motion.div
                key={content.bgUrl}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${content.bgUrl}')` }}
            ></motion.div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-brand-blue to-transparent opacity-50"></div>

            {/* Hero Content */}
            <div className="relative z-10 text-center max-w-6xl px-6 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <span className="text-brand-blue font-heading font-black uppercase tracking-[0.6em] text-xs md:text-sm mb-6 block drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                        {content.slogan}
                    </span>
                    <h1 className="text-white font-heading text-[65px] md:text-[130px] font-black leading-[1.1] uppercase mb-10 tracking-tight italic drop-shadow-2xl py-6 px-10 md:px-20 whitespace-pre-line">
                        {content.title}
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-14">
                        <span className="text-white/90 font-body text-lg md:text-xl uppercase tracking-widest font-black italic">{content.eventInfo}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href={content.primaryLink}
                            className="w-full sm:w-auto bg-white text-black text-sm px-16 py-6 rounded-2xl font-heading font-black uppercase tracking-[0.2em] hover:bg-brand-blue hover:text-white transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 group"
                        >
                            {content.primaryLabel} <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link
                            href={content.secondaryLink}
                            className="w-full sm:w-auto bg-zinc-900/50 backdrop-blur-md border border-white/10 text-white text-sm px-16 py-6 rounded-2xl font-heading font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 hover:-translate-y-2"
                        >
                            {content.secondaryLabel}
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white vertical-rl">Scroll</span>
            </motion.div>
        </header>
    );
}
