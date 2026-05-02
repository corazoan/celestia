/*
  Warnings:

  - You are about to drop the column `productId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `featuredImage` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `regularPrice` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `sellPrice` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `unit_value` on the `products` table. All the data in the column will be lost.
  - Added the required column `featuredImage` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_value` to the `product_variants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_productId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_unit_id_fkey";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "product_variants" ADD COLUMN     "featuredImage" TEXT NOT NULL,
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'draft',
ADD COLUMN     "unit_value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "featuredImage",
DROP COLUMN "productType",
DROP COLUMN "regularPrice",
DROP COLUMN "sellPrice",
DROP COLUMN "status",
DROP COLUMN "stock",
DROP COLUMN "unit_value";

-- DropEnum
DROP TYPE "ProductType";

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;
