"use client";

export default function DashboardPage() {
  return (
    <div className="p-8 flex-1 overflow-auto bg-zinc-50/50 dark:bg-zinc-950/20">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Today Orders */}
        <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Today Orders
              </p>
              <h3 className="text-3xl font-bold tracking-tighter mt-1 italic">
                24
              </h3>
            </div>
            <div className="size-10 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m12 19 7-7 3 3-7 7-3-3z" />
                <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="m2 2 7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
            </div>
          </div>
          <p className="text-[10px] text-emerald-600 font-bold mt-4 uppercase">
            +12% from yesterday
          </p>
        </div>

        {/* Monthly Orders */}
        <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Monthly Orders
              </p>
              <h3 className="text-3xl font-bold tracking-tighter mt-1 italic">
                1,482
              </h3>
            </div>
            <div className="size-10 bg-blue-50 dark:bg-blue-950/20 text-blue-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
              </svg>
            </div>
          </div>
          <p className="text-[10px] text-blue-600 font-bold mt-4 uppercase">
            Target reached
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Total Orders
              </p>
              <h3 className="text-3xl font-bold tracking-tighter mt-1 italic">
                42,890
              </h3>
            </div>
            <div className="size-10 bg-amber-50 dark:bg-amber-950/20 text-amber-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 font-bold mt-4 uppercase">
            Lifetime sales
          </p>
        </div>

        {/* Total Products */}
        <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Total Products
              </p>
              <h3 className="text-3xl font-bold tracking-tighter mt-1 italic">
                1,204
              </h3>
            </div>
            <div className="size-10 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 font-bold mt-4 uppercase">
            Live in catalog
          </p>
        </div>
      </div>
    </div>
  );
}
