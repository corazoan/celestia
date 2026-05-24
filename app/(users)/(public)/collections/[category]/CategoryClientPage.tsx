"use client";

import { useState } from "react";
import ProductCard from "@/app/components/home/ProductCard";

interface Variant {
  featuredImage: string | null;
  regularPrice: number;
  sellPrice: number;
  unitValue: number;
}

interface Product {
  id: number;
  name: string;
  unit: {
    abbr: string;
    name: string;
  };
  ProductVariant: Variant[];
}

interface ProductCategory {
  product: Product;
}

interface Subcategory {
  name: string;
  productCategories: ProductCategory[];
}

interface CategoryData {
  name: string;
  productCategories: ProductCategory[];
  children: Subcategory[];
}

export default function CategoryClientPage({
  categoryData,
}: {
  categoryData: CategoryData;
}) {
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("All");

  // Combine all products for "All" view
  const allProducts = [
    ...categoryData.productCategories.map((pc) => pc.product),
    ...categoryData.children.flatMap((child) =>
      child.productCategories.map((pc) => pc.product),
    ),
  ];

  // Remove duplicates if any (a product might be in multiple subcategories)
  const uniqueAllProducts = Array.from(
    new Map(allProducts.map((p) => [p.id, p])).values(),
  );

  const displayedProducts =
    selectedCategoryName === "All"
      ? uniqueAllProducts
      : categoryData.children
          .find((child) => child.name === selectedCategoryName)
          ?.productCategories.map((pc) => pc.product) || [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-zinc-950">
      {/* Sidebar - Subcategories */}
      <aside className="w-full md:w-64 border-r border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 overflow-y-auto md:sticky md:top-20 md:h-[calc(100vh-80px)]">
        <div className="p-4 md:p-6">
          <h2 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
            Subcategories
          </h2>
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setSelectedCategoryName("All")}
              className={`px-4 py-2.5 cursor-pointer rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap text-left ${
                selectedCategoryName === "All"
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800/50"
                  : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800/50"
              }`}
            >
              All Products
            </button>
            {categoryData.children.map((child) => (
              <button
                key={child.name}
                onClick={() => setSelectedCategoryName(child.name)}
                className={`px-4 cursor-pointer py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap text-left ${
                  selectedCategoryName === child.name
                    ? "bg-green-50  dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800/50"
                    : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800/50"
                }`}
              >
                {child.name.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content - Product Grid */}
      <main className="flex-1 p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white capitalize tracking-tight">
            {selectedCategoryName === "All"
              ? categoryData.name
              : selectedCategoryName}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">
            {displayedProducts.length} items found
          </p>
        </header>

        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {displayedProducts.map((product) => (
              <div key={product.id} className="flex justify-center">
                <ProductCard
                  name={product.name}
                  image={product.ProductVariant[0]?.featuredImage}
                  unitValue={product.ProductVariant[0]?.unitValue}
                  unitName={product.unit.name}
                  price={product.ProductVariant[0]?.sellPrice}
                  regularPrice={product.ProductVariant[0]?.regularPrice}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 dark:bg-zinc-900 p-6 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-zinc-400 mt-2">
              {/*We couldn't find any products in this category.*/}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
