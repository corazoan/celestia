import { z } from "zod";
import { Prisma } from "@/prisma/generated/prisma/client";

export const addCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});
export const editCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  id: z.string().min(1),
});

export type addCategoryActionState = {
  error: string;
  success: boolean;
};

export type CategoryType = Prisma.CategoryGetPayload<{
  include: {
    _count: {
      select: {
        products: true;
      };
    };
    children: {
      include: {
        _count: {
          select: {
            products: true;
          };
        };
      };
    };
  };
}>;
