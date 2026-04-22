"use server";
import CategoriesTable from "./_components/CategoriesTable";
import AddCategoryModel from "./_components/AddCategoryModel";
import { Suspense } from "react";
import TableSkeleton from "./_components/LoadingSkeleton";

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
