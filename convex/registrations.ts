import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Helper to determine KU based on birth year
function getKU(birthYear: number) {
    if (birthYear >= 2018) return "A";
    if (birthYear >= 2016) return "B";
    if (birthYear >= 2014) return "C";
    if (birthYear >= 2011) return "D";
    if (birthYear >= 2007) return "Junior";
    return "Senior";
}

// Register for an event
export const create = mutation({
    args: {
        eventId: v.id("events"),
        athleteId: v.id("athletes"),
        category: v.union(v.literal("Pemula"), v.literal("Standard"), v.literal("Speed")),
        selectedEvents: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        // Check if already registered
        const existing = await ctx.db
            .query("registrations")
            .withIndex("by_athlete", (q) => q.eq("athleteId", args.athleteId))
            .filter((q) => q.eq(q.field("eventId"), args.eventId))
            .unique();

        if (existing) {
            throw new Error("Kamu sudah terdaftar di event ini.");
        }

        // Handle KU validation (simple version for now)
        const athlete = await ctx.db.get(args.athleteId);
        if (!athlete) throw new Error("Atlet tidak ditemukan.");

        const birthYear = new Date(athlete.birthDate).getFullYear();
        const age = new Date().getFullYear() - birthYear;

        if (args.category === "Pemula" && age > 10) {
            throw new Error("Kategori Pemula maksimal usia 10 tahun.");
        }

        return await ctx.db.insert("registrations", {
            athleteId: args.athleteId,
            eventId: args.eventId,
            category: args.category,
            events: args.selectedEvents,
            status: "pending",
        });
    },
});

// Get registrations for an event (Admin)
export const getForEvent = query({
    args: { eventId: v.id("events"), adminClerkId: v.string() },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "superadmin" && caller.role !== "admin")) {
            throw new Error("Unauthorized");
        }

        const regs = await ctx.db
            .query("registrations")
            .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
            .collect();

        return await Promise.all(regs.map(async (r) => {
            const athlete = await ctx.db.get(r.athleteId);
            const club = athlete?.clubId ? await ctx.db.get(athlete.clubId) : null;
            return {
                ...r,
                athleteName: athlete?.fullName,
                clubName: club?.name || "PRIVAT",
                ku: athlete ? getKU(new Date(athlete.birthDate).getFullYear()) : "TBA",
            };
        }));
    },
});

// Update registration status
export const updateStatus = mutation({
    args: {
        id: v.id("registrations"),
        status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
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

        await ctx.db.patch(args.id, { status: args.status });
    },
});

// Get registration for current event for an athlete
export const getMyRegistration = query({
    args: { eventId: v.id("events"), athleteId: v.id("athletes") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("registrations")
            .withIndex("by_athlete", (q) => q.eq("athleteId", args.athleteId))
            .filter((q) => q.eq(q.field("eventId"), args.eventId))
            .unique();
    },
});

// Ambil Poin Personal Atlet
export const getAthletePoints = query({
    args: { athleteId: v.id("athletes") },
    handler: async (ctx, args) => {
        const results = await ctx.db
            .query("results")
            .withIndex("by_athlete", (q) => q.eq("athleteId", args.athleteId))
            .collect();

        return results.reduce((acc, r) => {
            if (r.rank === 1) return acc + 15;
            if (r.rank === 2) return acc + 10;
            if (r.rank === 3) return acc + 7;
            return acc + 1; // Presence
        }, 0);
    },
});
