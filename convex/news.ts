import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("news")
            .order("desc")
            .take(args.limit || 10);
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        category: v.string(),
        image: v.optional(v.string()), // URL or storage ID
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

        return await ctx.db.insert("news", {
            title: args.title,
            content: args.content,
            category: args.category,
            image: args.image,
            publishedDate: Date.now(),
        });
    },
});

export const remove = mutation({
    args: { id: v.id("news"), adminClerkId: v.string() },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "superadmin" && caller.role !== "admin")) {
            throw new Error("Unauthorized");
        }

        await ctx.db.delete(args.id);
    },
});
