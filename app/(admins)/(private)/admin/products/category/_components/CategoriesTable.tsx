"use server";
import { getCategories } from "../action";
import CategoryRow from "./CategoryRow";

export default async function CategoriesTable() {
  const categories = await getCategories();

  return (
    <div className="bg-background border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
            <th className="p-4 w-12 text-[10px] uppercase font-bold text-zinc-400 tracking-widest text-center">
              #
            </th>
            <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
              Category
            </th>
            <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest text-center">
              Sub-categories
            </th>
            <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest text-center">
              Products
            </th>
            <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {categories.map((cat, index) => (
            <CategoryRow key={cat.id} category={cat} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
