"use server";
import { prettifyError } from "zod/v4";
import { initialState, productSchema } from "./type";
import { getCurrentUser } from "@/app/libs/auth";
import { uploadToCloudinary } from "@/app/libs/cloudinary";
import { prisma } from "@/app/libs/prisma";
import { Prisma } from "@/generated/prisma/client";
import { errorHandler, returnHandler } from "@/app/utils/utils";

export async function addProductAction(
  initialState: initialState,
  data: FormData,
) {
  const parse = productSchema.safeParse(Object.fromEntries(data.entries()));
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

  const filesToUpload: { key: string; blob: Blob }[] = [
    { key: "featured-image", blob: parse.data["featuredImage"] as Blob },
    { key: "gallery-image-1", blob: parse.data["galleryImage1"] as Blob },
    { key: "gallery-image-2", blob: parse.data["galleryImage2"] as Blob },
    { key: "gallery-image-3", blob: parse.data["galleryImage3"] as Blob },
    { key: "gallery-image-4", blob: parse.data["galleryImage4"] as Blob },
  ];

  const results = await Promise.all([
    ...filesToUpload.map(async (file) =>
      uploadToCloudinary(Buffer.from(await file.blob.arrayBuffer()), {
        folder: "product-images",
      }),
    ),
  ]);

  for (const [, resultErr] of results) {
    if (resultErr) return { success: false, error: "Failed to upload images." };
  }

  const [
    featuredImage,
    galleryImage1,
    galleryImage2,
    galleryImage3,
    galleryImage4,
  ] = results.map((result) => result[0].secure_url);

  const [, productErr] = await prisma.product
    .create({
      data: {
        name: product.name,
        categoryId: product.categoryId,
        unitId: product.unitId,
        ProductVariant: {
          create: {
            regularPrice: product.regularPrice,
            sellPrice: product.sellPrice,
            stock: product.stock,
            unitValue: product.unitValue,
            status: product.status,
            featuredImage,
            variantImages: {
              createMany: {
                data: [
                  { url: galleryImage1 },
                  { url: galleryImage2 },
                  { url: galleryImage3 },
                  { url: galleryImage4 },
                ],
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

  return { success: true, error: "" };
}
