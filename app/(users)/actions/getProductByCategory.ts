"use server";

import { prisma } from "@/app/libs/prisma";
import { errorHandler, returnHandler } from "@/app/utils/utils";

export async function getHomaPageProducts() {
  // i want only category that have children with product or it's own product and not the category that have parent
  const [collection, err] = await prisma.category
    .findMany({
      where: {
        AND: [
          { parentId: null },

          {
            OR: [
              {
                children: {
                  some: {
                    productCategories: {
                      some: {},
                    },
                  },
                },
              },
              {
                productCategories: {
                  some: {},
                },
              },
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        children: {
          where: {
            productCategories: {
              some: {},
            },
          },
          select: {
            name: true,
            productCategories: {
              take: 10,
              where: {
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
        productCategories: {
          where: {
            product: {
              ProductVariant: {
                some: {
                  status: "ACTIVE",
                },
              },
            },
          },
          take: 10,
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
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (err) {
    console.log(err);
    return [];
  }

  const filterCollection = collection.map((category) => {
    return {
      name: category.name,
      id: category.id,
      slug: category.slug,
      products: getUniqueProductsForCategory(category),
    };
  });
  // console.dir(filterCollection, { depth: null, color: true });
  return filterCollection;
}

function getUniqueProductsForCategory(category: {
  id: number;
  name: string;
  slug: string;
  children: {
    name: string;
    productCategories: {
      product: {
        id: number;
        name: string;
        unit: {
          name: string;
        };
        ProductVariant: {
          id: number;
          featuredImage: string;
          regularPrice: number;
          sellPrice: number;
          unitValue: number;
        }[];
      };
    }[];
  }[];
  productCategories: {
    product: {
      id: number;
      name: string;
      unit: {
        name: string;
      };
      ProductVariant: {
        id: number;
        featuredImage: string;
        regularPrice: number;
        sellPrice: number;
        unitValue: number;
      }[];
    };
  }[];
}) {
  const uniqueProducts = new Map();

  // 1. Add direct products (if any)
  category.productCategories.forEach((item) => {
    uniqueProducts.set(item.product.id, item.product);
  });

  // 2. Add subcategory products
  category.children.forEach((subCategory) => {
    subCategory.productCategories.forEach((item) => {
      // The Map automatically overwrites duplicates based on the product ID
      uniqueProducts.set(item.product.id, item.product);
    });
  });

  // Convert the Map back to an array
  return Array.from(uniqueProducts.values());
}
