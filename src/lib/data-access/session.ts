import "server-only";

import { auth } from "../auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getAuth = cache(async () => {
    return auth.api.getSession({
        headers: await headers(),
    });
});
