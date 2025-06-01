import "server-only";

import { getUserDeviceById, toggleUserDevice } from "../data-access/device";
import { ActionError } from "@/types/errors";

export const toggleDeviceUseCase = async (deviceId: string, userId: string) => {
    const device = await getUserDeviceById({
        userId,
        deviceId,
    });

    if (!device) throw new ActionError("Device not found");

    await toggleUserDevice({
        deviceId,
        userId,
        enabled: !device.enabled,
    });
};
