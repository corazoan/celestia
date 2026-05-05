import { z } from "zod/v4";

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

export interface Product {
  id: number;
  name: string;
  category: { name: string };
  unit: { name: string; abbr: string };
  ProductVariant: Variant[];
}

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
