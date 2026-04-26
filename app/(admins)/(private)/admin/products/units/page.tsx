"use server";
import UnitsTable from "./_components/UnitsTable";
import AddUnitModel from "./_components/AddUnitModel";
import { Suspense } from "react";
import TableSkeleton from "./_components/LoadingSkeleton";

export default async function UnitsPage() {
  return (
    <div className="p-8 flex-1 overflow-auto bg-zinc-50/50 dark:bg-zinc-950/20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <AddUnitModel />

        {/* Units Table */}
        <Suspense fallback={<TableSkeleton />}>
          <UnitsTable />
        </Suspense>
      </div>
    </div>
  );
}
