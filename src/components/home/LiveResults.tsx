"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function LiveResults() {
    const results = useQuery(api.results.getLatestResults, { limit: 3 });
    return (
        <section className="py-20 bg-black text-white overflow-hidden">
            <div className="max-w-[1366px] mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <span className="text-brand-blue font-heading font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse transition-all shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
                            Live Results
                        </span>
                        <h2 className="text-4xl md:text-5xl font-slab font-bold uppercase mt-2">Update Skor Terkini</h2>
                    </div>
                    <button className="hidden md:block border border-white/20 px-6 py-2 rounded-full hover:bg-white/10 transition-colors uppercase text-xs tracking-widest">
                        Lihat Semua Hasil
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {!results ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl animate-pulse h-[180px]"></div>
                        ))
                    ) : results.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-white/40 font-body">
                            Belum ada hasil perlombaan terbaru.
                        </div>
                    ) : (
                        results.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-brand-blue/50 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-3xl font-slab font-bold text-white/20 group-hover:text-brand-blue/30 transition-colors">
                                        0{item.rank}
                                    </span>
                                    <span className="bg-brand-blue text-white text-[10px] px-2 py-1 rounded font-bold uppercase">
                                        {item.subEvent}
                                    </span>
                                </div>
                                <h3 className="text-xl font-heading font-bold uppercase mb-1">{item.athleteName}</h3>
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-4">{item.clubName}</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-2xl font-slab font-bold text-brand-blue">{item.score}</span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
