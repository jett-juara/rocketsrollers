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
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("clubs", {
            name: args.name,
            address: args.address,
            city: args.city,
            picName: args.picName,
            picPhone: args.picPhone,
            isVerified: false,
        });
    },
});
