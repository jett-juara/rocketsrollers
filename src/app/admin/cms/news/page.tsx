"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { useState } from "react";
import { Newspaper, Send, Search, Trash2, Edit3, Image as ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-black/20 animate-pulse rounded-2xl border border-white/5" />
});

export default function CMSNewsPage() {
    const { user } = useUser();
    const news = useQuery(api.news.list, {});
    const createNews = useMutation(api.news.create);
    const removeNews = useMutation(api.news.remove);

    const [form, setForm] = useState({
        title: "",
        category: "OFFICIAL NEWS",
        content: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createNews({
                ...form,
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
            await removeNews({ id });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-[1200px]">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Newspaper className="w-5 h-5 text-brand-blue" />
                        <span className="text-zinc-500 font-heading font-black uppercase tracking-[0.4em] text-[10px]">Editor Hub</span>
                    </div>
                    <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic leading-none">
                        News <span className="text-zinc-500">Manager</span>
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Editor Column */}
                <div className="lg:col-span-7 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md"
                    >
                        <h2 className="text-2xl font-heading font-black uppercase italic mb-8 flex items-center gap-4">
                            Compose <span className="text-brand-blue">New Post</span>
                            <div className="h-px flex-1 bg-white/5"></div>
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Kategori</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm({ ...form, category: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 font-heading font-black text-[10px] tracking-widest uppercase focus:outline-none focus:border-brand-blue transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="OFFICIAL NEWS">Official News</option>
                                        <option value="RESULTS">Results Update</option>
                                        <option value="IMPORTANT">Important Notice</option>
                                    </select>
                                </div>
                                <div className="space-y-2 leading-none">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2 block mb-2">Thumbnail</label>
                                    <button type="button" className="w-full h-[52px] bg-black/40 border border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase text-zinc-500 hover:border-brand-blue/50 hover:text-white transition-all">
                                        <ImageIcon className="w-4 h-4" /> Upload Image
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Headline</label>
                                <input
                                    type="text" required value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 font-heading font-black text-lg uppercase focus:outline-none focus:border-brand-blue/50 placeholder:text-zinc-800"
                                    placeholder="POST TITLE GOES HERE"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2 flex justify-between">
                                    Konten Berita
                                    <span className="text-brand-blue/50">TipTap Powered</span>
                                </label>
                                <RichTextEditor
                                    content={form.content}
                                    onChange={(html) => setForm({ ...form, content: html })}
                                />
                            </div>

                            <button
                                type="submit" disabled={isSubmitting}
                                className="w-full bg-white text-black font-heading font-black uppercase tracking-[0.2em] py-6 rounded-2xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_20px_40px_rgba(0,0,0,0.3)] disabled:opacity-50 flex items-center justify-center gap-4"
                            >
                                {isSubmitting ? "Publishing..." : <>Publish Post <Send className="w-4 h-4" /></>}
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* List Column */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h2 className="text-xl font-heading font-black uppercase italic">Archive</h2>
                        <div className="flex items-center gap-2 text-zinc-500">
                            <Search className="w-4 h-4" />
                            <input type="text" placeholder="Search archive..." className="bg-transparent text-[10px] font-black uppercase tracking-widest focus:outline-none" />
                        </div>
                    </div>

                    <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                        {news?.map((item) => (
                            <div key={item._id} className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl group hover:border-brand-blue/30 transition-all">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-brand-blue/20 text-brand-blue rounded border border-brand-blue/30">
                                        {item.category}
                                    </span>
                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                                        {new Date(item.publishedDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-lg font-heading font-black uppercase italic mb-4 leading-tight group-hover:text-brand-blue transition-colors">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                                    <button className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">
                                        <Edit3 className="w-3 h-3" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
