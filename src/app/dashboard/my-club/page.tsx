"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";

export default function MyClubPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });
    const club = useQuery(api.clubs.getClubById, athlete?.clubId ? { id: athlete.clubId } : "skip" as any);
    const requests = useQuery(api.clubs.getClubRequests, athlete?.clubId ? {
        clubId: athlete.clubId,
        adminClerkId: user?.id || ""
    } : "skip" as any);
    const members = useQuery(api.clubs.getMembers, athlete?.clubId ? { clubId: athlete.clubId } : "skip" as any);

    const handleRequest = useMutation(api.clubs.handleRequest);

    if (!isLoaded || athlete === undefined || club === undefined || requests === undefined || members === undefined) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
            Menghubungi Markas Klub...
        </div>
    );

    if (!athlete?.clubId || !club) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center p-12 bg-zinc-900/40 rounded-[3rem] border border-white/5">
                    <p className="text-zinc-500 font-heading font-black uppercase tracking-widest mb-8">Kamu belum memiliki klub Terdaftar.</p>
                    <button onClick={() => router.push("/onboarding/join-club")} className="bg-white text-black font-black uppercase px-8 py-4 rounded-xl">Cari Klub</button>
                </div>
            </div>
        );
    }

    const onHandleMember = async (requestId: any, status: "approved" | "rejected") => {
        try {
            await handleRequest({ requestId, status, adminClerkId: user?.id || "" });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-[1366px] mx-auto">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="text-brand-blue font-heading font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Club Headquarters</span>
                        <h1 className="text-6xl font-heading font-black uppercase tracking-tighter italic leading-none">
                            {club.name}
                        </h1>
                        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] mt-4">{club.city} • Official Center</p>
                    </div>
                    <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-md flex items-center gap-10">
                        <div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Total Members</span>
                            <span className="text-3xl font-heading font-black text-white italic">{members.length}</span>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Pending Requests</span>
                            <span className="text-3xl font-heading font-black text-red-500 italic">{requests.length}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Membership Requests */}
                    <div className="bg-zinc-900/30 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-heading font-black uppercase italic">Gabung <span className="text-brand-blue">Klub</span></h2>
                            <span className="bg-red-500/10 text-red-500 text-[10px] px-3 py-1 rounded-full font-black border border-red-500/20">NEW REQUESTS</span>
                        </div>

                        <div className="space-y-4">
                            {requests.map((req) => (
                                <div key={req._id} className="bg-black/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-black">{req.athleteName?.charAt(0)}</div>
                                        <div>
                                            <h3 className="font-heading font-black uppercase text-sm mb-1">{req.athleteName}</h3>
                                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Wants to join</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => onHandleMember(req._id, "approved")} className="bg-white text-black font-black uppercase text-[10px] px-4 py-2 rounded-lg hover:bg-brand-blue hover:text-white transition-all">Approve</button>
                                        <button onClick={() => onHandleMember(req._id, "rejected")} className="bg-zinc-900 text-zinc-500 font-black uppercase text-[10px] px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all">Decline</button>
                                    </div>
                                </div>
                            ))}
                            {requests.length === 0 && (
                                <div className="py-20 text-center border border-zinc-900 border-dashed rounded-[2rem] text-zinc-700 font-body italic">
                                    Belum ada permintaan bergabung baru.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Member List */}
                    <div className="bg-zinc-900/30 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md">
                        <h2 className="text-3xl font-heading font-black uppercase italic mb-8">Daftar <span className="text-zinc-500">Anggota</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {members.map((member) => (
                                <div key={member._id} className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center gap-4 group hover:border-brand-blue/30 transition-all">
                                    <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-[10px] font-black uppercase group-hover:bg-brand-blue group-hover:text-white transition-colors tracking-tighter">RR</div>
                                    <div>
                                        <h3 className="font-heading font-black uppercase text-xs mb-0.5">{member.fullName}</h3>
                                        <p className="text-[8px] text-zinc-500 uppercase tracking-widest italic">{member.role === 'admin' ? 'Club Official' : 'Skater'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
