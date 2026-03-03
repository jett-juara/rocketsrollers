"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";

export default function NewsPage() {
    const news = useQuery(api.news.list, {});

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-[1366px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <span className="text-brand-blue font-heading font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
                        Latest Updates
                    </span>
                    <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic">
                        News & <span className="text-zinc-500">Announcements</span>
                    </h1>
                </motion.div>

                {news === undefined ? (
                    <div className="text-zinc-500 animate-pulse font-heading uppercase tracking-widest text-sm">
                        Memuat berita...
                    </div>
                ) : news.length === 0 ? (
                    <div className="py-20 text-center border border-zinc-900 border-dashed rounded-[3rem]">
                        <p className="text-zinc-600 font-body italic">Belum ada berita yang diterbitkan.</p>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {news.map((item, index) => (
                            <motion.article
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md hover:border-brand-blue/30 transition-all group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full border border-brand-blue/20">
                                        {item.category}
                                    </span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                        {new Date(item.publishedDate).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-heading font-black uppercase italic mb-6 group-hover:text-brand-blue transition-colors">
                                    {item.title}
                                </h2>
                                <div
                                    className="text-zinc-400 font-body text-sm leading-relaxed prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
