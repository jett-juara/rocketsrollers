"use client";

import { motion } from "framer-motion";
import { Settings, Info, Save } from "lucide-react";

export default function CMSDashboard() {
    return (
        <div className="max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-xl border border-brand-blue/20 flex items-center justify-center">
                        <Settings className="w-6 h-6 text-brand-blue" />
                    </div>
                    <span className="text-zinc-500 font-heading font-black uppercase tracking-[0.4em] text-[10px]">
                        Management Center
                    </span>
                </div>
                <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic leading-none">
                    CMS <span className="text-zinc-500">Overview</span>
                </h1>
            </motion.div>

            <div className="grid gap-8">
                {/* Status Card */}
                <div className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md">
                    <h2 className="text-2xl font-heading font-black uppercase italic mb-6">Global <span className="text-brand-blue">Status</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                            <span className="text-[8px] font-black uppercase text-zinc-500 block mb-2">Build Version</span>
                            <span className="text-lg font-heading font-black text-white italic">v0.8.2-PRE</span>
                        </div>
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                            <span className="text-[8px] font-black uppercase text-zinc-500 block mb-2">CMS Status</span>
                            <span className="text-lg font-heading font-black text-green-500 italic">OPERATIONAL</span>
                        </div>
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                            <span className="text-[8px] font-black uppercase text-zinc-500 block mb-2">Storage Usage</span>
                            <span className="text-lg font-heading font-black text-white italic">12.4 MB</span>
                        </div>
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                            <span className="text-[8px] font-black uppercase text-zinc-500 block mb-2">Sync Interval</span>
                            <span className="text-lg font-heading font-black text-white italic">REALTIME</span>
                        </div>
                    </div>
                </div>

                {/* Quick Help */}
                <div className="bg-brand-blue/5 border border-brand-blue/10 p-10 rounded-[3rem] backdrop-blur-md flex items-start gap-8">
                    <div className="p-4 bg-brand-blue/20 rounded-2xl border border-brand-blue/30">
                        <Info className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                        <h3 className="text-xl font-heading font-black uppercase italic mb-2">Pusat Bantuan CMS</h3>
                        <p className="text-zinc-400 font-body text-sm leading-relaxed mb-6">
                            Gunakan sidebar di sebelah kiri untuk mengelola konten di tiap section landing page.
                            Perubahan yang lo simpan di sini bakal langsung muncul di website secara real-time.
                            Pastikan aset gambar berukuran optimal agar tidak memperlambat website.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
