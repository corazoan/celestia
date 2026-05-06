import { z } from "zod/v4";
import { Prisma } from "@/prisma/generated/prisma/client";
export interface Variant {
  id: number;
  stock: number;
  featuredImage: string;
  regularPrice: number;
  sellPrice: number;
  unitValue: number;
  status: "DRAFT" | "ACTIVE" | "INACTIVE";
  variantImages: {
    id: string;
    url: string;
    variantId: number;
  }[];
}

export const productEditSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  categoryId: z.coerce.number(),
  unitId: z.coerce.number(),
});

export type ProductWithRelations = Prisma.ProductGetPayload<{
  select: {
    id: true;
    name: true;
    categoryId: true;
    unitId: true;
    category: {
      select: {
        name: true;
      };
    };
    unit: {
      select: {
        name: true;
        abbr: true;
      };
    };
    ProductVariant: {
      select: {
        id: true;
        regularPrice: true;
        sellPrice: true;
        stock: true;
        status: true;
        unitValue: true;
        featuredImage: true;
        variantImages: {
          select: {
            id: true;
            url: true;
            variantId: true;
          };
        };
      };
    };
  };
}>;

export type CategoryType = Prisma.CategoryGetPayload<{
  select: {
    _count: {
      select: {
        products: true;
      };
    };
    name: true;
    slug: true;
    id: true;
  };
}>;

export type UnitType = Prisma.UnitGetPayload<{
  select: {
    _count: {
      select: {
        products: true;
      };
    };
    name: true;
    abbr: true;
    id: true;
  };
}>;

const fileSchema = z.custom(
  (file) => {
    if (!file) return false;
    if (typeof file === "string") return false;

    const blobLike = file as { size?: number; type?: string; name?: string };
    if (blobLike.size === 0) return true;
    return (
      typeof blobLike.size === "number" &&
      blobLike.size <= 5000000 &&
      typeof blobLike.type === "string" &&
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        blobLike.type,
      )
    );
  },
  { message: "Invalid file. Max size 5MB and must be .jpg/.jpeg/.png/.webp" },
);
export const productVariantSchema = z.object({
  variantId: z.coerce.number(),
  stock: z.coerce.number(),
  regularPrice: z.coerce.number(),
  sellPrice: z.coerce.number(),
  unitValue: z.coerce.number(),
  status: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]),
  initFeaturedImage: z.string().optional(),
  initGalleryImage1: z.string().optional(),
  initGalleryImage2: z.string().optional(),
  initGalleryImage3: z.string().optional(),
  initGalleryImage4: z.string().optional(),
  featuredImage: fileSchema,
  galleryImage1: fileSchema,
  galleryImage2: fileSchema,
  galleryImage3: fileSchema,
  galleryImage4: fileSchema,
});

export const addProductVariantSchema = z.object({
  productId: z.coerce.number(),
  stock: z.coerce.number(),
  regularPrice: z.coerce.number(),
  sellPrice: z.coerce.number(),
  unitValue: z.coerce.number(),
  status: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]),
  featuredImage: fileSchema,
  galleryImage1: fileSchema,
  galleryImage2: fileSchema,
  galleryImage3: fileSchema,
  galleryImage4: fileSchema,
});
