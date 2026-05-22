"use server";

import { prisma } from "@/app/libs/prisma";
import { errorHandler, returnHandler } from "@/app/utils/utils";

export async function getHomaPageProducts() {
  const [collection, err] = await prisma.category
    .findMany({
      where: {
        parentId: null,
      },
      select: {
        name: true,
        children: {
          select: {
            name: true,
            products: {
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
        products: {
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
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (err) {
    console.log(err);
    return [];
  }

  return collection;
}

// id: true,
// name: true,
// unit: {
//   select: {
//     name: true,
//   },
// },
// ProductVariant: {
//   take: 1,
//   select: {
//     id: true,
//     sellPrice: true,
//     regularPrice: true,
//     featuredImage: true,
//     unitValue: true,
//   },
// },
// },
