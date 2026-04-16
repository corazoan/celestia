export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Celestial Oud",
      category: "Fragrances",
      price: "$180.00",
      stock: 42,
      status: "Active",
    },
    {
      id: 2,
      name: "Midnight Bloom",
      category: "Fragrances",
      price: "$145.00",
      stock: 12,
      status: "Scheduled",
    },
    {
      id: 3,
      name: "Ethereal Mist",
      category: "Fragrances",
      price: "$95.00",
      stock: 0,
      status: "Draft",
    },
    {
      id: 4,
      name: "Solar Flare",
      category: "Fragrances",
      price: "$120.00",
      stock: 89,
      status: "Active",
    },
    {
      id: 5,
      name: "Lunar Path",
      category: "Fragrances",
      price: "$160.00",
      stock: 5,
      status: "Draft",
    },
  ];

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
            <button className="px-5 py-2 bg-foreground text-background text-[10px] font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer">
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
            </button>
          </div>
        </div>

        {/* Table */}
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
                <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
                  Category
                </th>
                <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
                  Price
                </th>
                <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest text-center">
                  Stock
                </th>
                <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
                  Status
                </th>
                <th className="p-4 text-[10px] uppercase font-bold text-zinc-400 tracking-widest text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group"
                >
                  <td className="p-4 text-[11px] font-medium text-zinc-400">
                    {product.id}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-zinc-100 dark:bg-zinc-900 rounded-none border border-zinc-200 dark:border-zinc-800"></div>
                      <span className="text-[11px] font-bold uppercase tracking-tight">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-[11px] text-zinc-500 uppercase tracking-widest font-medium">
                    {product.category}
                  </td>
                  <td className="p-4 text-[11px] font-bold">{product.price}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`text-[11px] font-bold ${product.stock < 10 ? "text-red-500" : "text-zinc-600 dark:text-zinc-400"}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border ${
                        product.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50"
                          : product.status === "Scheduled"
                            ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/50"
                            : "bg-zinc-100 text-zinc-400 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-foreground transition-colors underline underline-offset-4 cursor-pointer">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <button
            className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-30 cursor-pointer"
            disabled
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            <span className="size-8 flex items-center justify-center bg-foreground text-background text-[10px] font-bold">
              1
            </span>
            <span className="size-8 flex items-center justify-center text-zinc-400 text-[10px] font-bold hover:text-foreground cursor-pointer transition-colors">
              2
            </span>
            <span className="size-8 flex items-center justify-center text-zinc-400 text-[10px] font-bold hover:text-foreground cursor-pointer transition-colors">
              3
            </span>
          </div>
          <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
