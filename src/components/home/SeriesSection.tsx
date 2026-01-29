"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { motion } from "framer-motion";

export default function SeriesSection() {
    const eventsData = useQuery(api.landing.getFeaturedEvents);

    const fallbackSeries = [
        { title: "SERIES #2", date: "3 – 5 Oktober 2025", location: "Sirkuit Kanjuruhan, Malang", type: "tickets" as const, isBadge: true },
        { title: "SERIES #3", date: "Coming Soon", location: "Jawa Timur Area", type: "soon" as const },
        { title: "SERIES #4", date: "Coming Soon", location: "Grand Final", type: "soon" as const },
        { title: "CHAMPIONSHIP", date: "December 2025", location: "TBA", type: "soon" as const },
    ];

    const displaySeries = eventsData && eventsData.length > 0
        ? eventsData.map(e => ({
            title: e.name,
            date: e.date,
            location: e.location,
            type: e.type,
            isBadge: e.isBadge
        }))
        : fallbackSeries;

    if (eventsData === undefined) return null; // Loading state

    const BadgeIcon = () => (
        <svg viewBox="0 0 200 200" className="w-full h-full text-brand-blue fill-none stroke-current stroke-[1]">
            <circle cx="100" cy="100" r="95" strokeDasharray="4 4" className="opacity-30" />
            <circle cx="100" cy="100" r="85" className="stroke-2 opacity-10" />
            <circle cx="100" cy="100" r="75" strokeDasharray="2 2" className="opacity-20" />
        </svg>
    );

    const ShieldIcon = () => (
        <svg viewBox="0 0 100 120" className="w-full h-full fill-none stroke-white/20 stroke-1">
            <path d="M10,5 L90,5 L90,85 C90,105 50,115 50,115 C50,115 10,105 10,85 L10,5 Z" />
            <text x="50" y="55" textAnchor="middle" className="fill-white/10 font-heading font-black text-[35px] italic">RR</text>
            <circle cx="50" cy="85" r="5" className="fill-white/5" />
        </svg>
    );

    return (
        <section id="series" className="bg-black py-32 border-b border-white/5 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-[1366px] mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-20">
                    <span className="text-brand-blue font-heading font-black uppercase tracking-[0.5em] text-[10px] mb-4">The Road to Glory</span>
                    <h2 className="font-heading text-white text-[60px] md:text-[80px] uppercase font-black tracking-tighter leading-none italic">
                        COMPETITION SERIES
                    </h2>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displaySeries.map((card, idx) => (
                        <div key={idx} className="group border border-white/5 bg-zinc-900/20 backdrop-blur-md rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:border-brand-blue/30 hover:bg-zinc-900/40 shadow-2xl">
                            <div className="p-10 flex flex-col items-center text-center flex-grow">
                                <div className={`relative ${card.isBadge ? 'w-48 h-48' : 'w-40 h-48'} mb-8 flex items-center justify-center`}>
                                    {card.isBadge ? <BadgeIcon /> : <ShieldIcon />}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className={`font-heading font-black tracking-tighter leading-none italic transition-all duration-500 ${card.isBadge ? 'text-5xl text-white group-hover:text-brand-blue' : 'text-3xl text-white/20 group-hover:text-white/40'}`}>
                                            RR
                                        </span>
                                        {card.isBadge && (
                                            <span className="text-[8px] font-black tracking-[0.4em] mt-3 text-brand-blue animate-pulse">SERIES #2</span>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="text-xl font-heading font-black uppercase tracking-tight mb-2 text-white group-hover:text-brand-blue transition-colors">
                                        {card.date}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-brand-blue transition-colors"></div>
                                        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em] group-hover:text-zinc-300 transition-colors">
                                            {card.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 pt-0">
                                {card.type === 'tickets' ? (
                                    <a href="/register" className="block w-full bg-white text-black text-center py-5 rounded-2xl font-heading font-black uppercase tracking-widest text-xs hover:bg-brand-blue hover:text-white transition-all duration-500 shadow-xl">
                                        Registrasi Sekarang
                                    </a>
                                ) : (
                                    <div className="w-full bg-zinc-900/50 text-zinc-700 text-center py-5 rounded-2xl font-heading font-black uppercase tracking-widest text-[10px] cursor-default border border-white/5">
                                        Coming Soon
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Technical Handbook CTA */}
                <div className="mt-28 border border-white/5 p-10 md:p-14 rounded-[3rem] bg-zinc-900/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-12 group hover:border-brand-blue/20 transition-all duration-700">
                    <div className="max-w-xl text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center group-hover:border-brand-blue/30 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-zinc-500 font-heading font-black uppercase tracking-[0.4em] text-[10px]">Official Resource</span>
                        </div>
                        <h3 className="text-3xl font-heading font-black italic uppercase mb-4 text-white group-hover:text-brand-blue transition-colors">Technical Handbook</h3>
                        <p className="text-zinc-500 font-body text-sm leading-relaxed">
                            Unduh panduan teknis lengkap, regulasi perlombaan, dan informasi klasifikasi KU resmi untuk RocketsRollers Competition Series #2 2025.
                        </p>
                    </div>
                    <a
                        href="/docs/handbook-series-2.pdf"
                        target="_blank"
                        className="bg-zinc-900 border border-white/10 text-white px-12 py-6 rounded-2xl font-heading font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-4 shadow-2xl group/btn"
                    >
                        Download PDF
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-y-1 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
