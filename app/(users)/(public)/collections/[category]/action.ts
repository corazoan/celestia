"use server";
import { prisma } from "@/app/libs/prisma";
import { errorHandler, returnHandler } from "@/app/utils/utils";
export default async function getProductByCategory(category: string) {
  const [categoryWithProducts, categoryWithProductErr] = await prisma.category
    .findUnique({
      where: {
        slug: category,
      },
      select: {
        name: true,
        productCategories: {
          select: {
            product: {
              select: {
                name: true,
                id: true,
                unit: {
                  select: {
                    abbr: true,
                    name: true,
                  },
                },
                ProductVariant: {
                  select: {
                    featuredImage: true,
                    regularPrice: true,
                    sellPrice: true,
                    unitValue: true,
                  },
                },
              },
            },
          },
        },
        children: {
          select: {
            name: true,
            productCategories: {
              select: {
                product: {
                  select: {
                    name: true,
                    id: true,
                    unit: {
                      select: {
                        abbr: true,
                        name: true,
                      },
                    },
                    ProductVariant: {
                      select: {
                        featuredImage: true,
                        regularPrice: true,
                        sellPrice: true,
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
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (categoryWithProductErr) {
    console.error(categoryWithProductErr);
    return null;
  }

  if (!categoryWithProducts) {
    return null;
  }

  return categoryWithProducts;
}
