"use client";
import { useActionState, useState } from "react";
import { addCategoryAction } from "../action";

const initialState = { success: false, error: "" };

export default function EditCategoryModel({
  name,
  slug,
  id,
}: {
  name: string;
  slug: string;
  id: number;
}) {
  const [nameValue, setName] = useState(name);
  const [slugValue, setSlug] = useState(slug);
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, pending] = useActionState(
    addCategoryAction,
    initialState,
  );
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-zinc-400 cursor-pointer hover:text-foreground transition-colors"
        title="Edit"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-background border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
              <h2 className="text-lg font-bold italic tracking-tighter uppercase">
                New Category
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-foreground"
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
                  {state.success ? "Category added successfully!" : state.error}
                </div>
              )}

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
                  value={nameValue}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Winter Collection"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-zinc-500"
                />

                <input
                  type="text"
                  id="id"
                  name="id"
                  defaultValue={id}
                  required
                  className="hidden"
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
                  value={slugValue}
                  onChange={(e) => setSlug(e.target.value)}
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
      )}
    </>
  );
}
