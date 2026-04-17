export default function Header() {
  return (
    <header className="h-20 bg-background border-b border-zinc-200 dark:border-zinc-800 px-8 flex items-center justify-between sticky top-0 z-30">
      <h2 className="text-xl font-bold tracking-tighter uppercase italic">
        Welcome
      </h2>

      <div className="flex items-center gap-6">
        <button className="text-zinc-400 hover:text-foreground transition-colors cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        <button className="text-zinc-400 hover:text-foreground transition-colors relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span className="absolute -top-1 -right-1 size-2 bg-foreground rounded-full border-2 border-background"></span>
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-zinc-200 dark:border-zinc-800">
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest leading-none">
              Admin User
            </p>
            <p className="text-[9px] text-zinc-400 font-medium uppercase mt-1">
              Super Admin
            </p>
          </div>
          <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-none flex items-center justify-center font-bold text-xs italic">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
