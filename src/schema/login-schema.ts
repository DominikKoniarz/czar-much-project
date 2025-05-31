import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Valid password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
