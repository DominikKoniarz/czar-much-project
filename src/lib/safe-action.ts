import { env } from "@/env";
import { ActionError } from "@/types/errors";
import { createSafeActionClient } from "next-safe-action";
import { getAuth } from "./data-access/session";
// import { authMiddleware } from "./middleware/auth";

const logActionError = (error: Error) => {
	const log = () =>
		console.log(
			`${new Date().toLocaleString()} Server action error: ${error.message}`,
			error.stack
		);

	const isServerError = () => {
		return !(error instanceof ActionError);
	};

	if (env.NEXT_PUBLIC_IS_DEV) log();

	// Log only server (500) errors in production
	if (env.NEXT_PUBLIC_IS_PROD && isServerError()) log();
};

export const actionClient = createSafeActionClient({
	handleServerError: async (error) => {
		logActionError(error);

		if (error instanceof ActionError) {
			return error.message;
		}

		return "An unexpected error occurred. Please try again later.";
	},
	defaultValidationErrorsShape: "flattened",
});

export const userActionClient = actionClient.use(async ({ next }) => {
	const session = await getAuth();

	if (!session)
		throw new ActionError("You are not allowed to perform this action");

	return next({ ctx: { session } });
});
