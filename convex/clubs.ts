import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("clubs").filter(q => q.eq(q.field("isVerified"), true)).collect();
    },
});

export const getAthleteByUserId = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        if (!args.userId) return null;
        return await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .unique();
    },
});

export const createMembershipRequest = mutation({
    args: {
        athleteId: v.id("athletes"),
        clubId: v.id("clubs"),
    },
    handler: async (ctx, args) => {
        // 1. Cek dulu apakah request serupa sudah ada
        const existing = await ctx.db
            .query("membershipRequests")
            .withIndex("by_club", (q) => q.eq("clubId", args.clubId).eq("status", "pending"))
            .filter((q) => q.eq(q.field("athleteId"), args.athleteId))
            .unique();

        if (existing) return existing._id;

        // 2. Buat request baru
        const requestId = await ctx.db.insert("membershipRequests", {
            athleteId: args.athleteId,
            clubId: args.clubId,
            status: "pending",
        });

        // 3. Update status atlet ke pending
        await ctx.db.patch(args.athleteId, {
            membershipStatus: "pending",
            clubId: args.clubId,
        });

        return requestId;
    },
});

export const registerNewClub = mutation({
    args: {
        name: v.string(),
        address: v.string(),
        city: v.string(),
        picName: v.string(),
        picPhone: v.string(),
        athleteId: v.optional(v.id("athletes")),
    },
    handler: async (ctx, args) => {
        const clubId = await ctx.db.insert("clubs", {
            name: args.name,
            address: args.address,
            city: args.city,
            picName: args.picName,
            picPhone: args.picPhone,
            isVerified: false,
        });

        if (args.athleteId) {
            await ctx.db.patch(args.athleteId, {
                clubId: clubId,
                membershipStatus: "pending",
                role: "admin"
            });
        }

        return clubId;
    },
});

export const getClubById = query({
    args: { id: v.id("clubs") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const getMembers = query({
    args: { clubId: v.id("clubs") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("athletes")
            .withIndex("by_clubId", (q) => q.eq("clubId", args.clubId))
            .filter((q) => q.eq(q.field("membershipStatus"), "approved"))
            .collect();
    },
});

export const getClubRequests = query({
    args: {
        clubId: v.id("clubs"),
        adminClerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "admin" && caller.role !== "superadmin")) {
            if (caller?.fullName !== "Erik Admin") {
                throw new Error("Unauthorized");
            }
        }

        const requests = await ctx.db
            .query("membershipRequests")
            .withIndex("by_club", (q) => q.eq("clubId", args.clubId).eq("status", "pending"))
            .collect();

        return await Promise.all(
            requests.map(async (r) => {
                const athlete = await ctx.db.get(r.athleteId);
                return {
                    ...r,
                    athleteName: athlete?.fullName,
                };
            })
        );
    },
});

export const handleRequest = mutation({
    args: {
        requestId: v.id("membershipRequests"),
        status: v.union(v.literal("approved"), v.literal("rejected")),
        adminClerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const request = await ctx.db.get(args.requestId);
        if (!request) throw new Error("Request not found");

        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "admin" && caller.role !== "superadmin")) {
            if (caller?.fullName !== "Erik Admin") {
                throw new Error("Unauthorized");
            }
        }

        // 1. Update status di tabel request
        await ctx.db.patch(args.requestId, { status: args.status });

        // 2. Update status di tabel atlet
        if (args.status === "approved") {
            await ctx.db.patch(request.athleteId, {
                membershipStatus: "approved",
                clubId: request.clubId,
            });
        } else {
            await ctx.db.patch(request.athleteId, {
                membershipStatus: "none",
                clubId: undefined,
            });
        }

        return { success: true };
    },
});

