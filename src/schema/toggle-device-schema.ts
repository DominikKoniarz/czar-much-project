import { z } from "zod";

export const toggleDeviceSchema = z.object({
    deviceId: z.string().min(1, "Device ID is required"),
});

export type ToggleDeviceSchema = z.infer<typeof toggleDeviceSchema>;
