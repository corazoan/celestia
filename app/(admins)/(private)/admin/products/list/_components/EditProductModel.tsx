"use client";
import { useActionState, useState } from "react";
import { updateProduct } from "../action";
import { ProductWithRelations, UnitType } from "../type";
import { SubCategory } from "../../category/type";
import EditCategoryInput from "./EditCategoryInput";

const initialState = { success: false, error: "" };

export default function EditProductModel({
  product,
  subCategories,
  units,
}: {
  product: ProductWithRelations;
  subCategories: SubCategory[];
  units: UnitType[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    categoryId: product.categories.map((category) => category.categoryId),
    unitId: product.unitId,
  });

  const [state, action, pending] = useActionState(updateProduct, initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="p-2 text-zinc-400 cursor-pointer hover:text-foreground transition-colors"
        title="Edit Product"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-background border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 text-left">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Inventory Item
                </p>
                <h2 className="text-lg font-bold italic tracking-tighter uppercase">
                  Edit Product
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-foreground p-2 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <form action={action} className="p-6 space-y-5">
              {(state.error || state.success) && (
                <div
                  className={`p-4 text-xs font-bold uppercase tracking-widest ${
                    state.success
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20"
                      : "bg-red-50 text-red-600 dark:bg-red-950/20"
                  }`}
                >
                  {state.success
                    ? "Product updated successfully!"
                    : state.error}
                </div>
              )}

              <input type="hidden" name="id" value={product.id} />

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <EditCategoryInput
                  selecteCategories={formData.categoryId}
                  categories={subCategories}
                />

                <div className="space-y-2">
                  <label
                    htmlFor="unitId"
                    className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                  >
                    Base Unit
                  </label>
                  <select
                    id="unitId"
                    name="unitId"
                    value={formData.unitId}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors appearance-none"
                  >
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name} ({unit.abbr})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-foreground text-background py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {pending ? "Updating..." : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
