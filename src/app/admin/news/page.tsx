"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminNewsPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const news = useQuery(api.news.list, {});
    const createNews = useMutation(api.news.create);
    const removeNews = useMutation(api.news.remove);

    const [form, setForm] = useState({
        title: "",
        category: "OFFICIAL NEWS",
        content: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isLoaded || athlete === undefined || news === undefined) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Menyiapkan Meja Redaksi...
        </div>
    );

    const isAdmin = athlete?.role === "superadmin" || athlete?.role === "admin";
    if (!isAdmin) {
        router.push("/");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createNews({
                ...form,
                adminClerkId: user?.id || ""
            });
            setForm({ title: "", category: "OFFICIAL NEWS", content: "" });
            alert("Berita berhasil diterbitkan!");
        } catch (error) {
            console.error(error);
            alert("Gagal menerbitkan berita.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: any) => {
        if (!confirm("Hapus berita ini?")) return;
        try {
            await removeNews({ id, adminClerkId: user?.id || "" });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white px-6">
            <Header />
            <div className="pt-32 pb-20 max-w-[1366px] mx-auto">
                <div className="mb-16">
                    <button onClick={() => router.push("/admin")} className="text-zinc-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.5em] mb-4">← Back to Dashboard</button>
                    <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic leading-none">
                        Content <span className="text-brand-blue">Center</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Form Input */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md h-fit"
                    >
                        <h2 className="text-3xl font-heading font-black uppercase italic mb-8">Publish <span className="text-brand-blue">New Post</span></h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Judul Berita</label>
                                <input
                                    type="text" required value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 font-heading font-black text-sm uppercase focus:outline-none focus:border-brand-blue"
                                    placeholder="CONTOH: PENDAFTARAN SERIES #2 DIBUKA"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Kategori</label>
                                <select
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 font-heading font-black text-xs uppercase focus:outline-none focus:border-brand-blue"
                                >
                                    <option value="OFFICIAL NEWS">Official News</option>
                                    <option value="RESULTS">Results Update</option>
                                    <option value="IMPORTANT">Important Notice</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Konten</label>
                                <textarea
                                    required rows={6} value={form.content}
                                    onChange={e => setForm({ ...form, content: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 font-body text-sm focus:outline-none focus:border-brand-blue"
                                    placeholder="Tulis detail beritanya di sini..."
                                />
                            </div>
                            <button
                                type="submit" disabled={isSubmitting}
                                className="w-full bg-white text-black font-heading font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl disabled:opacity-50"
                            >
                                {isSubmitting ? "Publishing..." : "Terbitkan Sekarang"}
                            </button>
                        </form>
                    </motion.div>

                    {/* News List */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-heading font-black uppercase italic">Existing <span className="text-zinc-500">Posts</span></h2>
                        <div className="space-y-6">
                            {news.map((item) => (
                                <div key={item._id} className="bg-zinc-900/30 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group hover:bg-zinc-900/50 transition-all">
                                    <div className="max-w-[70%]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-brand-blue/10 text-brand-blue rounded border border-brand-blue/20">
                                                {item.category}
                                            </span>
                                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                                                {new Date(item.publishedDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-heading font-black uppercase italic mb-2 group-hover:text-brand-blue transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-[10px] text-zinc-500 font-body line-clamp-2">{item.content}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500/10 text-red-500 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>
                                </div>
                            ))}
                            {news.length === 0 && (
                                <div className="py-20 text-center border border-zinc-900 border-dashed rounded-[2.5rem] text-zinc-700 font-body italic">
                                    Belum ada berita yang diterbitkan.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
