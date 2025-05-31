"use server";

import { registerUser } from "@/lib/auth/register";
import { actionClient } from "@/lib/safe-action";
import { registerSchema } from "@/schema/register-schema";

export const registerAction = actionClient
	.schema(registerSchema)
	.action(async ({ parsedInput }) => {
		await registerUser(parsedInput);

		return { success: true };
	});
