"use server";
import { prisma } from "@/app/libs/prisma";
import { getCurrentUser } from "@/app/libs/auth";
import { revalidatePath } from "next/cache";
import { errorHandler, returnHandler } from "@/app/utils/utils";
import { Prisma } from "@/generated/prisma/client";
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

export async function deleteProductVariant(productVariantId: number) {
  const owner = await getCurrentUser();
  if (!owner)
    return {
      success: false,
      error: "You don't have permission to perform this action.",
    };

  if (owner.role !== "admin")
    return {
      success: false,
      error: "You don't have permission to perform this action.",
    };

  const [, resultErr] = await prisma.productVariant
    .delete({
      where: {
        id: productVariantId,
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (resultErr instanceof Prisma.PrismaClientKnownRequestError) {
    const err = resultErr as Prisma.PrismaClientKnownRequestError;

    if (err.code === "P2025") {
      return {
        success: false,
        error: "Product Variant not found",
      };
    }

    return {
      success: false,
      error: "An error occurred while deleting the product variant",
    };
  }

  if (resultErr) {
    console.error(resultErr);
    return {
      success: false,
      error: "An error occurred while deleting the product variant",
    };
  }

  revalidatePath("/admin/products/list");

  return { success: true, error: "" };
}
