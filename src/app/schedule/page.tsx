"use client";

import Header from "@/components/layout/Header";
import { motion } from "framer-motion";

export default function SchedulePage() {
    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-[1366px] mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="text-brand-blue font-heading font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Official Timeline</span>
                    <h1 className="text-6xl md:text-8xl font-heading font-black uppercase tracking-tighter italic leading-none mb-12">
                        Race <span className="text-zinc-500">Schedule</span>
                    </h1>

                    <div className="bg-zinc-900/30 border border-white/5 p-20 rounded-[4rem] backdrop-blur-md border-dashed">
                        <p className="text-zinc-400 font-body text-lg italic">
                            Jadwal detail per mata lomba untuk Series #1 akan segera diupdate oleh tim Race Director.
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
