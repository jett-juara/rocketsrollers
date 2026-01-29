"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function NewsSection() {
    const newsData = useQuery(api.landing.getLatestNews, { limit: 4 });

    // Fallback data if DB is empty (for demo)
    const fallbackNews = [
        {
            date: "Januari 2025",
            category: "OFFICIAL NEWS",
            title: "Pendaftaran Series #2 Malang Resmi Dibuka!",
            text: "Segera daftarkan klub dan atlet kamu untuk mengikuti seri kedua di Sirkuit Kanjuruhan. Kuota terbatas untuk setiap kategori umur."
        },
        {
            date: "Desember 2024",
            category: "RESULTS",
            title: "Rekapitulasi Poin Championship Series #1",
            text: "Lihat klasemen sementara klub dan atlet setelah seri pembuka. Persaingan menuju gelar juara umum semakin memanas!"
        }
    ];

    const displayNews = newsData && newsData.length > 0
        ? newsData.map(n => ({
            date: new Date(n.publishedDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
            category: n.category,
            title: n.title,
            text: n.content
        }))
        : fallbackNews;

    if (newsData === undefined) return null; // Loading state

    return (
        <section className="bg-white py-32 relative overflow-hidden">
            {/* Background Text Decor */}
            <div className="absolute top-0 left-0 text-[200px] font-heading font-black opacity-[0.02] text-black leading-none -translate-x-20 -translate-y-20 select-none italic pointer-events-none">
                LATEST UPDATES
            </div>

            <div className="max-w-[1366px] mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl text-center md:text-left">
                        <span className="text-brand-blue font-heading font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Stay Informed</span>
                        <h2 className="font-heading text-black text-[60px] md:text-[80px] uppercase font-black tracking-tighter leading-[0.85] italic">
                            NEWS & UPDATES
                        </h2>
                    </div>
                    <div className="hidden md:block">
                        <a href="/news" className="group flex items-center gap-4 text-black font-heading font-black uppercase text-xs tracking-widest border-b-2 border-black pb-2 hover:text-brand-blue hover:border-brand-blue transition-all">
                            Lihat Semua Berita
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {displayNews.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="bg-zinc-50 border border-zinc-100 p-10 md:p-14 rounded-[2.5rem] flex flex-col items-start hover:shadow-2xl hover:border-brand-blue/20 transition-all duration-500 group"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.3em]">{item.date}</span>
                                <div className="w-1 h-1 rounded-full bg-zinc-200"></div>
                                <span className="text-[10px] text-brand-blue font-black uppercase tracking-[0.3em]">{item.category}</span>
                            </div>
                            <h3 className="font-heading font-black text-3xl md:text-4xl mb-6 leading-[1.1] text-black group-hover:text-brand-blue transition-colors italic uppercase">
                                {item.title}
                            </h3>
                            <p className="text-zinc-500 font-body text-sm leading-relaxed mb-10 max-w-lg">
                                {item.text}
                            </p>
                            <div className="mt-auto">
                                <a href="#" className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 border-b border-zinc-900 pb-1 hover:text-brand-blue hover:border-brand-blue transition-all">
                                    Baca Selengkapnya
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="md:hidden flex justify-center">
                    <a href="/news" className="bg-black text-white px-12 py-5 rounded-2xl font-heading font-black uppercase tracking-widest text-xs hover:bg-brand-blue transition-all">
                        Lihat Semua Berita
                    </a>
                </div>
            </div>
        </section>
    );
}
