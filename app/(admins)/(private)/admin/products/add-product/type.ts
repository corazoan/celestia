import { blob } from "node:stream/consumers";
import z from "zod/v4";

export type initialState = {
  success: boolean;
  error: string;
};

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

export const productSchema = z.object({
  name: z.string(),
  categoryId: z.coerce.number(),
  unitId: z.coerce.number(),
  unitValue: z.coerce.number(),
  status: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]),
  regularPrice: z.coerce.number(),
  sellPrice: z.coerce.number(),
  stock: z.coerce.number(),
  featuredImage: fileSchema,
  galleryImage1: fileSchema,
  galleryImage2: fileSchema,
  galleryImage3: fileSchema,
  galleryImage4: fileSchema,
});
