"use server";

import { enableDeviceAboveProductionUseCase } from "@/lib/device/enable-above";
import { toggleDeviceUseCase } from "@/lib/device/toggle-device";
import { userActionClient } from "@/lib/safe-action";
import { setDeviceEnabledAboveSchema } from "@/schema/set-device-enabled-above-schema";
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

export const setDeviceEnabledAboveProductionAction = userActionClient
    .schema(setDeviceEnabledAboveSchema)
    .action(async ({ ctx, parsedInput }) => {
        const { session } = ctx;

        const updated = await enableDeviceAboveProductionUseCase({
            data: parsedInput,
            userId: session.user.id,
        });

        revalidatePath("/dashboard/devices");
        revalidatePath(`/dashboard/devices/${updated.id}`);

        return { success: true };
    });
