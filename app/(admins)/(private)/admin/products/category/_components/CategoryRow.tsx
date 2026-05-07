"use client";

import { useState } from "react";
import EditCategoryModel from "./EditCategoryModel";
import DeleteCategoryModel from "./DeleteCategoryModel";
import { CategoryType } from "../type";

export default function CategoryRow({
  category,
  index,
}: {
  category: CategoryType;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <>
      <tr
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group border-b border-zinc-100 dark:border-zinc-900 ${
          hasChildren ? "cursor-pointer" : ""
        }`}
      >
        <td className="p-4 text-[11px] font-medium text-zinc-400 text-center">
          {index + 1}
        </td>
        <td className="p-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-tight">
              {category.name}
            </span>
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-medium">
              Category
            </span>
          </div>
        </td>
        <td className="p-4 text-[11px] text-zinc-500 uppercase tracking-widest font-medium text-center">
          <div className="flex items-center justify-center gap-2">
            {category.children.length} Sub-categories
            {hasChildren && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            )}
          </div>
        </td>
        <td className="p-4 text-[11px] font-bold text-center">
          {category._count.products} Products
        </td>
        <td className="p-4 text-right">
          <div className="flex justify-end items-center gap-2">
            <EditCategoryModel
              name={category.name}
              slug={category.slug}
              id={category.id}
            />
            <DeleteCategoryModel id={category.id} />
          </div>
        </td>
      </tr>
      {isOpen && hasChildren && (
        <tr className="bg-zinc-50/50 dark:bg-zinc-900/10">
          <td colSpan={5} className="p-0">
            <div className="p-4 pb-8">
              <div className="border border-zinc-200 dark:border-zinc-800 bg-background overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-900">
                      <th className="p-3 text-[9px] uppercase font-bold text-zinc-400 tracking-widest">
                        Sub-Category
                      </th>
                      <th className="p-3 text-[9px] uppercase font-bold text-zinc-400 tracking-widest">
                        Slug
                      </th>
                      <th className="p-3 text-[9px] uppercase font-bold text-zinc-400 tracking-widest text-center">
                        Products
                      </th>
                      <th className="p-3 text-[9px] uppercase font-bold text-zinc-400 tracking-widest text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                    {category.children.map((child) => (
                      <tr
                        key={child.id}
                        className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors"
                      >
                        <td className="p-3 text-[10px] font-bold uppercase tracking-tight">
                          {child.name}
                        </td>
                        <td className="p-3 text-[10px] font-mono text-zinc-500">
                          {child.slug}
                        </td>
                        <td className="p-3 text-center text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                          {child._count.products}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end items-center">
                            <EditCategoryModel
                              name={child.name}
                              slug={child.slug}
                              id={child.id}
                            />
                            <DeleteCategoryModel id={child.id} />
                          </div>
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
