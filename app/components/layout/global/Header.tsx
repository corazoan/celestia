"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import categories from "@/app/content/categories.json";
import Image from "next/image";

// Simplified Search Skeleton
function SearchSkeleton() {
  return (
    <div className="fixed z-[60] inset-0 md:inset-x-0 md:top-0 h-screen md:h-[40vh] bg-background border-b border-gray-200 dark:border-zinc-800 px-5 md:px-26 md:py-8 py-2 text-foreground">
      <div className="flex items-center justify-between gap-3 pb-3">
        <div className="w-full items-center flex bg-gray-50 dark:bg-zinc-900 py-4 px-2">
          <div className="w-full h-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse ml-2"></div>
        </div>
        <div className="w-6 h-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
      </div>
      <div className="pt-3 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-3 w-32"></div>
          <div className="py-3 flex flex-col gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse w-24"
              ></div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-3 w-48"></div>
          <div className="py-3 flex flex-col md:flex-row gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex md:flex-col items-start gap-3 flex-1"
              >
                <div className="size-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-2 w-20"></div>
                  <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartCount = 0; // Temporary
  const username = null; // Temporary

  // Prevent scrolling when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSearchOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md px-5 py-2 md:px-10 border-b border-gray-200 dark:border-zinc-800 transition-transform duration-300 ease-in-out z-50 text-foreground"
        id="main-header"
      >
        <div className="py-2 min-h-11 flex items-center justify-between">
          {/* Mobile Logo */}
          <Link href="/" className="md:hidden">
            <span className="text-lg font-bold tracking-tighter uppercase italic ml-[-4px]">
              CELESTIA
            </span>
          </Link>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/">
              <span className="text-2xl font-bold tracking-tighter uppercase italic">
                CELESTIA
              </span>
            </Link>
            <nav className="flex items-center gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/collections/${category.slug}`}
                  className="text-sm font-medium hover:text-foreground transition-colors uppercase tracking-wide text-gray-500 dark:text-gray-400"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex hover:opacity-70 transition-opacity"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"
                />
              </svg>
            </button>
            <button
              className="md:hidden hover:opacity-70 transition-opacity"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"
                />
              </svg>
            </button>
            <Link
              href="/cart"
              id="cart-icon"
              className="size-5 cursor-pointer relative align-middle bg-transparent border-0 p-0 m-0 hover:opacity-70 transition-opacity"
              aria-label="View items in shopping cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 32 32"
              >
                <circle cx="10" cy="28" r="2" fill="currentColor" />
                <circle cx="24" cy="28" r="2" fill="currentColor" />
                <path
                  fill="currentColor"
                  d="M28 7H5.82L5 2.8A1 1 0 0 0 4 2H0v2h3.18L7 23.2a1 1 0 0 0 1 .8h18v-2H8.82L8 18h18a1 1 0 0 0 1-.78l2-9A1 1 0 0 0 28 7m-2.8 9H7.62l-1.4-7h20.53Z"
                />
              </svg>
              <span
                className="absolute top-[-5px] right-[-10px] text-[10px] bg-gray-100 dark:bg-zinc-800 size-4 text-center rounded-full flex items-center justify-center font-semibold"
                aria-hidden="true"
              >
                {cartCount}
              </span>
            </Link>
            {!username ? (
              <Link
                href="/login"
                className="pl-1 hover:opacity-70 transition-opacity"
                aria-label="Login"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3"
                  />
                  <path
                    fill="currentColor"
                    d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.9 11.9 0 0 1-12 0m13.993-1.451A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                href="/account"
                className="ml-2 hover:opacity-70 transition-opacity"
              >
                <Image
                  src={`https://avatar.iran.liara.run/public/boy?username=${username}`}
                  alt="User avatar"
                  className="size-6 rounded-full"
                />
              </Link>
            )}
          </div>
        </div>

        {isSearchOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[55]"
              onClick={() => setIsSearchOpen(false)}
            />
            {/* For now just show skeleton as placeholder overlay */}
            <div className="z-60 relative">
              <div className="fixed z-70 top-5 right-5 md:right-10 text-foreground">
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <SearchSkeleton />
            </div>
          </>
        )}
      </header>
    </>
  );
}
