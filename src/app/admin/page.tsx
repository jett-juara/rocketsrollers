"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
};

export default function AdminDashboard() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });

    if (!isLoaded || (athlete && athlete.role === undefined)) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                <div className="text-zinc-500 font-heading tracking-[0.3em] animate-pulse">MEMERIKSA OTORITAS...</div>
            </div>
        );
    }

    if (athlete && athlete.role === "user") {
        router.replace("/");
        return null;
    }

    const stats = [
        { label: "Total Atlet", value: "124", icon: "👥", trend: "+12% minggu ini" },
        { label: "Klub Terdaftar", value: "12", icon: "🏆", trend: "3 baru bulan ini" },
        { label: "Event Aktif", value: "2", icon: "🏁", trend: "Series #2 Sedang Jalan" },
        { label: "Request Pending", value: "5", icon: "⏳", highlight: true, trend: "Butuh Persetujuan" },
    ];

    const menus = [
        { title: "Manajemen User", desc: "Kelola role admin & data atlet untuk seluruh ekosistem.", icon: "👤", link: "/admin/users", superOnly: true, color: "from-blue-600 to-indigo-700" },
        { title: "Verifikasi Klub", desc: "Validasi pendaftaran klub baru & kelola status keanggotaan.", icon: "🏢", link: "/admin/clubs", color: "from-emerald-600 to-teal-700" },
        { title: "Kelola Event", desc: "Atur jadwal, lokasi, dan mata lomba kompetisi mendatang.", icon: "📅", link: "/admin/events", color: "from-orange-600 to-red-700" },
        { title: "Input Hasil", desc: "Update skor, peringkat, dan statistik live saat kompetisi.", icon: "📊", link: "/admin/results", color: "from-purple-600 to-pink-700" },
    ];

    return (
        <main className="min-h-screen bg-black text-white selection:bg-brand-blue/30 overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/images/hero_bg.png')] bg-cover bg-fixed opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
            </div>

            <Header />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative z-10 max-w-[1366px] mx-auto px-6 pt-32 pb-20"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-white/5 pb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="bg-brand-blue/10 text-brand-blue border border-brand-blue/30 px-3 py-1 rounded-full font-heading font-bold uppercase tracking-widest text-[10px]">
                                Security Level: {athlete?.role}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">System Online</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-slab font-bold uppercase italic tracking-tight">
                            Control <span className="text-brand-blue">Tower</span>
                        </h1>
                        <p className="text-zinc-400 font-body max-w-xl text-lg leading-relaxed">
                            Selamat datang di pusat kendali RocketsRollers. Kelola seluruh operasional liga dari satu dashboard terpadu.
                        </p>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-brand-blue/20 flex items-center justify-center text-2xl group-hover:bg-brand-blue/40 transition-colors">🛡️</div>
                        <div className="pr-4">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest leading-none mb-1">Authenticated Account</p>
                            <p className="font-heading font-bold text-lg">{user?.fullName}</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.4)" }}
                            className="bg-zinc-900/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:bg-brand-blue/10 transition-colors"></div>
                            <div className="text-3xl mb-6 bg-zinc-800 w-12 h-12 flex items-center justify-center rounded-xl">{s.icon}</div>
                            <div className="flex items-baseline gap-2 mb-1">
                                <div className="text-5xl font-slab font-bold">{s.value}</div>
                                {s.highlight && <div className="w-2 h-2 rounded-full bg-brand-blue animate-ping"></div>}
                            </div>
                            <div className={`text-[10px] uppercase font-black tracking-[0.2em] mb-4 ${s.highlight ? "text-brand-blue" : "text-zinc-500"}`}>{s.label}</div>
                            <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">{s.trend}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Section Title */}
                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                    <h2 className="text-xl font-heading font-bold uppercase tracking-widest text-zinc-400">Command Center</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                </motion.div>

                {/* Main Menu Grid */}
                <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {menus.map((m, i) => (
                        <Link
                            key={i}
                            href={m.link}
                        >
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                whileTap={{ scale: 0.98 }}
                                className={`group relative bg-zinc-900/40 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[320px] transition-all overflow-hidden ${m.superOnly && athlete?.role !== "superadmin" ? "opacity-30 cursor-not-allowed grayscale pointer-events-none" : "hover:border-white/20 shadow-2xl hover:shadow-brand-blue/10"}`}
                            >
                                {/* Hover Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 origin-left drop-shadow-2xl">
                                        {m.icon}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <h3 className="text-2xl font-heading font-bold uppercase leading-tight group-hover:text-brand-blue transition-colors">{m.title}</h3>
                                            {m.superOnly && <span className="text-[8px] bg-red-500/10 text-red-500 border border-red-500/20 px-1.5 py-0.5 rounded uppercase font-black">Super</span>}
                                        </div>
                                        <p className="text-zinc-500 group-hover:text-zinc-300 font-body text-sm leading-relaxed transition-colors">{m.desc}</p>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between">
                                        <div className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-brand-blue transition-all">
                                            Manage Panel <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>

                {/* Footer Info */}
                <motion.div variants={itemVariants} className="mt-20 flex flex-col md:flex-row justify-between items-center bg-zinc-900/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl gap-4">
                    <div className="flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px]">👤</div>
                            ))}
                        </div>
                        <p className="text-xs text-zinc-500 font-body">
                            <span className="text-white font-bold">3 Admin</span> sedang aktif mengelola data.
                        </p>
                    </div>
                    <div className="text-[10px] text-zinc-600 font-heading uppercase tracking-widest">
                        Server Time: {new Date().toLocaleTimeString()} WIB
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}

