"use client";

import { CldImage } from "next-cloudinary";

interface ProductCardProps {
  name: string;
  image: string | null;
  unitValue: string | number;
  unitName: string;
  price: number;
  regularPrice?: number;
}

export default function ProductCard({
  name,
  image,
  unitValue,
  unitName,
  price,
  regularPrice,
}: ProductCardProps) {
  const hasDiscount = regularPrice && regularPrice > price;

  return (
    <div className="flex flex-col border border-gray-100 dark:border-zinc-800 rounded-xl p-3 bg-white dark:bg-zinc-900 w-[180px] min-w-[180px] shadow-sm hover:shadow-md transition-shadow group">
      {/* Image Container */}
      <div className="relative aspect-square mb-3 flex items-center justify-center overflow-hidden">
        {image ? (
          <CldImage
            src={image}
            width={250}
            height={250}
            alt={name}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-50 dark:bg-zinc-800/50 rounded-lg flex items-center justify-center">
            <svg
              className="size-8 text-gray-300 dark:text-zinc-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Time Badge */}
      <div className="flex items-center gap-1.5 mb-2">
        <div className="bg-gray-100 dark:bg-zinc-800 p-0.5 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600 dark:text-zinc-400"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-tight text-gray-700 dark:text-zinc-300">
          15 MINS
        </span>
      </div>

      {/* Product Name */}
      <h3 className="text-[13px] font-bold line-clamp-2 leading-tight mb-1 h-8 text-gray-800 dark:text-zinc-100">
        {name}
      </h3>

      {/* Unit */}
      <p className="text-[12px] text-gray-500 dark:text-zinc-400 mb-4">
        {unitValue} {unitName}
      </p>

      {/* Price and Add Button */}
      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold text-[14px] text-gray-900 dark:text-white">
          ₹{price}
        </span>
        <button className="border border-green-600 text-green-600 bg-white dark:bg-transparent px-5 py-1.5 rounded-lg text-[12px] font-bold hover:bg-green-600 hover:text-white transition-all duration-200">
          ADD
        </button>
      </div>
    </div>
  );
}
