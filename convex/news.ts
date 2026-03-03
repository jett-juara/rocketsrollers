import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/auth";

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
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);

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
    args: { id: v.id("news") },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);
        await ctx.db.delete(args.id);
    },
});
