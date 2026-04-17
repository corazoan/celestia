"use server";
import { Suspense } from "react";
import { getCategories } from "../action";

export default async function CategoriesTable() {
  const categories = await getCategories();
  return (
    <div className="bg-background border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
            <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Name
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Slug
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Products
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {categories.map((cat) => (
            <tr
              key={cat.slug}
              className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors group"
            >
              <td className="px-6 py-4 text-sm font-bold tracking-tight">
                {cat.name}
              </td>
              <td className="px-6 py-4 text-xs font-mono text-zinc-500">
                {cat.slug}
              </td>
              <td className="px-6 py-4 text-xs font-bold text-zinc-400">
                {cat._count.products} items
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    className="p-2 text-zinc-400 hover:text-foreground transition-colors"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </button>
                  <button
                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
