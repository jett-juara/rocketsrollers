"use client";

import { motion } from "framer-motion";
import { Star, Clock } from "lucide-react";

export default function CMSSpotlightPage() {
    return (
        <div className="max-w-[1200px]">
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Star className="w-5 h-5 text-brand-blue" />
                    <span className="text-zinc-500 font-heading font-black uppercase tracking-[0.4em] text-[10px]">Athlete Showcase</span>
                </div>
                <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic leading-none">
                    Athlete <span className="text-zinc-500">Spotlight</span>
                </h1>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900/30 border border-white/5 p-20 rounded-[3rem] backdrop-blur-md text-center"
            >
                <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-blue/20">
                    <Clock className="w-10 h-10 text-brand-blue" />
                </div>
                <h2 className="text-4xl font-heading font-black uppercase italic text-zinc-600 mb-4">
                    Coming Soon
                </h2>
                <p className="text-zinc-500 font-body text-sm max-w-md mx-auto">
                    Fitur athlete spotlight sedang dalam tahap pengembangan. Kamu akan bisa memilih atlet terbaik untuk ditampilkan di halaman utama.
                </p>
            </motion.div>
        </div>
    );
}
