"use client";
import { useState } from "react";
import { SubCategory } from "../../category/type";

export default function CategoriesInput({
  categories,
}: {
  categories: SubCategory[];
}) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    if (value && !selectedCategoryIds.includes(value)) {
      setSelectedCategoryIds((prev) => [...prev, value]);
    }
    // Reset select to placeholder
    e.target.value = "";
  };

  const removeCategory = (id: number) => {
    setSelectedCategoryIds((prev) => prev.filter((catId) => catId !== id));
  };

  return (
    <div className="space-y-2 md:col-span-2">
      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
        Categories
      </label>

      {/* Chips Display Area */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedCategoryIds.length === 0 && (
          <div className="w-full py-3 px-4 border border-dashed border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400 uppercase font-bold tracking-widest">
            No categories selected
          </div>
        )}
        {selectedCategoryIds.map((id) => {
          const category = categories.find((c) => c.id === id);
          if (!category) return null;
          return (
            <div
              key={id}
              className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 transition-colors group"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                {category.name}
              </span>
              <button
                type="button"
                onClick={() => removeCategory(id)}
                className="text-zinc-400 hover:text-red-500 cursor-pointer transition-colors"
                title="Remove category"
              >
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              {/* Hidden input to pass the ID to the form action */}
              <input type="hidden" name="categoryIds" value={id} />
            </div>
          );
        })}
      </div>

      <div className="relative">
        <select
          onChange={handleSelect}
          value=""
          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 focus:outline-none focus:border-foreground transition-colors appearance-none cursor-pointer pr-10 uppercase font-bold tracking-widest text-xs"
        >
          <option value="" disabled>
            Add Category...
          </option>
          {categories
            .filter((cat) => !selectedCategoryIds.includes(cat.id))
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
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
  );
}
