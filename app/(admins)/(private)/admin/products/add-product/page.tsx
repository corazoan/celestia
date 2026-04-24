import { getCategories } from "../category/action";
import CategoriesInput from "./_components/CategoriesInput";
import ImageInput from "./_components/ImageInput";

export default async function AddProductPage() {
  const categories = await getCategories();

  return (
    <div className="p-8 flex-1 overflow-auto bg-zinc-50/50 dark:bg-zinc-950/20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Inventory Management
          </p>
          <h1 className="text-4xl font-bold tracking-tighter mt-1 italic uppercase">
            Create New Product
          </h1>
        </div>

        <form className="space-y-8 pb-24">
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
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Product Type
                </label>
                <div className="relative">
                  <select
                    name="productType"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors appearance-none cursor-pointer pr-10 uppercase font-bold tracking-widest text-xs"
                  >
                    <option value="SINGLE">Single Product</option>
                    <option value="VARIANT">Variable Product</option>
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
                className="max-w-[200px]"
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
              type="submit"
              className="bg-foreground text-background px-12 py-3 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
