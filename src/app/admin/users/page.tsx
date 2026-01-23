"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import { useState } from "react";

export default function UserManagementPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    // Auth context
    const athlete = useQuery(api.clubs.getAthleteByUserId, { userId: user?.id || "" });

    // Data Management
    const allUsers = useQuery(api.admin.getAllUsers, { adminClerkId: user?.id || "" });
    const promoteUser = useMutation(api.admin.promoteToAdmin);

    const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error", text: string } | null>(null);

    if (!isLoaded || !athlete || !allUsers) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading animate-pulse">AUTHING MANAGEMENT...</div>;
    }

    if (athlete.role !== "superadmin") {
        router.replace("/admin");
        return null;
    }

    const handlePromote = async (targetId: any, name: string) => {
        if (!confirm(`Yakin mau angkat ${name} jadi Admin?`)) return;

        try {
            await promoteUser({
                targetAthleteId: targetId,
                adminClerkId: user?.id || "",
            });
            setStatusMsg({ type: "success", text: `${name} sekarang resmi jadi Admin!` });
            setTimeout(() => setStatusMsg(null), 3000);
        } catch (error: any) {
            setStatusMsg({ type: "error", text: error.message });
        }
    };

    return (
        <main className="min-h-screen bg-black text-white bg-[url('/images/hero_bg.png')] bg-cover bg-fixed">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl"></div>
            <Header />

            <div className="relative z-10 max-w-[1366px] mx-auto px-6 pt-32 pb-20">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => router.push("/admin")}
                            className="text-zinc-500 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-[0.3em] mb-4 flex items-center gap-2"
                        >
                            ← Back to Tower
                        </button>
                        <h1 className="text-4xl font-slab font-bold uppercase italic">User Management</h1>
                        <p className="text-zinc-500 font-body text-sm mt-2 font-light">Promote athletes to admin status or manage credentials.</p>
                    </div>

                    <AnimatePresence>
                        {statusMsg && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className={`px-6 py-3 rounded-xl border font-heading font-bold uppercase text-[10px] tracking-widest ${statusMsg.type === "success" ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-red-500/10 border-red-500/50 text-red-400"
                                    }`}
                            >
                                {statusMsg.text}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Table Layout */}
                <div className="bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-6 font-heading font-bold uppercase text-[10px] tracking-[0.3em] text-zinc-500">Athlete Identity</th>
                                <th className="p-6 font-heading font-bold uppercase text-[10px] tracking-[0.3em] text-zinc-500">Role Status</th>
                                <th className="p-6 font-heading font-bold uppercase text-[10px] tracking-[0.3em] text-zinc-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {allUsers.map((u) => (
                                <tr key={u._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xl overflow-hidden font-heading font-bold">
                                                {u.photo ? <img src={u.photo} className="w-full h-full object-cover" /> : u.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-heading font-bold uppercase text-sm group-hover:text-brand-blue transition-colors">{u.fullName}</p>
                                                <p className="text-[10px] text-zinc-500 font-body tracking-wider">ID: {u.userId.substring(0, 12)}...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${u.role === "superadmin" ? "bg-brand-blue/10 border-brand-blue text-brand-blue" :
                                                u.role === "admin" ? "bg-white/10 border-white/30 text-white" : "text-zinc-500 border-white/5 bg-transparent"
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        {u.role === "user" && (
                                            <button
                                                onClick={() => handlePromote(u._id, u.fullName)}
                                                className="bg-white text-black font-heading font-bold uppercase text-[10px] px-4 py-2 rounded-lg hover:bg-brand-blue hover:text-white transition-all transform hover:-translate-y-0.5 shadow-lg active:scale-95"
                                            >
                                                Promote to Admin
                                            </button>
                                        )}
                                        {u.role === "superadmin" && <span className="text-[10px] text-zinc-600 font-heading italic uppercase">Root Access</span>}
                                        {u.role === "admin" && <span className="text-[10px] text-brand-blue font-heading uppercase font-bold">Verified Staff</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
