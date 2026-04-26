/*
  Warnings:

  - You are about to drop the column `variantImages` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `productImages` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE unit_id_seq;
ALTER TABLE "Unit" ALTER COLUMN "id" SET DEFAULT nextval('unit_id_seq');
ALTER SEQUENCE unit_id_seq OWNED BY "Unit"."id";

-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "variantImages";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "productImages";

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt_text" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
