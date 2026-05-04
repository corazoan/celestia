"use client";
import { useActionState, useState } from "react";
import ImageInput from "../../add-product/_components/ImageInput";
import { Variant } from "../type";
import { updateProductVariant } from "../action";

const initialState = { success: false, error: "" };

export default function EditVariantModel({
  variant,
  unitAbbr,
}: {
  variant: Variant;
  unitAbbr: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    stock: variant.stock,
    regularPrice: variant.regularPrice,
    sellPrice: variant.sellPrice,
    unitValue: variant.unitValue,
    status: variant.status,
  });

  const [state, action, pending] = useActionState(
    updateProductVariant,
    initialState,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-zinc-400 cursor-pointer hover:text-foreground transition-colors"
        title="Edit Variant"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-background border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-2xl my-8 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center sticky top-0 bg-background z-10">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Product Variant
                </p>
                <h2 className="text-lg font-bold italic tracking-tighter uppercase">
                  Edit Variant Details
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

            <form action={action} className="p-6 space-y-6">
              {(state.error || state.success) && (
                <div
                  className={`p-4 text-xs font-bold uppercase tracking-widest ${
                    state.success
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20"
                      : "bg-red-50 text-red-600 dark:bg-red-950/20"
                  }`}
                >
                  {state.success
                    ? "Variant updated successfully!"
                    : state.error}
                </div>
              )}

              <input type="hidden" name="variantId" value={variant.id} />

              {/* Images Section */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Media
                </p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <ImageInput
                      name="featuredImage"
                      label="Featured"
                      initialImage={variant.featuredImage}
                    />
                  </div>
                  <div className="md:col-span-3 grid grid-cols-2 gap-4">
                    <ImageInput
                      name="galleryImage1"
                      label="Gallery 1"
                      initialImage={variant.variantImages[0]?.url}
                    />
                    <ImageInput
                      name="galleryImage2"
                      label="Gallery 2"
                      initialImage={variant.variantImages[1]?.url}
                    />
                    <ImageInput
                      name="galleryImage3"
                      label="Gallery 3"
                      initialImage={variant.variantImages[2]?.url}
                    />
                    <ImageInput
                      name="galleryImage4"
                      label="Gallery 4"
                      initialImage={variant.variantImages[3]?.url}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="unitValue"
                    className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                  >
                    Value ({unitAbbr})
                  </label>
                  <input
                    type="number"
                    id="unitValue"
                    name="unitValue"
                    value={formData.unitValue}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="stock"
                    className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                  >
                    Stock Level
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="regularPrice"
                    className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                  >
                    Regular Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="regularPrice"
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="sellPrice"
                    className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                  >
                    Sale Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="sellPrice"
                    name="sellPrice"
                    value={formData.sellPrice}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors appearance-none"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              <div className="pt-4 sticky bottom-0 bg-background pb-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-foreground text-background py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {pending ? "Updating..." : "Update Variant"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
