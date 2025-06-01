import "server-only";

import type { SetDeviceEnabledAboveSchema } from "@/schema/set-device-enabled-above-schema";
import {
	getUserDeviceById,
	setDeviceEnabledAboveProduction,
} from "../data-access/device";
import { ActionError } from "@/types/errors";

export const enableDeviceAboveProductionUseCase = async ({
	data: { enableOnlyAboveProductionKw, deviceId },
	userId,
}: {
	data: SetDeviceEnabledAboveSchema;
	userId: string;
}) => {
	const device = await getUserDeviceById({
		deviceId,
		userId,
	});

	if (!device) throw new ActionError("Device not found");

	return await setDeviceEnabledAboveProduction({
		deviceId: device.id,
		userId: device.userId,
		enableOnlyAboveProductionKw,
	});
};
