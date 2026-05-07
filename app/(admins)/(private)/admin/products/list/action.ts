"use server";
import { prisma } from "@/app/libs/prisma";
import { getCurrentUser } from "@/app/libs/auth";
import { revalidatePath } from "next/cache";
import { errorHandler, returnHandler } from "@/app/utils/utils";
import { Prisma } from "@/prisma/generated/prisma/client";
import { prettifyError } from "zod/v4";
import {
  addProductVariantSchema,
  productEditSchema,
  productVariantSchema,
} from "./type";
import { uploadToCloudinary } from "@/app/libs/cloudinary";
import { ProductWithRelations } from "./type";

export async function getProducts(): Promise<ProductWithRelations[]> {
  const products = await prisma.product.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      categoryId: true,
      unitId: true,
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

export async function updateProduct(
  prevState: editProductActionState,
  data: FormData,
) {
  const parse = productEditSchema.safeParse(Object.fromEntries(data.entries()));
  if (!parse.success) {
    return {
      success: false,
      error: prettifyError(parse.error),
    };
  }
  const { id, name, categoryId, unitId } = parse.data;

  const owner = await getCurrentUser();
  if (!owner || owner.role !== "admin")
    return {
      success: false,
      error: "You don't have permission to perform this action.",
    };

  const [, resultErr] = await prisma.product
    .update({
      where: { id },
      data: {
        name,
        categoryId,
        unitId,
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (resultErr) {
    console.error(resultErr);
    return {
      success: false,
      error: "An error occurred while updating the product",
    };
  }

  revalidatePath("/admin/products/list");
  return { success: true, error: "" };
}

export type editProductActionState = {
  error: string;
  success: boolean;
};

export async function addVariantAction(
  prevState: editProductActionState,
  formData: FormData,
) {
  const parse = addProductVariantSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parse.success) {
    return {
      success: false,
      error: prettifyError(parse.error),
    };
  }

  const data = parse.data;

  const owner = await getCurrentUser();
  if (!owner || owner.role !== "admin") {
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

  for (const [, resultErr] of results) {
    if (resultErr) return { success: false, error: "Failed to upload images." };
  }

  const uploadedFiles = filesToUpload.map((file, index) => ({
    key: file.key,
    publicId: results[index][0].public_id,
    secureUrl: results[index][0].secure_url,
  }));

  const featuredImage = uploadedFiles.find((f) => f.key === "featured-image");
  const galleryImages = uploadedFiles.filter((f) =>
    f.key.startsWith("gallery-image-"),
  );

  const [, insertErr] = await prisma.productVariant
    .create({
      data: {
        productId: data.productId,
        regularPrice: data.regularPrice,
        sellPrice: data.sellPrice,
        stock: data.stock,
        unitValue: data.unitValue,
        status: data.status,
        featuredImage: featuredImage?.publicId || "",
        variantImages: {
          createMany: {
            data: galleryImages.map((galleryImage) => ({
              url: galleryImage.publicId,
            })),
          },
        },
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (insertErr) {
    console.error(insertErr);
    return {
      success: false,
      error: "An error occurred while adding the product variant",
    };
  }

  revalidatePath("/admin/products/list");
  return { success: true, error: "" };
}
export async function deleteProduct(productId: number) {
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

  const [, resultErr] = await prisma.product
    .delete({
      where: {
        id: productId,
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (resultErr) {
    console.error(resultErr);
    return {
      success: false,
      error: "An error occurred while deleting the product",
    };
  }

  revalidatePath("/admin/products/list");
  return { success: true, error: "" };
}
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = {
    regularPrice: data.regularPrice,
    sellPrice: data.sellPrice,
    unitValue: data.unitValue,
    status: data.status,
    stock: data.stock,
  };

  const file = [
    {
      slot: 1,
      init: data.initFeaturedImage,
      key: "featured-image",
      blob: parse.data["featuredImage"] as File,
    },
    {
      slot: 2,
      init: data.initGalleryImage1,
      key: "gallery-image-1",
      blob: parse.data["galleryImage1"] as File,
    },
    {
      slot: 3,
      init: data.initGalleryImage2,
      key: "gallery-image-2",
      blob: parse.data["galleryImage2"] as File,
    },
    {
      slot: 4,
      init: data.initGalleryImage3,
      key: "gallery-image-3",
      blob: parse.data["galleryImage3"] as File,
    },
    {
      slot: 5,
      init: data.initGalleryImage4,
      key: "gallery-image-4",
      blob: parse.data["galleryImage4"] as File,
    },
  ];
  const filesToUpload = file.filter(({ blob }) => blob.size > 0);

  const results = await Promise.all(
    filesToUpload.map(async (file) =>
      uploadToCloudinary(file.blob, {
        folder: "product-images",
      }),
    ),
  );

  for (const [, resultErr] of results) {
    if (resultErr) return { success: false, error: "Failed to upload images." };
  }
  //in dono ka index same hai fileToUpload and Results
  const uploadedFiles = filesToUpload.map((file, index) => {
    return {
      slot: file.slot,
      init: file.init,
      key: file.key,
      publicId: results[index][0].public_id,
    };
  });

  const featuredImage = uploadedFiles.find(
    ({ key }) => key === "featured-image",
  );

  //if new featured image get uploaded then update the url
  if (featuredImage) {
    updateData.featuredImage = featuredImage.publicId;
  }

  const galleryImage1 =
    file[1].blob.size > 0
      ? uploadedFiles.filter((f) => f.key === "gallery-image-1")[0].publicId
      : (file[1].init ?? null);
  const galleryImage2 =
    file[2].blob.size > 0
      ? uploadedFiles.filter((f) => f.key === "gallery-image-2")[0].publicId
      : (file[2].init ?? null);
  const galleryImage3 =
    file[3].blob.size > 0
      ? uploadedFiles.filter((f) => f.key === "gallery-image-3")[0].publicId
      : (file[3].init ?? null);
  const galleryImage4 =
    file[4].blob.size > 0
      ? uploadedFiles.filter((f) => f.key === "gallery-image-4")[0].publicId
      : (file[4].init ?? null);
  const finalGalleryImages = [
    galleryImage1,
    galleryImage2,
    galleryImage3,
    galleryImage4,
  ].filter((image) => image);

  if (finalGalleryImages.length > 0) {
    updateData.variantImages = {
      deleteMany: {},
      create: finalGalleryImages.map((image) => {
        if (image) {
          return { url: image };
        }
      }),
    };
  }

  const [, resultErr] = await prisma.productVariant
    .update({
      where: {
        id: data.variantId,
      },
      data: {
        ...updateData,
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
