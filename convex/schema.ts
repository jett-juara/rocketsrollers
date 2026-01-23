import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    clubs: defineTable({
        name: v.string(),
        address: v.string(),
        city: v.optional(v.string()),
        logo: v.optional(v.string()), // storage ID
        picName: v.string(),
        picPhone: v.string(),
        isVerified: v.boolean(),
        establishedDate: v.optional(v.string()),
    }).index("by_name", ["name"]),

    athletes: defineTable({
        fullName: v.string(),
        birthDate: v.string(), // ISO format
        gender: v.union(v.literal("male"), v.literal("female")),
        clubId: v.optional(v.id("clubs")), // if null, linked to "PRIVAT" logic
        membershipStatus: v.union(v.literal("none"), v.literal("private"), v.literal("pending"), v.literal("approved")),
        photo: v.optional(v.string()), // storage ID
        userId: v.string(), // Clerk/Auth ID
        role: v.union(v.literal("superadmin"), v.literal("admin"), v.literal("user")),
    }).index("by_userId", ["userId"]).index("by_clubId", ["clubId"]).index("by_role", ["role"]),

    news: defineTable({
        title: v.string(),
        content: v.string(),
        image: v.optional(v.string()),
        publishedDate: v.number(), // timestamp
    }),

    events: defineTable({
        name: v.string(),
        date: v.string(),
        location: v.string(),
        description: v.string(),
    }),

    registrations: defineTable({
        athleteId: v.id("athletes"),
        eventId: v.id("events"),
        category: v.union(v.literal("Pemula"), v.literal("Standard"), v.literal("Speed")),
        events: v.array(v.string()), // list of sub-events
        status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    }).index("by_event", ["eventId"]).index("by_athlete", ["athleteId"]),

    membershipRequests: defineTable({
        athleteId: v.id("athletes"),
        clubId: v.id("clubs"),
        status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    }).index("by_club", ["clubId", "status"]),

    results: defineTable({
        athleteId: v.id("athletes"),
        eventId: v.id("events"),
        category: v.string(),
        subEvent: v.string(),
        score: v.string(), // "45.23s" or "100"
        rank: v.number(),
    }).index("by_event", ["eventId"]).index("by_athlete", ["athleteId"]),
});
