import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Fungsi untuk promosi user menjadi admin
// Hanya bisa dipanggil oleh Superadmin
export const promoteToAdmin = mutation({
    args: {
        targetAthleteId: v.id("athletes"),
        adminClerkId: v.string(), // ID Superadmin yang memanggil
    },
    handler: async (ctx, args) => {
        // 1. Verifikasi pemanggil adalah Superadmin
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || caller.role !== "superadmin") {
            throw new Error("Unauthorized: Hanya Superadmin yang bisa mengangkat Admin baru.");
        }

        // 2. Update role target
        await ctx.db.patch(args.targetAthleteId, {
            role: "admin",
        });

        return { success: true, message: "User berhasil diangkat menjadi Admin." };
    },
});

// List semua user untuk dashboard management
export const getAllUsers = query({
    args: { adminClerkId: v.string() },
    handler: async (ctx, args) => {
        const caller = await ctx.db
            .query("athletes")
            .withIndex("by_userId", (q) => q.eq("userId", args.adminClerkId))
            .unique();

        if (!caller || (caller.role !== "superadmin" && caller.role !== "admin")) {
            throw new Error("Unauthorized: Akses dashboard manajemen ditolak.");
        }

        return await ctx.db.query("athletes").collect();
    },
});
