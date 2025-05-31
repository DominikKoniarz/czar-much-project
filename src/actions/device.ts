"use server";

import { toggleDeviceUseCase } from "@/lib/device/toggle-device";
import { userActionClient } from "@/lib/safe-action";
import { toggleDeviceSchema } from "@/schema/toggle-device-schema";
import { revalidatePath } from "next/cache";

export const toggleDeviceAction = userActionClient
	.schema(toggleDeviceSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { session } = ctx;
		const { deviceId } = parsedInput;

		await toggleDeviceUseCase(deviceId, session.user.id);

		revalidatePath("/dashboard/devices");
		return { success: true };
	});
