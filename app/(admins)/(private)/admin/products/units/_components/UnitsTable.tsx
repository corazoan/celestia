"use server";
import { getUnits } from "../action";
import DeleteUnitModel from "./DeleteUnitModel";
import EditUnitModel from "./EditUnitModel";

export default async function UnitsTable() {
  const units = await getUnits();
  return (
    <div className="bg-background border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
            <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Name
            </th>
            <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Abbreviation
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
          {units.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="size-12 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-zinc-400"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">
                    No units available
                  </p>
                  <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                    Please add a unit to get started
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            units.map((unit) => (
              <tr
                key={unit.id}
                className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors group"
              >
                <td className="px-6 py-4 text-sm font-bold tracking-tight">
                  {unit.name}
                </td>
                <td className="px-6 py-4 text-xs font-mono text-zinc-500 uppercase">
                  {unit.abbr}
                </td>
                <td className="px-6 py-4 text-xs font-bold text-zinc-400">
                  {unit._count.products} items
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <EditUnitModel
                      name={unit.name}
                      abbr={unit.abbr}
                      id={unit.id}
                    />
                    <DeleteUnitModel id={unit.id} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
