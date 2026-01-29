import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new event/series
export const create = mutation({
    args: {
        name: v.string(),
        date: v.string(),
        location: v.string(),
        description: v.string(),
        type: v.union(v.literal("tickets"), v.literal("soon")),
        isBadge: v.optional(v.boolean()),
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

        const { adminClerkId, ...eventData } = args;
        return await ctx.db.insert("events", eventData);
    },
});

// Update an existing event
export const update = mutation({
    args: {
        id: v.id("events"),
        name: v.optional(v.string()),
        date: v.optional(v.string()),
        location: v.optional(v.string()),
        description: v.optional(v.string()),
        type: v.optional(v.union(v.literal("tickets"), v.literal("soon"))),
        isBadge: v.optional(v.boolean()),
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

        const { id, adminClerkId, ...updates } = args;
        await ctx.db.patch(id, updates);
    },
});

// Delete an event
export const remove = mutation({
    args: {
        id: v.id("events"),
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

        await ctx.db.delete(args.id);
    },
});

// List all events (public)
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("events").order("desc").collect();
    },
});

// Get single event details
export const getById = query({
    args: { id: v.id("events") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});
