"use client";
import { useActionState, useState } from "react";
import { addUnitAction } from "../action";
const initialState = { error: "", success: false };

export default function AddUnitModel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, action, pending] = useActionState(
    addUnitAction,
    initialState,
  );
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Inventory Management
          </p>
          <h1 className="text-4xl font-bold tracking-tighter mt-1 italic uppercase">
            Product Units
          </h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-foreground text-background px-6 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
          Add Unit
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-background border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
              <h2 className="text-lg font-bold italic tracking-tighter uppercase">
                New Unit
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
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
                  {state.success ? "Unit added successfully!" : state.error}
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                >
                  Unit Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Kilogram"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-zinc-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="abbr"
                  className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                >
                  Abbreviation
                </label>
                <input
                  type="text"
                  id="abbr"
                  name="abbr"
                  required
                  placeholder="e.g. kg"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-zinc-500"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full bg-foreground text-background py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {pending ? "Processing..." : "Create Unit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
