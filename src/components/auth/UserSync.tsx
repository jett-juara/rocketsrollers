"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";

export function UserSync() {
    const { user } = useUser();
    const syncUser = useMutation(api.users.syncUser);

    useEffect(() => {
        if (user) {
            syncUser({
                clerkId: user.id,
                email: user.primaryEmailAddress?.emailAddress || "",
                fullName: user.fullName || "",
            });
        }
    }, [user, syncUser]);

    return null;
}
