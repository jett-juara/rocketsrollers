import { QueryCtx, MutationCtx } from "../_generated/server";

/**
 * Get authenticated athlete from Convex auth context.
 * Uses Clerk JWT token - CANNOT be spoofed by client.
 */
export async function getAuthedAthlete(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error("Not authenticated");
    }

    const athlete = await ctx.db
        .query("athletes")
        .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
        .unique();

    if (!athlete) {
        throw new Error("Athlete profile not found");
    }

    return athlete;
}

/**
 * Require admin or superadmin role.
 * Throws if user is not authorized.
 */
export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
    const athlete = await getAuthedAthlete(ctx);

    if (!athlete.role || !["admin", "superadmin"].includes(athlete.role)) {
        throw new Error("Unauthorized: Admin access required");
    }

    return athlete;
}

/**
 * Require superadmin role only.
 * Throws if user is not superadmin.
 */
export async function requireSuperAdmin(ctx: QueryCtx | MutationCtx) {
    const athlete = await getAuthedAthlete(ctx);

    if (athlete.role !== "superadmin") {
        throw new Error("Unauthorized: Superadmin access required");
    }

    return athlete;
}

/**
 * Get authenticated athlete without throwing.
 * Returns null if not authenticated.
 */
export async function getAuthedAthleteOrNull(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        return null;
    }

    return await ctx.db
        .query("athletes")
        .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
        .unique();
}

/**
 * Check if user is admin without throwing.
 * Returns athlete if admin, null otherwise.
 * Use this for queries that need graceful handling of auth timing.
 */
export async function getAdminOrNull(ctx: QueryCtx | MutationCtx) {
    const athlete = await getAuthedAthleteOrNull(ctx);

    if (!athlete) {
        return null;
    }

    if (!athlete.role || !["admin", "superadmin"].includes(athlete.role)) {
        return null;
    }

    return athlete;
}
