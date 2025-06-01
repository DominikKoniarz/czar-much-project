import { z } from "zod";

export const setDeviceEnabledAboveSchema = z.object({
	deviceId: z.string().min(1, "Device ID is required"),
	enableOnlyAboveProductionKw: z.number().min(0, "Value must be at least 0"),
});

export type SetDeviceEnabledAboveSchema = z.infer<
	typeof setDeviceEnabledAboveSchema
>;
