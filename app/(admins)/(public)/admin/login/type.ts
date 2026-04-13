import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  "cf-turnstile-response": z.string().min(1, "Security verification required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
