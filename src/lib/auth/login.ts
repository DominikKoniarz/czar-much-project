import "server-only";

import type { LoginSchema } from "@/schema/login-schema";
import { auth } from "../auth";
import { ActionError } from "@/types/errors";
import { APIError } from "better-auth/api";

export const loginUser = async (loginData: LoginSchema) => {
    try {
        await auth.api.signInEmail({
            body: {
                email: loginData.email,
                password: loginData.password,
            },
        });
    } catch (error) {
        if (error instanceof APIError) {
            throw new ActionError("Invalid email or password");
        }

        throw new Error("An unexpected error occurred during login");
    }
};
