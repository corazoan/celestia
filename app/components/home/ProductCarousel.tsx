"use client";

import { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  unit: {
    name: string;
  };
  ProductVariant: {
    id: number;
    sellPrice: number;
    regularPrice: number;
    featuredImage: string | null;
    unitValue: number;
  }[];
}

interface ProductCarouselProps {
  title: string;
  slug: string;
  products: Product[];
}

export default function ProductCarousel({
  title,
  products,
  slug,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 max-w-350 mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-5 px-5 md:px-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
          {title}
        </h2>
        <Link
          href={`/collections/${slug}`}
          className="text-green-600 font-bold text-sm md:text-base hover:text-green-700 transition-colors"
        >
          see all
        </Link>
      </div>

      <div className="relative group px-5 md:px-10">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 shadow-xl rounded-full p-2.5 z-20 border border-gray-100 dark:border-zinc-700 hover:scale-110 transition-transform hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-proximity pb-4 -mx-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((item) => (
            <div key={item.id} className="snap-start">
              <ProductCard
                id={item.id}
                name={item.name}
                image={item.ProductVariant[0]?.featuredImage}
                unitValue={item.ProductVariant[0]?.unitValue}
                unitName={item.unit.name}
                price={item.ProductVariant[0]?.sellPrice}
                regularPrice={item.ProductVariant[0]?.regularPrice}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 shadow-xl rounded-full p-2.5 z-20 border border-gray-100 dark:border-zinc-700 hover:scale-110 transition-transform hidden md:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
