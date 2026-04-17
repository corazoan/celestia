import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

export type addCategoryActionState = {
  error: string;
  success: boolean;
};
