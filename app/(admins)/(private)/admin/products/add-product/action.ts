"use server";
import { prettifyError } from "zod/v4";
import { initialState, productSchema } from "./type";
import { getCurrentUser } from "@/app/libs/auth";
import { uploadToCloudinary } from "@/app/libs/cloudinary";
import { prisma } from "@/app/libs/prisma";
import { Prisma } from "@/prisma/generated/prisma/client";

import { errorHandler, returnHandler } from "@/app/utils/utils";

export async function addProductAction(
  initialState: initialState,
  data: FormData,
) {
  const rawData = {
    name: data.get("name"),
    categoryIds: data.getAll("categoryIds").map((id) => parseInt(id as string)),
    unitId: parseInt(data.get("unitId") as string),
    unitValue: parseFloat(data.get("unitValue") as string),
    status: data.get("status"),
    regularPrice: parseFloat(data.get("regularPrice") as string),
    sellPrice: parseFloat(data.get("sellPrice") as string),
    stock: parseInt(data.get("stock") as string),
    featuredImage: data.get("featuredImage"),
    galleryImage1: data.get("galleryImage1"),
    galleryImage2: data.get("galleryImage2"),
    galleryImage3: data.get("galleryImage3"),
    galleryImage4: data.get("galleryImage4"),
  };
  console.dir(rawData, { depth: null, color: true });
  const parse = productSchema.safeParse(rawData);
  console.log("parsing now");
  if (!parse.success) {
    console.log("parse error", parse.error);
    return { success: false, error: prettifyError(parse.error) };
  }

  const product = parse.data;

  const owner = await getCurrentUser();
  if (!owner) {
    console.log("no owner");
    return {
      success: false,
      error: "You don’t have permission to perform this action.",
    };
  }

  if (owner.role !== "admin") {
    console.log("not admin");
    return {
      success: false,
      error: "You don't have permission to perform this action.",
    };
  }

  const filesToUpload: { key: string; blob: File }[] = [
    { key: "featured-image", blob: parse.data["featuredImage"] as File },
    { key: "gallery-image-1", blob: parse.data["galleryImage1"] as File },
    { key: "gallery-image-2", blob: parse.data["galleryImage2"] as File },
    { key: "gallery-image-3", blob: parse.data["galleryImage3"] as File },
    { key: "gallery-image-4", blob: parse.data["galleryImage4"] as File },
  ].filter((file) => file.blob.size > 0);

  const results = await Promise.all(
    filesToUpload.map(async (file) =>
      uploadToCloudinary(file.blob, {
        folder: "product-images",
      }),
    ),
  );

  // Check for errors
  for (const [, resultErr] of results) {
    if (resultErr) return { success: false, error: "Failed to upload images." };
  }

  // Map results back to their original keys with public_id
  const uploadedFiles = filesToUpload.map((file, index) => ({
    key: file.key,
    publicId: results[index][0].public_id,
    secureUrl: results[index][0].secure_url,
  }));

  const featuredImage = uploadedFiles.find((f) => f.key === "featured-image");
  const galleryImages = uploadedFiles.filter((f) =>
    f.key.startsWith("gallery-image-"),
  );

  const [, productErr] = await prisma.product
    .create({
      data: {
        name: product.name,
        unitId: product.unitId,
        categories: {
          create: product.categoryIds.map((category) => ({
            categoryId: category,
          })),
        },
        ProductVariant: {
          create: {
            regularPrice: product.regularPrice,
            sellPrice: product.sellPrice,
            stock: product.stock,
            unitValue: product.unitValue,
            status: product.status,
            featuredImage: featuredImage?.publicId || "",
            variantImages: {
              createMany: {
                data: galleryImages.map((image) => ({ url: image.publicId })),
              },
            },
          },
        },
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (productErr instanceof Prisma.PrismaClientKnownRequestError) {
    const err = productErr as Prisma.PrismaClientKnownRequestError;
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

  if (productErr) {
    console.error(productErr);
    return {
      success: false,
      error: "An error occurred while updating the product variant",
    };
  }

  return { success: true, error: "" };
}
