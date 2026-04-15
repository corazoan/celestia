import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = (params.message as string) || "An unknown error occurred during verification.";

  return (
    <main className="flex min-h-[calc(100vh-62px)] flex-col items-center justify-center px-5 py-12 bg-linear-to-b from-background to-zinc-100/50 dark:to-zinc-900/20 text-foreground">
      <div className="w-full max-w-lg bg-background p-8 md:p-12 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="text-center mb-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50/50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-8 text-red-600 dark:text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-3 tracking-tighter italic">
            Verification Failed
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm tracking-wide font-medium leading-relaxed max-w-[320px] mx-auto">
            {message}
          </p>
        </div>

        <div className="grid gap-4">
          <Link
            href="/login"
            className="h-12 w-full bg-foreground text-background font-bold tracking-widest text-xs uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            Back to Login
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
          
          <Link
            href="/"
            className="h-12 w-full border border-zinc-200 dark:border-zinc-800 text-foreground font-bold tracking-widest text-xs uppercase hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Go to Homepage
          </Link>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-900">
          <p className="text-[10px] text-zinc-400 dark:text-zinc-600 tracking-[0.3em] font-bold uppercase">
            &copy; {new Date().getFullYear()} CELESTIA OFFICIAL
          </p>
        </div>
      </div>
    </main>
  );
}
