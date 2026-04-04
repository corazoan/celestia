import { z } from "zod";

export const verifyTokenSchema = z.object({
  email: z.email(),
  token: z.string().min(1),
});
