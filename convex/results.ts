import { query } from "./_generated/server";
import { v } from "convex/values";

export const getLatestResults = query({
    args: { limit: v.number() },
    handler: async (ctx, args) => {
        const results = await ctx.db
            .query("results")
            .order("desc")
            .take(args.limit);

        const resultsWithDetails = await Promise.all(
            results.map(async (result) => {
                const athlete = await ctx.db.get(result.athleteId);
                const club = athlete?.clubId ? await ctx.db.get(athlete.clubId) : null;

                return {
                    ...result,
                    athleteName: athlete?.fullName || "Unknown",
                    clubName: club?.name || "PRIVAT",
                };
            })
        );

        return resultsWithDetails;
    },
});
