"use client";
import { useActionState, useState } from "react";
import ImageInput from "../../add-product/_components/ImageInput";
import { addVariantAction } from "../action";

const initialState = { success: false, error: "" };

export default function AddVariantModel({
  productId,
  unitAbbr,
}: {
  productId: number;
  unitAbbr: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, pending] = useActionState(
    addVariantAction,
    initialState,
  );

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
        title="Add Variant"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        Add Variant
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-background border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200 text-left">
            {/* Fixed Header */}
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center shrink-0">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Product Variant
                </p>
                <h2 className="text-lg font-bold italic tracking-tighter uppercase">
                  Add New Variant
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

            <form
              action={async (formData) => {
                await action(formData);
                if (!state.error) {
                  // We don't necessarily close on success if we want to add multiple,
                  // but usually for modals we do. However, state is updated after async call.
                }
              }}
              className="flex flex-col flex-1 overflow-hidden"
            >
              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {(state.error || state.success) && (
                  <div
                    className={`p-4 text-xs font-bold uppercase tracking-widest ${
                      state.success
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20"
                        : "bg-red-50 text-red-600 dark:bg-red-950/20"
                    }`}
                  >
                    {state.success
                      ? "Variant added successfully!"
                      : state.error}
                  </div>
                )}

                <input type="hidden" name="productId" value={productId} />

                {/* Images Section */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Media
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="md:col-span-2">
                      <ImageInput
                        name="featuredImage"
                        label="Featured (Required)"
                      />
                    </div>
                    <div className="md:col-span-3 grid grid-cols-2 gap-4">
                      <ImageInput name="galleryImage1" label="Gallery 1" />
                      <ImageInput name="galleryImage2" label="Gallery 2" />
                      <ImageInput name="galleryImage3" label="Gallery 3" />
                      <ImageInput name="galleryImage4" label="Gallery 4" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                      required
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="stock"
                      className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                    >
                      Initial Stock
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      required
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  <div className="relative">
                    <select
                      id="status"
                      name="status"
                      defaultValue="DRAFT"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors appearance-none"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 flex-shrink-0 bg-background">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-foreground text-background py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {pending ? "Adding..." : "Create Variant"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
