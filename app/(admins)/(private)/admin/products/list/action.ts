import { prisma } from "@/app/libs/prisma";
export async function getProducts() {
  const products = await prisma.product.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      category: {
        select: {
          name: true,
        },
      },
      unit: {
        select: {
          name: true,
          abbr: true,
        },
      },
      ProductVariant: {
        select: {
          id: true,
          featuredImage: true,
          regularPrice: true,
          sellPrice: true,
          stock: true,
          status: true,
          unitValue: true,
          variantImages: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  });
  return products;
}
