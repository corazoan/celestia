-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_variantId_fkey";

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
