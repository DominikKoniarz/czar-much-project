import { env } from "@/env";
import {
	BadRequestError,
	ForbiddenError,
	UnauthorizedError,
} from "@/types/errors";
import { createSafeActionClient } from "next-safe-action";
// import { authMiddleware } from "./middleware/auth";

const logActionError = (error: Error) => {
	// TODO: add logging to files
	const log = () =>
		console.log(
			`${new Date().toLocaleString()} Server action error: ${error.message}`,
			error.stack
		);

	const isServerError = () => {
		return (
			!(error instanceof BadRequestError) &&
			!(error instanceof UnauthorizedError) &&
			!(error instanceof ForbiddenError)
		);
	};

	if (env.NEXT_PUBLIC_IS_DEV) log();

	// Log only server (500) errors in production
	if (env.NEXT_PUBLIC_IS_PROD && isServerError()) log();
};

export const actionClient = createSafeActionClient({
	handleServerError: async (error) => {
		logActionError(error);

		if (error instanceof BadRequestError) {
			return error.message;
		}

		if (error instanceof UnauthorizedError) {
			return error.message;
		}

		if (error instanceof ForbiddenError) {
			return error.message;
		}

		return "An unexpected error occurred. Please try again later.";
	},
	defaultValidationErrorsShape: "flattened",
});

// export const userActionClient = actionClient.use(async ({ next }) => {
//     const [{ allowed, auth }, t] = await Promise.all([
//         authMiddleware(),
//         getTranslations("actions"),
//     ]);

//     if (!allowed) throw new ForbiddenError(t("notAllowed"));

//     return next({ ctx: { auth } });
// });
