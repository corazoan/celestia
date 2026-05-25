import { prisma } from "@/app/libs/prisma";
import { errorHandler, returnHandler } from "@/app/utils/utils";
import { z } from "zod";

export default async function getProductById(id: string) {
  const productId = z.object({
    id: z.coerce.number(),
  });
  const parse = productId.safeParse({ id: id });

  if (!parse.success) return null;

  const [product, productErr] = await prisma.product
    .findUnique({
      where: {
        id: parse.data.id,
      },
      select: {
        id: true,
        name: true,

        unit: {
          select: {
            abbr: true,
          },
        },
        productCategories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
                productCategories: {
                  take: 10,
                  where: {
                    productId: {
                      not: parse.data.id,
                    },
                  },
                  select: {
                    product: {
                      select: {
                        id: true,
                        name: true,
                        unit: {
                          select: {
                            name: true,
                          },
                        },
                        ProductVariant: {
                          take: 1,
                          where: {
                            status: "ACTIVE",
                          },
                          select: {
                            id: true,
                            sellPrice: true,
                            regularPrice: true,
                            featuredImage: true,
                            unitValue: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        ProductVariant: {
          where: {
            status: "ACTIVE",
          },
          select: {
            id: true,
            regularPrice: true,
            sellPrice: true,
            stock: true,
            featuredImage: true,
            unitValue: true,
            description: true,
            variantImages: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (productErr) return null;

  return product;
}
