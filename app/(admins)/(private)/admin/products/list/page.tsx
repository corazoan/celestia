import Link from "next/link";
import { getProducts } from "./action";
import ProductListTable from "./_components/ProductListTable";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-8 flex-1 overflow-auto">
      <div className="bg-background border border-zinc-200 dark:border-zinc-800 shadow-xs">
        {/* Table Header Action Bar */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
              Product List
            </h3>
            <p className="text-[10px] text-zinc-400 uppercase font-medium mt-1">
              Manage your catalog and stock levels
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 3H2l8 9v6l4 4v-10L22 3z" />
              </svg>
              Filter
            </button>
            <Link
              href="/admin/products/add-product"
              className="px-5 py-2 bg-foreground text-background text-[10px] font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Product
            </Link>
          </div>
        </div>

        {/* Product List Table */}
        <ProductListTable products={products} />

        {/* Pagination */}
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <button
            className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-30 cursor-pointer"
            disabled
          >
            Previous
          </button>
          <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
