"use client";

import { useState } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import ProductCarousel from "@/app/components/home/ProductCarousel";

interface Variant {
  id: number;
  regularPrice: number;
  sellPrice: number;
  stock: number;
  featuredImage: string;
  unitValue: number;
  description: string | null;
  variantImages: {
    url: string;
  }[];
}

interface Product {
  id: number;
  name: string;
  unit: {
    abbr: string;
  };
  ProductVariant: Variant[];
  productCategories: {
    category: {
      id: number;
      name: string;
      slug: string;
      productCategories: {
        product: {
          id: number;
          name: string;
          unit: {
            name: string;
          };
          ProductVariant: {
            id: number;
            sellPrice: number;
            regularPrice: number;
            featuredImage: string;
            unitValue: number;
          }[];
        };
      }[];
    };
  }[];
}

interface ProductClientPageProps {
  product: Product;
}

export default function ProductClientPage({ product }: ProductClientPageProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.ProductVariant[0],
  );
  const [activeImage, setActiveImage] = useState<string>(
    product.ProductVariant[0].featuredImage,
  );

  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
    setActiveImage(variant.featuredImage);
  };

  const allImages = [
    selectedVariant.featuredImage,
    ...selectedVariant.variantImages.map((img) => img.url),
  ];

  const discount = Math.round(
    ((selectedVariant.regularPrice - selectedVariant.sellPrice) /
      selectedVariant.regularPrice) *
      100,
  );

  console.dir();

  // Flatten similar products from all categories
  const similarProducts = product.productCategories
    .flatMap((pc) => pc.category.productCategories.map((cpc) => cpc.product))
    .filter((p, index, self) => self.findIndex((t) => t.id === p.id) === index);
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 dark:text-zinc-400 mb-6">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-zinc-100 font-medium truncate">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden flex items-center justify-center p-4">
              <CldImage
                src={activeImage}
                width={800}
                height={800}
                alt={product.name}
                className="object-contain w-full h-full"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative size-20 min-w-20 rounded-xl border-2 overflow-hidden transition-all ${
                    activeImage === img
                      ? "border-green-600"
                      : "border-gray-100 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <CldImage
                    src={img}
                    width={150}
                    height={150}
                    alt={`${product.name} thumbnail ${idx}`}
                    className="object-contain w-full h-full p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <span className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-xs font-medium px-2 py-1 rounded">
                {selectedVariant.unitValue} {product.unit.abbr}
              </span>
            </div>

            {/* Variant Selector */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">
                Select Unit
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.ProductVariant.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant)}
                    disabled={variant.stock <= 0}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                      selectedVariant.id === variant.id
                        ? "border-green-600 bg-green-50/50 dark:bg-green-900/10"
                        : "border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700"
                    } ${variant.stock <= 0 ? "opacity-50 cursor-not-allowed grayscale" : "cursor-pointer"}`}
                  >
                    <span className="text-sm font-bold text-gray-900 dark:text-zinc-100">
                      {variant.unitValue} {product.unit.abbr}
                    </span>
                    <span className="text-[13px] text-gray-600 dark:text-zinc-400">
                      ₹{variant.sellPrice}
                    </span>
                    {variant.stock <= 0 && (
                      <span className="text-[10px] text-red-500 font-medium mt-1 uppercase">
                        Out of stock
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing and Action */}
            <div className="mt-auto border-t border-gray-100 dark:border-zinc-800 pt-6">
              <div className="flex items-end gap-3 mb-6">
                <div>
                  <div className="text-sm text-gray-500 dark:text-zinc-400 mb-1">
                    Price
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-zinc-100">
                      ₹{selectedVariant.sellPrice}
                    </span>
                    {selectedVariant.regularPrice >
                      selectedVariant.sellPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ₹{selectedVariant.regularPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-zinc-500 mt-1">
                    (Inclusive of all taxes)
                  </div>
                </div>

                <button
                  disabled={selectedVariant.stock <= 0}
                  className={`ml-auto px-10 py-3.5 rounded-xl text-sm font-bold transition-all ${
                    selectedVariant.stock > 0
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20"
                      : "bg-gray-200 dark:bg-zinc-800 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {selectedVariant.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
                </button>
              </div>

              {/* Trust Section */}
              <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-5 space-y-4 border border-gray-100 dark:border-zinc-800">
                <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 mb-1">
                  Why shop from Celestia?
                </h4>
                <div className="flex items-start gap-3">
                  <div className="size-8 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center border border-gray-100 dark:border-zinc-700 shrink-0">
                    <svg
                      className="size-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-gray-900 dark:text-zinc-100">
                      Superfast Delivery
                    </div>
                    <div className="text-xs text-gray-500 dark:text-zinc-400">
                      Get your order delivered in minutes.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center border border-gray-100 dark:border-zinc-700 shrink-0">
                    <svg
                      className="size-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-gray-900 dark:text-zinc-100">
                      Best Prices & Offers
                    </div>
                    <div className="text-xs text-gray-500 dark:text-zinc-400">
                      Direct from manufacturers to your doorstep.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <ProductCarousel
              title="Similar Products"
              slug={product.productCategories[0]?.category.slug || ""}
              products={similarProducts}
            />
          </div>
        )}

        {/* Product Details Section */}
        <div className="mt-16 md:mt-24 border-t border-gray-100 dark:border-zinc-800 pt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-8">
            Product Details
          </h2>
          <div className="max-w-3xl">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-zinc-400">
              {selectedVariant.description ? (
                <p>{selectedVariant.description}</p>
              ) : (
                <p>
                  No detailed description available for this product variant.
                </p>
              )}
            </div>

            {/* Additional Info Table */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-b border-gray-100 dark:border-zinc-800 pb-3">
                <div className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                  Unit
                </div>
                <div className="text-sm text-gray-900 dark:text-zinc-100 font-medium">
                  {product.unit.abbr}
                </div>
              </div>
              <div className="border-b border-gray-100 dark:border-zinc-800 pb-3">
                <div className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                  Net Quantity
                </div>
                <div className="text-sm text-gray-900 dark:text-zinc-100 font-medium">
                  {selectedVariant.unitValue} {product.unit.abbr}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
