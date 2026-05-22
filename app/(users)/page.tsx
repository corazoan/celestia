"use server";

import { getHomaPageProducts } from "./actions/getProductByCategory";
import ProductCarousel from "@/app/components/home/ProductCarousel";

export default async function Home() {
  const categories = await getHomaPageProducts();

  if (!categories || categories.length === 0) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-400">No products found</h1>
        <p className="text-gray-500 mt-2">
          Check back later for fresh arrivals!
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 bg-white dark:bg-zinc-950 min-h-screen">
      <div className="container mx-auto">
        {categories.map((category) => (
          <div key={category.id}>
            {category.products && category.products.length > 0 && (
              <ProductCarousel
                title={category.name.toUpperCase()}
                products={category.products}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
