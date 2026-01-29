"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";

export default function AthleteDashboard() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const activeEvents = useQuery(api.events.list);
    const myRegistrations = useQuery(api.registrations.getMyRegistration,
        athlete && activeEvents && activeEvents.length > 0 ? { eventId: activeEvents[0]._id as any, athleteId: athlete._id } : "skip" as any
    );
    const myPoints = useQuery(api.registrations.getAthletePoints,
        athlete ? { athleteId: athlete._id } : "skip" as any
    ); // Simple check for the first active event for now

    if (!isLoaded || athlete === undefined || activeEvents === undefined || (athlete && myPoints === undefined) || (athlete && activeEvents && activeEvents.length > 0 && myRegistrations === undefined)) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Memasuki Pit Lane...
        </div>
    );

    if (!athlete) {
        router.push("/onboarding/complete-profile");
        return null;
    }

    const clubLink = athlete.clubId ? "Klub Terdaftar" : (athlete.membershipStatus === "private" ? "Jalur Privat" : "N/A");

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <Header />

            <div className="pt-32 pb-20 px-6 max-w-[1366px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <div>
                        <span className="text-brand-blue font-heading font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Athlete Profile</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter italic leading-none">
                            Welcome, <span className="text-zinc-500">{athlete.fullName.split(' ')[0]}</span>
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-zinc-900 border border-white/5 px-6 py-4 rounded-2xl backdrop-blur-md">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-1">Status</span>
                            <span className={`text-[10px] font-heading font-black uppercase tracking-widest ${athlete.membershipStatus === 'approved' || athlete.membershipStatus === 'private' ? 'text-green-500' : 'text-yellow-500 animate-pulse'
                                }`}>
                                {athlete.membershipStatus === 'approved' ? 'Terverifikasi' :
                                    athlete.membershipStatus === 'private' ? 'Independent' : 'Pending'}
                            </span>
                        </div>
                        <div className="bg-zinc-900 border border-white/5 px-6 py-4 rounded-2xl backdrop-blur-md">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-1">Entitas</span>
                            <span className="text-[10px] font-heading font-black uppercase tracking-widest text-white">
                                {clubLink}
                            </span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Active Competitions */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-heading font-black uppercase italic">Active <span className="text-brand-blue">Series</span></h2>
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Available for registration</p>
                        </div>

                        <div className="grid gap-6">
                            {activeEvents.filter(e => e.type === 'tickets').map((event) => {
                                // Find registration for this specific event
                                const isRegistered = myRegistrations && (myRegistrations as any).eventId === event._id;

                                return (
                                    <motion.div
                                        whileHover={{ x: 10 }}
                                        key={event._id}
                                        className="bg-zinc-900/30 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between group hover:bg-zinc-900/50 transition-all backdrop-blur-md"
                                    >
                                        <div className="flex items-center gap-8 mb-6 md:mb-0">
                                            <div className="w-16 h-16 bg-black rounded-xl border border-white/5 flex items-center justify-center text-2xl font-heading font-black group-hover:border-brand-blue/30 transition-colors">
                                                RR
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-heading font-black uppercase italic group-hover:text-brand-blue transition-colors mb-1">
                                                    {event.name}
                                                </h3>
                                                <p className="text-[10px] text-zinc-500 font-body uppercase tracking-widest">{event.date} • {event.location}</p>
                                            </div>
                                        </div>

                                        {isRegistered ? (
                                            <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 px-8 py-4 rounded-xl">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <span className="text-[10px] font-heading font-black uppercase tracking-widest text-green-500">Terdaftar</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => router.push(`/dashboard/register-event/${event._id}`)}
                                                className="bg-white text-black font-heading font-black uppercase text-xs tracking-widest px-8 py-4 rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl flex items-center gap-3"
                                            >
                                                Daftar Sekarang
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </button>
                                        )}
                                    </motion.div>
                                );
                            })}
                            {activeEvents.filter(e => e.type === 'tickets').length === 0 && (
                                <div className="py-20 text-center border border-zinc-900 border-dashed rounded-[2.5rem] text-zinc-700 font-body italic">
                                    Belum ada pendaftaran seri yang dibuka saat ini.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar: Announcements or Stats */}
                    <div className="space-y-8">
                        <div className="bg-zinc-900/40 border border-white/10 p-10 rounded-[3rem] backdrop-blur-md">
                            <h3 className="text-xl font-heading font-black uppercase italic mb-6">Poin Ranking</h3>
                            <div className="flex items-center gap-6 mb-8">
                                <span className="text-6xl font-heading font-black text-brand-blue">{myPoints || 0}</span>
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 leading-relaxed">
                                    Global<br />Points
                                </div>
                            </div>
                            <p className="text-xs text-zinc-600 font-body leading-relaxed mb-8">
                                Poin dikumpulkan dari setiap seri untuk menentukan peringkat akhir RocketsRollers Championship 2025.
                            </p>
                            <button
                                onClick={() => router.push("/results")}
                                className="w-full border border-white/5 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all hover:text-black"
                            >
                                Lihat Klasemen
                            </button>
                        </div>

                        <div className="bg-brand-blue/5 border border-brand-blue/10 p-10 rounded-[3rem] backdrop-blur-md">
                            <h3 className="text-xl font-heading font-black uppercase italic mb-4">Club HQ</h3>
                            <p className="text-xs text-zinc-500 font-body leading-relaxed mb-6">Kelola anggota dan permintaan bergabung klub kamu.</p>
                            <button
                                onClick={() => router.push("/dashboard/my-club")}
                                className="w-full bg-white text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-xl"
                            >
                                Management Area
                            </button>
                        </div>

                        <div className="bg-zinc-900 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md">
                            <h3 className="text-xl font-heading font-black uppercase italic mb-4">Technical Help</h3>
                            <p className="text-xs text-zinc-500 font-body leading-relaxed mb-6">Butuh bantuan pendaftaran atau info regulasi?</p>
                            <a href="https://wa.me/082233820100" target="_blank" className="text-brand-blue font-heading font-black uppercase text-[10px] tracking-widest border-b border-brand-blue/20 pb-1 hover:text-white hover:border-white transition-all flex items-center gap-2">
                                Hubungi Official WA
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
