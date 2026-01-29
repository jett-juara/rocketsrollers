"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function LiveResults() {
    const results = useQuery(api.results.getLatestResults, { limit: 3 });
    return (
        <section className="py-20 bg-black text-white overflow-hidden">
            <div className="max-w-[1366px] mx-auto px-6">
                <div className="flex items-center justify-between mb-16 px-2">
                    <div className="flex flex-col">
                        <span className="text-brand-blue font-heading font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-3 mb-4">
                            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]"></span>
                            LIVE UPDATES
                        </span>
                        <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter italic text-white leading-none">
                            SKOR <span className="text-zinc-500">TERKINI</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {!results ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="bg-zinc-900/20 border border-white/5 p-10 rounded-[2.5rem] animate-pulse h-[220px]"></div>
                        ))
                    ) : results.length === 0 ? (
                        <div className="col-span-full text-center py-24 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-[2.5rem]">
                            <p className="text-zinc-700 font-body italic">Belum ada hasil perlombaan terbaru.</p>
                        </div>
                    ) : (
                        results.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="bg-zinc-900/20 border border-white/5 p-10 rounded-[2.5rem] hover:border-brand-blue/30 hover:bg-zinc-900/40 transition-all group backdrop-blur-md"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <span className="text-4xl font-heading font-black italic text-zinc-800 group-hover:text-brand-blue/20 transition-colors">
                                        #{index + 1}
                                    </span>
                                    <span className="bg-zinc-900 border border-white/10 text-brand-blue text-[8px] px-3 py-1.5 rounded-lg font-black uppercase tracking-widest">
                                        {item.subEvent}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-heading font-black uppercase mb-1 text-white group-hover:text-brand-blue transition-colors italic">{item.athleteName}</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{item.clubName}</p>
                                </div>
                                <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-700">Final Score</span>
                                    <span className="text-4xl font-heading font-black italic text-brand-blue drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">{item.score}</span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
