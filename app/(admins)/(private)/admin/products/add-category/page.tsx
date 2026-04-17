"use server";
import CategoriesTable from "./_components/CategoriesTable";
import AddCategoryModel from "./_components/AddCategoryModel";
import { Suspense } from "react";

export default async function AddCategoryPage() {
  return (
    <div className="p-8 flex-1 overflow-auto bg-zinc-50/50 dark:bg-zinc-950/20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <AddCategoryModel />

        {/* Categories Table */}
        <Suspense fallback={<TableSkeleton />}>
          <CategoriesTable />
        </Suspense>
      </div>

      {/* Modal Dialog */}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="bg-background border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="animate-pulse">
        <div className="border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="px-6 py-4 flex gap-4">
            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-16"></div>
            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-16"></div>
            <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-20"></div>
          </div>
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-6 py-4 flex gap-4">
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-32"></div>
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-48"></div>
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
