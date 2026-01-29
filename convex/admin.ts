import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Fungsi untuk promosi user menjadi admin
// Hanya bisa dipanggil oleh Superadmin
export const promoteToAdmin = mutation({
    args: {
        targetAthleteId: v.id("athletes"),
        adminClerkId: v.string(), // ID Superadmin yang memanggil
    },
    handler: async (ctx, args) => {
        // 1. Verifikasi pemanggil adalah Superadmin
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || caller.role !== "superadmin") {
            throw new Error("Unauthorized: Hanya Superadmin yang bisa mengangkat Admin baru.");
        }

        // 2. Update role target
        await ctx.db.patch(args.targetAthleteId, {
            role: "admin",
        });

        return { success: true, message: "User berhasil diangkat menjadi Admin." };
    },
});

// List semua user untuk dashboard management
export const getAllUsers = query({
    args: { adminClerkId: v.string() },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "superadmin" && caller.role !== "admin")) {
            throw new Error("Unauthorized: Akses dashboard manajemen ditolak.");
        }

        return await ctx.db.query("athletes").collect();
    },
});
// List semua klub yang menunggu verifikasi
export const getPendingClubs = query({
    args: { adminClerkId: v.string() },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "superadmin" && caller.role !== "admin")) {
            throw new Error("Unauthorized");
        }

        return await ctx.db
            .query("clubs")
            .filter((q) => q.eq(q.field("isVerified"), false))
            .collect();
    },
});

// Mutasi untuk verifikasi klub
export const verifyClub = mutation({
    args: {
        clubId: v.id("clubs"),
        adminClerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "superadmin" && caller.role !== "admin")) {
            throw new Error("Unauthorized");
        }

        await ctx.db.patch(args.clubId, {
            isVerified: true,
        });

        // Search for the athlete who registered this club (usually the one with pending status in this club)
        const applicants = await ctx.db
            .query("athletes")
            .withIndex("by_clubId", (q) => q.eq("clubId", args.clubId))
            .collect();

        for (const applicant of applicants) {
            if (applicant.membershipStatus === "pending") {
                await ctx.db.patch(applicant._id, {
                    membershipStatus: "approved",
                });
            }
        }

        return { success: true };
    },
});

// Statistik Dashboard
export const getAdminStats = query({
    args: { adminClerkId: v.string() },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "superadmin" && caller.role !== "admin")) {
            throw new Error("Unauthorized");
        }

        const totalAthletes = await ctx.db.query("athletes").collect();
        const verifiedClubs = await ctx.db.query("clubs").filter(q => q.eq(q.field("isVerified"), true)).collect();
        const pendingClubs = await ctx.db.query("clubs").filter(q => q.eq(q.field("isVerified"), false)).collect();

        return {
            totalAthletes: totalAthletes.length,
            verifiedClubs: verifiedClubs.length,
            pendingClubs: pendingClubs.length,
        };
    },
});
// Monitoring Aktivitas Terbaru (Atlet & Registrasi)
export const getRecentActivities = query({
    args: { adminClerkId: v.string() },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "superadmin" && caller.role !== "admin")) {
            throw new Error("Unauthorized");
        }

        const recentAthletes = await ctx.db.query("athletes").order("desc").take(5);

        return await Promise.all(recentAthletes.map(async (a) => {
            const club = a.clubId ? await ctx.db.get(a.clubId) : null;
            return {
                id: a._id,
                name: a.fullName,
                status: a.membershipStatus,
                clubName: club?.name || (a.membershipStatus === "private" ? "PRIVAT" : "Belum Berklub"),
                time: a._creationTime
            };
        }));
    },
});
// Input Hasil Lomba & Kalkulasi Poin
export const inputResult = mutation({
    args: {
        athleteId: v.id("athletes"),
        eventId: v.id("events"),
        category: v.string(),
        subEvent: v.string(),
        score: v.string(),
        rank: v.number(),
        adminClerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "superadmin" && caller.role !== "admin")) {
            throw new Error("Unauthorized");
        }

        // Simpan Hasil
        const resultId = await ctx.db.insert("results", {
            athleteId: args.athleteId,
            eventId: args.eventId,
            category: args.category,
            subEvent: args.subEvent,
            score: args.score,
            rank: args.rank,
        });

        // POIN SYSTEM: 1: 15, 2: 10, 3: 7, Else: 1 (Attendance)
        let pointsToAdd = 1;
        if (args.rank === 1) pointsToAdd = 15;
        else if (args.rank === 2) pointsToAdd = 10;
        else if (args.rank === 3) pointsToAdd = 7;

        // Update Athlete's global points if we decide to store it in athlete table 
        // For now, points are calculated by summing results.

        return { success: true, resultId, pointsEarned: pointsToAdd };
    },
});

// Update Stats to include points
export const getAthleteLeaderboard = query({
    args: {},
    handler: async (ctx) => {
        const results = await ctx.db.query("results").collect();
        const athletes = await ctx.db.query("athletes").collect();

        const leaderboard = athletes.map(a => {
            const athleteResults = results.filter(r => r.athleteId === a._id);
            let totalPoints = athleteResults.reduce((acc, r) => {
                if (r.rank === 1) return acc + 15;
                if (r.rank === 2) return acc + 10;
                if (r.rank === 3) return acc + 7;
                return acc + 1; // Presence
            }, 0);

            return {
                id: a._id,
                name: a.fullName,
                points: totalPoints,
                clubId: a.clubId
            };
        });

        return leaderboard.sort((a, b) => b.points - a.points);
    }
});
