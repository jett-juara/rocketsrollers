import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/auth";

export const getLandingData = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("landingPage").first();
    },
});

export const updateLandingData = mutation({
    args: {
        id: v.optional(v.id("landingPage")),
        heroTitle: v.string(),
        heroSlogan: v.string(),
        heroEventInfo: v.string(),
        heroBgUrl: v.optional(v.string()),
        primaryCtaLabel: v.string(),
        primaryCtaLink: v.string(),
        secondaryCtaLabel: v.string(),
        secondaryCtaLink: v.string(),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);

        const { id, ...data } = args;

        if (id) {
            await ctx.db.patch(id, data);
            return id;
        } else {
            return await ctx.db.insert("landingPage", data);
        }
    },
});

export const getFeaturedEvents = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("events").filter(q => q.eq(q.field("isBadge"), true)).collect();
    }
});

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        await requireAdmin(ctx);
        return await ctx.storage.generateUploadUrl();
    },
});

export const getLatestNews = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("news")
            .order("desc")
            .take(args.limit || 4);
    },
});
