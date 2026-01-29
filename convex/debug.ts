import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllAthletes = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("athletes").collect();
    },
});

export const fixUserRole = mutation({
    args: { userId: v.string(), role: v.string() },
    handler: async (ctx, args) => {
        const athlete = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .unique();
        if (athlete) {
            await ctx.db.patch(athlete._id, { role: args.role as any });
            return { success: true, id: athlete._id };
        }
        return { success: false, message: "Athlete not found" };
    },
});
