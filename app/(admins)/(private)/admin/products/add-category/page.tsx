"use client";
import { addCategoryAction } from "./action";
import { useActionState } from "react";

const initialState = { error: "", success: false };
export default function AddCategoryPage() {
  const [state, action, pending] = useActionState(
    addCategoryAction,
    initialState,
  );
  return (
    <div className="p-8 flex-1 overflow-auto bg-zinc-50/50 dark:bg-zinc-950/20">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Inventory Management
          </p>
          <h1 className="text-4xl font-bold tracking-tighter mt-1 italic uppercase">
            Add New Category
          </h1>
        </div>

        <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <form id="add-category-form" action={action} className="space-y-6">
            {state.error ||
              (state.success && (
                <div
                  className={`p-4 text-xs font-bold uppercase tracking-widest ${
                    state.success
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20"
                      : "bg-red-50 text-red-600 dark:bg-red-950/20"
                  }`}
                >
                  {state.success ? "Category added successfully!" : state.error}
                </div>
              ))}

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Winter Collection"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="slug"
                className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
              >
                Slug (URL Path)
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                placeholder="e.g. winter-collection"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-zinc-500"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-foreground text-background py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {pending ? "Processing..." : "Create Category"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
