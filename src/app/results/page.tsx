"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";

export default function ResultsPage() {
    const leaderboard = useQuery(api.admin.getAthleteLeaderboard);

    if (leaderboard === undefined) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Mengkalkulasi Klasemen...
        </div>
    );

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none"></div>

            <Header />

            <div className="pt-32 pb-20 px-6 max-w-[1000px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <span className="text-brand-blue font-heading font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Official Standings</span>
                    <h1 className="text-6xl md:text-8xl font-heading font-black uppercase tracking-tighter italic leading-none">
                        RR <span className="text-zinc-500">Leaderboard</span>
                    </h1>
                    <p className="mt-8 text-zinc-400 font-body text-sm max-w-xl mx-auto leading-relaxed">
                        Peringkat dihitung berdasarkan total poin yang dikumpulkan dari seluruh seri RocketsRollers Championship 2025.
                    </p>
                </motion.div>

                <div className="bg-zinc-900/30 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-md shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 text-center w-24">Pos</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Athlete</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 text-right">Total Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leaderboard.map((entry, index) => (
                                <motion.tr
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={entry.id}
                                    className="group hover:bg-white/5 transition-colors"
                                >
                                    <td className="p-8 text-center">
                                        <span className={`font-heading font-black italic text-2xl ${index === 0 ? 'text-yellow-500' :
                                                index === 1 ? 'text-zinc-300' :
                                                    index === 2 ? 'text-orange-500' : 'text-zinc-600'
                                            }`}>
                                            #{index + 1}
                                        </span>
                                    </td>
                                    <td className="p-8">
                                        <div className="font-heading font-black uppercase text-xl italic group-hover:text-brand-blue transition-colors">
                                            {entry.name}
                                        </div>
                                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                                            Skater • {entry.points > 0 ? 'Active Contender' : 'New Entry'}
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <div className="font-heading font-black text-3xl tracking-tighter italic">
                                            {entry.points}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            {leaderboard.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-32 text-center text-zinc-700 font-body italic">
                                        Data klasemen belum tersedia. Kompetisi akan segera dimulai!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 flex flex-col items-center gap-6">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 px-4 py-2 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">1st: 15pt</span>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 px-4 py-2 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300"></div>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">2nd: 10pt</span>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 px-4 py-2 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">3rd: 7pt</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
