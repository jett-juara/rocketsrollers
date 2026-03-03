"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Home, Save, RefreshCcw, Eye, Layout } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function CMSHeroPage() {
    const { user } = useUser();
    const landingData = useQuery(api.landing.getLandingData);
    const updateLanding = useMutation(api.landing.updateLandingData);

    const [form, setForm] = useState({
        heroTitle: "ROCKETS ROLLERS",
        heroSlogan: "Speed • Skill • Glory",
        heroEventInfo: "Sirkuit Kanjuruhan, Malang | 3 – 5 Okt",
        primaryCtaLabel: "Daftar Klub",
        primaryCtaLink: "/onboarding/join-club",
        secondaryCtaLabel: "Jalur Privat",
        secondaryCtaLink: "/onboarding/confirm-private",
        heroBgUrl: ""
    });

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (landingData) {
            setForm({
                heroTitle: landingData.heroTitle,
                heroSlogan: landingData.heroSlogan,
                heroEventInfo: landingData.heroEventInfo,
                primaryCtaLabel: landingData.primaryCtaLabel,
                primaryCtaLink: landingData.primaryCtaLink,
                secondaryCtaLabel: landingData.secondaryCtaLabel,
                secondaryCtaLink: landingData.secondaryCtaLink,
                heroBgUrl: landingData.heroBgUrl || ""
            });
        }
    }, [landingData]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateLanding({
                ...form,
                id: landingData?._id,
            });
            alert("Landing page updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to update landing page.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-[1200px]">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Home className="w-5 h-5 text-brand-blue" />
                        <span className="text-zinc-500 font-heading font-black uppercase tracking-[0.4em] text-[10px]">Interface Boutique</span>
                    </div>
                    <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic leading-none">
                        Hero <span className="text-zinc-500">Editor</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white/5 border border-white/10 text-zinc-500 font-heading font-black uppercase text-[10px] tracking-widest px-8 py-4 rounded-xl hover:text-white transition-all flex items-center gap-3">
                        <Eye className="w-4 h-4" /> Preview Live
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-brand-blue text-white font-heading font-black uppercase text-[10px] tracking-widest px-8 py-4 rounded-xl hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 shadow-2xl flex items-center gap-3 disabled:opacity-50"
                    >
                        {isSaving ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Content Configuration */}
                <div className="lg:col-span-8 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md"
                    >
                        <h2 className="text-2xl font-heading font-black uppercase italic mb-8 flex items-center gap-4 text-zinc-500">
                            Main <span className="text-white">Typography</span>
                            <div className="h-px flex-1 bg-white/5"></div>
                        </h2>

                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Hero Title (Uppercase recommended)</label>
                                <textarea
                                    value={form.heroTitle}
                                    onChange={e => setForm({ ...form, heroTitle: e.target.value.toUpperCase() })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 font-heading font-black text-4xl uppercase tracking-tighter italic focus:outline-none focus:border-brand-blue/50 resize-none h-40 leading-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Top Slogan</label>
                                    <input
                                        type="text" value={form.heroSlogan}
                                        onChange={e => setForm({ ...form, heroSlogan: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 font-heading font-black uppercase text-xs tracking-[0.3em] focus:outline-none focus:border-brand-blue/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Event Info Strip</label>
                                    <input
                                        type="text" value={form.heroEventInfo}
                                        onChange={e => setForm({ ...form, heroEventInfo: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 font-body text-sm focus:outline-none focus:border-brand-blue/50"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md"
                    >
                        <h2 className="text-2xl font-heading font-black uppercase italic mb-8 flex items-center gap-4 text-zinc-500">
                            Visual <span className="text-white">Assets</span>
                            <div className="h-px flex-1 bg-white/5"></div>
                        </h2>

                        <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-2">Background Media (Hero)</label>
                            <ImageUpload
                                currentImage={form.heroBgUrl}
                                onUploadComplete={(storageId) => setForm({ ...form, heroBgUrl: storageId })}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md"
                    >
                        <h2 className="text-2xl font-heading font-black uppercase italic mb-8 flex items-center gap-4 text-zinc-500">
                            Action <span className="text-white">Buttons</span>
                            <div className="h-px flex-1 bg-white/5"></div>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <span className="text-[8px] font-black uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20">Primary CTA</span>
                                <div className="space-y-4">
                                    <input
                                        type="text" placeholder="Button Label"
                                        value={form.primaryCtaLabel}
                                        onChange={e => setForm({ ...form, primaryCtaLabel: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 font-heading font-black uppercase text-[10px] tracking-widest focus:outline-none focus:border-brand-blue/50"
                                    />
                                    <input
                                        type="text" placeholder="Link (e.g. /register)"
                                        value={form.primaryCtaLink}
                                        onChange={e => setForm({ ...form, primaryCtaLink: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 font-body text-xs focus:outline-none focus:border-brand-blue/50"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">Secondary CTA</span>
                                <div className="space-y-4">
                                    <input
                                        type="text" placeholder="Button Label"
                                        value={form.secondaryCtaLabel}
                                        onChange={e => setForm({ ...form, secondaryCtaLabel: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 font-heading font-black uppercase text-[10px] tracking-widest focus:outline-none focus:border-brand-blue/50"
                                    />
                                    <input
                                        type="text" placeholder="Link (e.g. /privat)"
                                        value={form.secondaryCtaLink}
                                        onChange={e => setForm({ ...form, secondaryCtaLink: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 font-body text-xs focus:outline-none focus:border-brand-blue/50"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Visual Preview Column */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-black border border-white/5 p-8 rounded-[3rem] sticky top-8">
                        <div className="flex items-center gap-3 mb-8">
                            <Layout className="w-5 h-5 text-zinc-500" />
                            <h3 className="text-xs font-heading font-black uppercase tracking-widest">Mockup Preview</h3>
                        </div>

                        <div className="aspect-[3/4] bg-zinc-900 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center p-8 text-center">
                            <div className="absolute inset-0 bg-[url('/images/hero_bg.png')] bg-cover opacity-20"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>

                            <div className="relative z-10 w-full">
                                <span className="text-[6px] font-black text-brand-blue uppercase tracking-[0.4em] mb-4 block leading-none">{form.heroSlogan}</span>
                                <h4 className="text-xl font-heading font-black italic uppercase leading-[0.9] tracking-tighter mb-4 whitespace-pre-line">{form.heroTitle}</h4>
                                <p className="text-[6px] text-zinc-400 font-bold uppercase tracking-widest mb-8">{form.heroEventInfo}</p>

                                <div className="flex flex-col gap-2 w-full px-4">
                                    <div className="bg-white text-black text-[6px] font-black uppercase py-3 rounded-lg">{form.primaryCtaLabel}</div>
                                    <div className="bg-white/5 border border-white/10 text-white text-[6px] font-black uppercase py-3 rounded-lg">{form.secondaryCtaLabel}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
                            <p className="text-[8px] font-bold text-yellow-500 uppercase tracking-widest leading-loose text-center">
                                * Preview mockup di atas hanyalah estimasi tata letak visual. Cek rilis Live di Website Utama untuk hasil presisi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
