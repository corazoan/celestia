"use server";

import getProductById from "./action";
import ProductClientPage from "./ProductClientPage";
import { notFound } from "next/navigation";
export const add = () => {
  console.log(2 + 3);
};
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
  add();
  return <ProductClientPage product={product} />;
}
