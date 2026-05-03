"use client";

import { Product } from "../type";
import ProductRow from "./ProductRow";

export default function ProductListTable({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-900">
            <th className="p-4 w-12 text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
              #
            </th>
            <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
              Product
            </th>
            <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest text-center">
              Variants
            </th>
            <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest text-center">
              Price Range
            </th>
            <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest text-center">
              Total Stock
            </th>
            <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {products.map((product, index) => (
            <ProductRow key={product.name} index={index} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
