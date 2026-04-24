"use client";
import { useState, useActionState } from "react";
import { deleteCategory } from "../action";

const initialState = { success: false, error: "" };
export default function DeleteCategoryModel({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(
    () => deleteCategory(id),
    initialState,
  );
  return (
    <>
      <button
        className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
        title="Delete"
        onClick={() => setOpen(true)}
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
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative bg-background border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                  Action Required
                </p>
                <h2 className="text-xl font-bold italic tracking-tighter uppercase mt-1">
                  Confirm Deletion
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-foreground transition-colors p-2"
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

            <div className="p-8">
              {state.error && (
                <div className="mb-6 p-4 text-xs font-bold uppercase tracking-widest bg-red-50 text-red-600 dark:bg-red-950/20">
                  {state.error}
                </div>
              )}

              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                Warning: You are about to delete this category. This action is
                irreversible and will
                <span className="text-foreground border-b border-red-500 mx-1">
                  remove all products
                </span>
                linked to this category.
              </p>
            </div>

            <div className="p-6 pt-0 flex flex-col gap-3">
              <form action={action}>
                <button
                  disabled={pending}
                  className="w-full bg-red-500/10 text-red-500 py-4 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-colors border border-red-500/20 disabled:opacity-50"
                >
                  {pending ? "Processing..." : "Permanently Delete All"}
                </button>
              </form>
              <button
                onClick={() => setOpen(false)}
                className="w-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
