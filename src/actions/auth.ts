"use server";

import { loginUser } from "@/lib/auth/login";
import { registerUser } from "@/lib/auth/register";
import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "@/schema/login-schema";
import { registerSchema } from "@/schema/register-schema";

export const registerAction = actionClient
	.schema(registerSchema)
	.action(async ({ parsedInput }) => {
		await registerUser(parsedInput);

		return { success: true };
	});

export const loginAction = actionClient
	.schema(loginSchema)
	.action(async ({ parsedInput }) => {
		await loginUser(parsedInput);

		return { success: true };
	});
