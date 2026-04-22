"use server";
import { getCategories } from "../action";
import DeleteCategoryModel from "./DeleteCategoryModel";
import EditCategoryModel from "./EditCategoryModel";

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
                  <EditCategoryModel
                    name={cat.name}
                    slug={cat.slug}
                    id={cat.id}
                  />
                  <DeleteCategoryModel id={cat.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
