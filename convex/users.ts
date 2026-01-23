import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const syncUser = mutation({
    args: {
        clerkId: v.string(),
        email: v.string(),
        fullName: v.string(),
        birthDate: v.optional(v.string()),
        gender: v.optional(v.union(v.literal("male"), v.literal("female"))),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.clerkId))
            .unique();

        // Logika penentuan role (Role user standar)
        const designatedRole = args.email === "jettjuara@gmail.com" ? "superadmin" : "user";

        if (!existingUser) {
            await ctx.db.insert("athletes", {
                fullName: args.fullName,
                birthDate: args.birthDate || "2000-01-01",
                gender: args.gender || "male",
                membershipStatus: "none",
                userId: args.clerkId,
                role: designatedRole,
            });
        } else {
            // Jika sudah ada, update datanya (untuk alur complete-profile)
            const patch: any = { fullName: args.fullName };
            if (args.birthDate) patch.birthDate = args.birthDate;
            if (args.gender) patch.gender = args.gender;

            // Selalu pastikan jettjuara tetep superadmin kalau dia re-sync
            if (args.email === "jettjuara@gmail.com") patch.role = "superadmin";

            await ctx.db.patch(existingUser._id, patch);
        }
    },
});

export const updateMembershipStatus = mutation({
    args: {
        athleteId: v.id("athletes"),
        status: v.union(v.literal("none"), v.literal("private"), v.literal("pending"), v.literal("approved")),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.athleteId, {
            membershipStatus: args.status,
        });
    },
});
