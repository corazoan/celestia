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
        ProductVariant: {
          some: {
            status: "ACTIVE",
          },
        },
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
                    product: {
                      ProductVariant: {
                        some: {
                          status: "ACTIVE",
                        },
                      },
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
                            status: true,
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
            status: true,
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

  // console.dir(product, { depth: null, color: true });
  if (productErr) return null;

  return product;
}
