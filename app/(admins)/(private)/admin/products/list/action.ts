"use server";
import crypto from "crypto";
import { prisma } from "@/app/libs/prisma";
import { getCurrentUser } from "@/app/libs/auth";
import { revalidatePath } from "next/cache";
import { errorHandler, returnHandler } from "@/app/utils/utils";
import { Prisma } from "@/generated/prisma/client";
import { productSchema } from "../add-product/type";
import { prettifyError } from "zod/v4";
import { productVariantSchema } from "./type";
import { env } from "@/app/libs/env";
import { uploadToCloudinary } from "@/app/libs/cloudinary";
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
          regularPrice: true,
          sellPrice: true,
          stock: true,
          status: true,
          unitValue: true,
          featuredImage: true,
          variantImages: {
            select: {
              id: true,
              url: true,
              variantId: true,
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

export type editProductActionState = {
  error: string;
  success: boolean;
};
export async function updateProductVariant(
  initialState: editProductActionState,
  formdata: FormData,
) {
  const parse = productVariantSchema.safeParse(
    Object.fromEntries(formdata.entries()),
  );

  if (!parse.success) {
    return {
      success: false,
      error: prettifyError(parse.error),
    };
  }

  const owner = await getCurrentUser();
  if (!owner || owner.role !== "admin")
    return {
      success: false,
      error: "You don't have permission to perform this action.",
    };

  const data = parse.data;

  const filesToUpload: { key: string; blob: File }[] = [
    { key: "featured-image", blob: parse.data["featuredImage"] as File },
    { key: "gallery-image-1", blob: parse.data["galleryImage1"] as File },
    { key: "gallery-image-2", blob: parse.data["galleryImage2"] as File },
    { key: "gallery-image-3", blob: parse.data["galleryImage3"] as File },
    { key: "gallery-image-4", blob: parse.data["galleryImage4"] as File },
  ].filter(({ blob }) => blob.size > 0);

  const results = await Promise.all(
    filesToUpload.map(async (file) =>
      uploadToCloudinary(file.blob, {
        folder: "product-images",
      }),
    ),
  );

  const uploadedFiles = filesToUpload.map((file, index) => {
    return {
      key: file.key,
      publicId: results[index][0].public_id,
    };
  });

  const featuredImage = uploadedFiles.find(
    ({ key }) => key === "featured-image",
  );
  const galleryImages = uploadedFiles.filter((f) =>
    f.key.startsWith("gallery-image-"),
  );

  const [, resultErr] = await prisma.productVariant
    .update({
      where: {
        id: data.variantId,
      },
      data: {
        regularPrice: data.regularPrice,
        sellPrice: data.sellPrice,
        unitValue: data.unitValue,
        status: data.status,
        stock: data.stock,
        ...(featuredImage?.publicId && {
          featuredImage: featuredImage.publicId,
        }),
        variantImages: {
          deleteMany: {
            variantId: data.variantId,
          },
          create: galleryImages.map((image) => ({ url: image.publicId })),
        },
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (resultErr instanceof Prisma.PrismaClientKnownRequestError) {
    const err = resultErr as Prisma.PrismaClientKnownRequestError;
    if (err.code === "P2002") {
      return {
        success: false,
        error: "Unit with this name or abbreviation already exists",
      };
    }
    return {
      success: false,
      error: "An error occurred while creating the unit",
    };
  }
  if (resultErr) {
    console.error(resultErr);
    return {
      success: false,
      error: "An error occurred while updating the product variant",
    };
  }
  revalidatePath("/admin/products/list");
  return { success: true, error: "" };
}
