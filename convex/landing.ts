import { query } from "./_generated/server";
import { v } from "convex/values";

export const getLatestNews = query({
    args: { limit: v.number() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("news")
            .order("desc")
            .take(args.limit);
    },
});

export const getFeaturedEvents = query({
    args: {},
    handler: async (ctx) => {
        // Fetch all events for the series section
        return await ctx.db.query("events").collect();
    },
});
