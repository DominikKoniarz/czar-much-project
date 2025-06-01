import "server-only";

import { auth } from "../auth";
import { headers } from "next/headers";
import { ActionError } from "@/types/errors";

export const logoutUser = async () => {
    const { success } = await auth.api.signOut({
        headers: await headers(),
    });

    if (!success) {
        throw new ActionError("Failed to log out");
    }
};
