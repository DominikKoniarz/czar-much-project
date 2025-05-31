import "server-only";

import type { RegisterSchema } from "@/schema/register-schema";
import { auth } from "../auth";
import { ActionError } from "@/types/errors";
import { APIError } from "better-auth/api";
import { getUserByEmail } from "../data-access/user";

export const registerUser = async (registerData: RegisterSchema) => {
    const existingUser = await getUserByEmail(registerData.email);

    if (existingUser) {
        throw new ActionError("User already exists with this email");
    }

    try {
        await auth.api.signUpEmail({
            body: {
                email: registerData.email,
                password: registerData.password,
                name: registerData.email, // Using email as name for simplicity
            },
        });
    } catch (error) {
        if (error instanceof APIError) {
            throw new ActionError("Sign up failed");
        }

        throw new Error("An unexpected error occurred during registration");
    }
};
