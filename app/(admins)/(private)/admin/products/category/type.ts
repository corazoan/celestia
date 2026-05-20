import { z } from "zod";
import { Prisma } from "@/prisma/generated/prisma/client";

export const addCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  parentId: z.coerce.number(),
});
export const editCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  id: z.string().min(1),
  parentId: z.coerce.number().gte(0),
});

export type addCategoryActionState = {
  error: string;
  success: boolean;
};

export type CategoryType = {
  totalProducts: number;
} & Category;

export type Category = Prisma.CategoryGetPayload<{
  select: {
    name: true;
    slug: true;
    id: true;
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

export type SubCategory = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    parent: {
      select: {
        name: true;
      };
    };
    name: true;
    slug: true;
    _count: {
      select: {
        products: true;
      };
    };
  };
}>;
