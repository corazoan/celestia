"use server";

import { getHomaPageProducts } from "./actions/getProductByCategory";

export default async function Home() {
  const products = await getHomaPageProducts();
  console.dir(products, { depth: null, color: true });
  return <div>Home</div>;
}
