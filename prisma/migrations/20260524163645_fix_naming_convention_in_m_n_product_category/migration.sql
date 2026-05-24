/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,productId]` on the table `categories_on_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_on_products_categoryId_productId_key" ON "categories_on_products"("categoryId", "productId");
