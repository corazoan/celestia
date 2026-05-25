"use server";

import getProductById from "./action";
import ProductClientPage from "./ProductClientPage";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productName: string; id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // @ts-expect-error - ProductVariant type mismatch from prisma select
  return <ProductClientPage product={product} />;
}
