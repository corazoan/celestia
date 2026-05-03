"use client";

import { useState } from "react";
import { Product } from "../type";
import { CldImage } from "next-cloudinary";

export default function ProductRow({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const totalStock = product.ProductVariant.reduce(
    (acc, v) => acc + v.stock,
    0,
  );

  const sellPrices = product.ProductVariant.map((v) => v.sellPrice);
  const minPrice = sellPrices.length > 0 ? Math.min(...sellPrices) : 0;
  const maxPrice = sellPrices.length > 0 ? Math.max(...sellPrices) : 0;

  const priceRange =
    sellPrices.length === 0
      ? "N/A"
      : minPrice === maxPrice
        ? `$${minPrice}`
        : `$${minPrice} - $${maxPrice}`;

  return (
    <>
      <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group border-b border-zinc-100 dark:border-zinc-900">
        <td className="p-4 text-[11px] font-medium text-zinc-400">
          {index + 1}
        </td>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-zinc-100 dark:bg-zinc-900 rounded-none border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {product.ProductVariant[0]?.featuredImage ? (
                <CldImage
                  src={product.ProductVariant[0].featuredImage}
                  width="250"
                  height="250"
                  crop="fill"
                  alt={`${product.name}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[8px] text-zinc-400 uppercase font-bold">
                  No Img
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-tight">
                {product.name}
              </span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-medium">
                {product.category.name}
              </span>
            </div>
          </div>
        </td>
        <td className="p-4 text-[11px] text-zinc-500 uppercase tracking-widest font-medium text-center">
          {product.ProductVariant.length} Variants
        </td>
        <td className="p-4 text-[11px] font-bold text-center">{priceRange}</td>
        <td className="p-4 text-center">
          <span
            className={`text-[11px] font-bold ${
              totalStock < 10
                ? "text-red-500"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {totalStock}
          </span>
        </td>
        <td className="p-4 text-right">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-foreground transition-colors underline underline-offset-4 cursor-pointer flex items-center gap-1 ml-auto"
          >
            {isOpen ? "Hide" : "Show"} Variants
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </td>
      </tr>
      {isOpen && (
        <tr className="bg-zinc-50/50 dark:bg-zinc-900/10">
          <td colSpan={6} className="p-0">
            <div className="p-4 pb-8">
              <div className="border border-zinc-200 dark:border-zinc-800 bg-background overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-900">
                      <th className="p-3 text-[9px] uppercase font-bold text-zinc-400 tracking-widest">
                        Variant Image
                      </th>
                      <th className="p-3 text-[9px] uppercase font-bold text-zinc-400 tracking-widest">
                        Value
                      </th>
                      <th className="p-3 text-[9px] uppercase font-bold text-zinc-400 tracking-widest">
                        Price
                      </th>
                      <th className="p-3 text-[9px] uppercase font-bold text-zinc-400 tracking-widest text-center">
                        Stock
                      </th>
                      <th className="p-3 text-[9px] uppercase font-bold text-zinc-400 tracking-widest">
                        Status
                      </th>
                      <th className="p-3 text-[9px] uppercase font-bold text-zinc-400 tracking-widest text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                    {product.ProductVariant.map((variant) => (
                      <tr
                        key={variant.id}
                        className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors"
                      >
                        <td className="p-3">
                          <div className="size-8 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                            <CldImage
                              src={variant.featuredImage}
                              width="500"
                              height="500"
                              alt="Face with sepia effect"
                              sepia
                            />
                          </div>
                        </td>
                        <td className="p-3 text-[10px] font-bold uppercase tracking-tight">
                          {variant.unitValue} {product.unit.abbr}
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold">
                              ${variant.sellPrice}
                            </span>
                            <span className="text-[8px] text-zinc-400 line-through">
                              ${variant.regularPrice}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`text-[10px] font-bold ${variant.stock < 10 ? "text-red-500" : "text-zinc-600 dark:text-zinc-400"}`}
                          >
                            {variant.stock}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest border ${
                              variant.status === "ACTIVE"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50"
                                : "bg-zinc-100 text-zinc-400 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
                            }`}
                          >
                            {variant.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 hover:text-foreground transition-colors underline underline-offset-4 cursor-pointer">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
