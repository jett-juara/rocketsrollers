"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    // Always run queries - backend handles auth gracefully by returning null
    const athlete = useQuery(api.clubs.getAthleteByUserId,
        user?.id ? { userId: user.id } : "skip"
    );
    const stats = useQuery(api.admin.getAdminStats);
    const pendingClubs = useQuery(api.admin.getPendingClubs);
    const activities = useQuery(api.admin.getRecentActivities);
    const verifyClub = useMutation(api.admin.verifyClub);

    // Determine auth/admin status
    const isDataLoaded = athlete !== undefined && stats !== undefined && activities !== undefined;
    const isNotAuthorized = isDataLoaded && (stats === null || activities === null || !athlete);
    const isAdmin = athlete?.role === "superadmin" || athlete?.role === "admin";

    // DEBUG: Log state untuk diagnosa
    console.log("[Admin Debug]", {
        isLoaded,
        hasUser: !!user,
        athlete: athlete === undefined ? "loading" : athlete === null ? "null" : { role: athlete?.role, fullName: athlete?.fullName },
        stats: stats === undefined ? "loading" : stats === null ? "null" : "loaded",
        activities: activities === undefined ? "loading" : activities === null ? "null" : "loaded",
        isDataLoaded,
        isNotAuthorized,
        isAdmin
    });

    // Handle redirects in useEffect (not during render)
    useEffect(() => {
        if (isLoaded && !user) {
            console.log("[Admin] Redirecting: not logged in");
            router.push("/login");
        } else if (isNotAuthorized || (isDataLoaded && !isAdmin)) {
            console.log("[Admin] Redirecting: not authorized", { isNotAuthorized, isAdmin });
            router.push("/");
        }
    }, [isLoaded, user, isNotAuthorized, isDataLoaded, isAdmin, router]);

    // Show loading while Clerk is loading
    if (!isLoaded) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Memuat...
        </div>
    );

    // Show loading if not logged in (will redirect)
    if (!user) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Mengalihkan...
        </div>
    );

    // Show loading while data is loading
    if (!isDataLoaded) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Memuat Dashboard Admin...
        </div>
    );

    // Show loading if not authorized (will redirect)
    if (isNotAuthorized || !isAdmin || !athlete) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Akses Ditolak...
        </div>
    );

    const handleVerifyClub = async (clubId: any) => {
        if (!confirm("Konfirmasi verifikasi klub ini?")) return;
        try {
            await verifyClub({
                clubId,
            });
        } catch (error) {
            console.error("Gagal verifikasi:", error);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-[1366px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <span className="text-brand-blue font-heading font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Control Center</span>
                    <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic">Admin <span className="text-zinc-500">Dashboard</span></h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <StatCard label="Total Atlet" value={stats!.totalAthletes.toString()} delay={0.1} />
                    <StatCard label="Klub" value={stats!.verifiedClubs.toString()} subValue="Terverifikasi" delay={0.2} />
                    <QuickAction label="Kelola Events" icon="🏁" onClick={() => router.push("/admin/events")} delay={0.3} />
                    <QuickAction label="Kelola News" icon="📰" onClick={() => router.push("/admin/news")} delay={0.4} />
                    <QuickAction label="Kelola CMS" icon="🛠️" onClick={() => router.push("/admin/cms")} delay={0.5} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Action Panel */}
                    <div className="bg-zinc-900/40 border border-white/5 p-12 rounded-[3rem] backdrop-blur-md">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-heading font-black uppercase italic">Verifikasi Klub</h2>
                            <span className="bg-red-500/10 text-red-500 text-[10px] px-3 py-1 rounded-full font-black border border-red-500/20">{pendingClubs?.length || 0} AWAITING</span>
                        </div>

                        <div className="space-y-4">
                            {!pendingClubs || pendingClubs.length === 0 ? (
                                <div className="text-zinc-600 font-body text-sm py-20 text-center border border-zinc-900 border-dashed rounded-[2rem]">
                                    Belum ada klub yang butuh verifikasi.
                                </div>
                            ) : (
                                pendingClubs.map((club) => (
                                    <div key={club._id} className="bg-black/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-brand-blue/30 transition-all">
                                        <div>
                                            <h3 className="font-heading font-black uppercase italic text-lg">{club.name}</h3>
                                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{club.city} • {club.picName}</p>
                                        </div>
                                        <button
                                            onClick={() => handleVerifyClub(club._id)}
                                            className="bg-white text-black text-[10px] font-black uppercase px-6 py-3 rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-0.5"
                                        >
                                            Verifikasi
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-white/5 p-12 rounded-[3rem] backdrop-blur-md">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-heading font-black uppercase italic">Monitoring Aktivitas</h2>
                            <button
                                onClick={() => router.push("/admin/users")}
                                className="text-[10px] font-black uppercase tracking-widest text-brand-blue border-b border-brand-blue/30 pb-1 hover:text-white hover:border-white transition-all"
                            >
                                Kelola User
                            </button>
                        </div>

                        <div className="space-y-6">
                            {!activities || activities.length === 0 ? (
                                <div className="text-zinc-600 font-body text-sm py-20 text-center border border-zinc-900 border-dashed rounded-[2rem]">
                                    Belum ada aktivitas pendaftaran terbaru.
                                </div>
                            ) : (
                                activities.map((act) => (
                                    <div key={act.id} className="flex items-start gap-6 group">
                                        <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${act.status === 'approved' ? 'bg-green-500' :
                                            act.status === 'pending' ? 'bg-yellow-500' : 'bg-zinc-800'
                                            }`}></div>
                                        <div>
                                            <p className="font-heading font-black uppercase text-sm leading-none group-hover:text-brand-blue transition-colors">{act.name}</p>
                                            <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-widest">
                                                {act.clubName} • <span className="text-zinc-700 italic">{new Date(act.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function StatCard({ label, value, subValue, accent, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-zinc-900/30 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-md"
        >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4 block">{label}</span>
            <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-heading font-black italic ${accent ? 'text-brand-blue' : 'text-white'}`}>{value}</span>
                {subValue && <span className="text-[10px] font-black uppercase text-zinc-600">{subValue}</span>}
            </div>
        </motion.div>
    );
}

function QuickAction({ label, icon, onClick, delay }: any) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            onClick={onClick}
            className="bg-brand-blue/5 border border-brand-blue/10 p-10 rounded-[2.5rem] backdrop-blur-md hover:bg-brand-blue transition-all group text-left flex flex-col justify-between"
        >
            <span className="text-2xl mb-4 block">{icon}</span>
            <span className="text-xl font-heading font-black italic text-white leading-none uppercase group-hover:text-white transition-colors">{label} →</span>
        </motion.button>
    );
}
