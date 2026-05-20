"use client";
type Unit = {
  id: number;
  name: string;
  abbr: string;
};

import { CategoryType } from "../type";

export default function ParentCategoryInput({
  categories,
  previousParentId,
}: {
  previousParentId?: CategoryType;
  categories: CategoryType[];
}) {
  //jiske pass parent nhi hai usko lena hai sirf

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
        Parent Category
      </label>
      <div className="relative">
        <select
          name="parentId"
          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 focus:outline-none focus:border-foreground transition-colors appearance-none cursor-pointer pr-10 uppercase font-bold tracking-widest text-xs"
        >
          {previousParentId && (
            <option key={previousParentId.id} value={previousParentId.id}>
              {previousParentId.name}
            </option>
          )}

          <option key="none" value="">
            None
          </option>

          {categories
            .filter((category) => category.id !== previousParentId?.id)
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
