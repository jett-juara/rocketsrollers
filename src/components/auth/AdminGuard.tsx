"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useConvexAuth } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface AdminGuardProps {
    children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
    const { user, isLoaded } = useUser();
    const { isAuthenticated: isConvexAuthenticated, isLoading: isConvexLoading } = useConvexAuth();
    const router = useRouter();

    // Only run queries when BOTH Clerk AND Convex auth are ready
    const isReady = isLoaded && !!user && isConvexAuthenticated && !isConvexLoading;

    const athlete = useQuery(api.clubs.getAthleteByUserId,
        isReady ? { userId: user.id } : "skip"
    );

    useEffect(() => {
        if (isReady && athlete !== undefined) {
            const isAdmin = athlete?.role === "superadmin" || athlete?.role === "admin";
            if (!isAdmin) {
                router.push("/");
            }
        }
    }, [isReady, athlete, router]);

    if (!isReady || athlete === undefined) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-heading tracking-[0.3em] animate-pulse uppercase text-sm">
                Authenticating Admin...
            </div>
        );
    }

    const isAdmin = athlete?.role === "superadmin" || athlete?.role === "admin";
    if (!isAdmin) return null;

    return <>{children}</>;
}
