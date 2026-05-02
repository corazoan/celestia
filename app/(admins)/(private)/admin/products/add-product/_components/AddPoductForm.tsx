"use client";
import CategoriesInput from "./CategoriesInput";
import ImageInput from "./ImageInput";
import UnitsInput from "./UnitsInput";
import { useActionState } from "react";
import { addProductAction } from "../action";

const initialState = { error: "", success: false };
type Categories = {
  name: string;
  id: number;
  slug: string;
  _count: {
    products: number;
  };
}[];

type Units = {
  name: string;
  id: number;
  _count: {
    products: number;
  };
  abbr: string;
}[];

export function AddProductForm({
  categories,
  units,
}: {
  categories: Categories;
  units: Units;
}) {
  const [state, action, pending] = useActionState(
    addProductAction,
    initialState,
  );
  return (
    <form className="space-y-8 pb-24" method="POST" action={action}>
      {(state.error || state.success) && (
        <div
          className={`p-4 text-xs font-bold uppercase tracking-widest ${
            state.success
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20"
              : "bg-red-50 text-red-600 dark:bg-red-950/20"
          }`}
        >
          {state.success ? "Product added successfully!" : state.error}
        </div>
      )}
      {/* Section 1: Basic Info */}
      <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-900">
          01. Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="e.g. Essential Oversized Tee"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-zinc-500"
            />
          </div>
          <CategoriesInput categories={categories} />
          <UnitsInput units={units} />
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Unit Value
            </label>
            <input
              name="unitValue"
              type="number"
              placeholder="e.g. 500"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-zinc-500 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Status
            </label>
            <div className="relative">
              <select
                name="status"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 focus:outline-none focus:border-foreground transition-colors appearance-none cursor-pointer pr-10 uppercase font-bold tracking-widest text-xs"
              >
                <option value="DRAFT">Draft</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Pricing & Inventory */}
      <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-900">
          02. Pricing & Stock
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Regular Price ($)
            </label>
            <input
              name="regularPrice"
              type="number"
              placeholder="0.00"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-zinc-500 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Sale Price ($)
            </label>
            <input
              name="sellPrice"
              type="number"
              placeholder="0.00"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-zinc-500 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Stock Quantity
            </label>
            <input
              name="stock"
              type="number"
              placeholder="0"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-zinc-500 font-bold"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Media */}
      <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-900">
          03. Visual Media
        </h2>
        <div className="space-y-6">
          <ImageInput
            name="featuredImage"
            label="Featured Image"
            className="max-w-50"
          />
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Gallery Images
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <ImageInput key={i} name={`galleryImage${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar (Sticky Footer) */}
      <div className="fixed bottom-0 left-64 right-0 bg-background/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 p-4 flex justify-end gap-4 z-30">
        <button
          type="button"
          className="px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-foreground transition-colors"
        >
          Discard Changes
        </button>
        <button
          disabled={pending}
          type="submit"
          className="bg-foreground text-background px-12 py-3 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          {pending ? "Processing..." : "Publish Product"}
        </button>
      </div>
    </form>
  );
}
