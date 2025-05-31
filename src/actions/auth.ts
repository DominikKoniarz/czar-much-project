"use server";

import { loginUser } from "@/lib/auth/login";
import { logoutUser } from "@/lib/auth/logout";
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

export const logoutAction = actionClient.action(async () => {
	await logoutUser();

	return { success: true };
});
