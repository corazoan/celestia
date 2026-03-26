"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="md:px-10 border-y border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2 md:max-w-xl md:mx-auto">
          {/* First Accordion - The Company */}
          <div className="px-5 border-b border-zinc-900 md:border-b-0 last:border-b-0">
            <button
              className="md:pointer-events-none w-full flex items-center justify-between py-4 text-left text-sm font-medium hover:underline md:hover:no-underline transition-all outline-none rounded-md text-zinc-100"
              onClick={() => toggleAccordion("company")}
            >
              <h2 className="uppercase tracking-wide sm:text-xl">The Company</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-zinc-600 size-4 shrink-0 transition-transform duration-200 md:hidden ${
                  openAccordion === "company" ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 md:!block ${
                openAccordion === "company" ? "block" : "hidden"
              }`}
            >
              <div className="pb-4 space-y-1.5">
                <Link
                  href="/about-us"
                  className="block text-sm uppercase tracking-wide text-zinc-400 hover:text-white transition-colors"
                >
                  ABOUT US
                </Link>
                <Link
                  href="/privacy-policy"
                  className="block text-sm uppercase tracking-wide text-zinc-400 hover:text-white transition-colors"
                >
                  PRIVACY POLICY
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="block text-sm uppercase tracking-wide text-zinc-400 hover:text-white transition-colors"
                >
                  TERMS AND CONDITIONS
                </Link>
                <Link
                  href="/returns-and-refunds"
                  className="block text-sm uppercase tracking-wide text-zinc-400 hover:text-white transition-colors"
                >
                  RETURN AND REFUNDS
                </Link>
              </div>
            </div>
          </div>

          {/* Second Accordion - Customer Services */}
          <div className="px-5 border-b border-zinc-900 md:border-b-0 last:border-b-0">
            <button
              className="md:pointer-events-none w-full flex items-center justify-between py-4 text-left text-sm font-medium hover:underline md:hover:no-underline transition-all outline-none rounded-md text-zinc-100"
              onClick={() => toggleAccordion("services")}
            >
              <h2 className="uppercase tracking-wide sm:text-xl">
                Customer Services
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-zinc-600 size-4 shrink-0 transition-transform duration-200 md:hidden ${
                  openAccordion === "services" ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 md:!block ${
                openAccordion === "services" ? "block" : "hidden"
              }`}
            >
              <div className="pb-4 space-y-1.5">
                <Link
                  href="/track-order"
                  className="block text-sm uppercase tracking-wide text-zinc-400 hover:text-white transition-colors"
                >
                  TRACK MY ORDER
                </Link>
                <Link
                  href="/contact-us"
                  className="block text-sm uppercase tracking-wide text-zinc-400 hover:text-white transition-colors"
                >
                  CONTACT US
                </Link>
                <Link
                  href="/faqs"
                  className="block text-sm uppercase tracking-wide text-zinc-400 hover:text-white transition-colors"
                >
                  FAQS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center px-5 md:px-10 gap-3 py-10 md:justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="text-2xl font-bold tracking-tighter uppercase italic text-zinc-100">
              CELESTIA
            </span>
          </Link>
          <div className="flex items-center gap-2 ml-2">
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M26.67 4H5.33A1.34 1.34 0 0 0 4 5.33v21.34A1.34 1.34 0 0 0 5.33 28h11.49v-9.28H13.7v-3.63h3.12v-2.67c0-3.1 1.89-4.79 4.67-4.79c.93 0 1.86 0 2.79.14V11h-1.91c-1.51 0-1.8.72-1.8 1.77v2.31h3.6l-.47 3.63h-3.13V28h6.1A1.34 1.34 0 0 0 28 26.67V5.33A1.34 1.34 0 0 0 26.67 4"
                />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                viewBox="0 0 32 32"
              >
                <circle cx="22.406" cy="9.594" r="1.44" fill="currentColor" />
                <path
                  fill="currentColor"
                  d="M16 9.838A6.162 6.162 0 1 0 22.162 16A6.16 6.16 0 0 0 16 9.838M16 20a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
                />
                <path
                  fill="currentColor"
                  d="M16 6.162c3.204 0 3.584.012 4.849.07a6.6 6.6 0 0 1 2.228.413a3.98 3.98 0 0 1 2.278 2.278a6.6 6.6 0 0 1 .413 2.228c.058 1.265.07 1.645.07 4.85s-.012 3.583-.07 4.848a6.6 6.6 0 0 1-.413 2.228a3.98 3.98 0 0 1-2.278 2.278a6.6 6.6 0 0 1-2.228.413c-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07a6.6 6.6 0 0 1-2.228-.413a3.98 3.98 0 0 1-2.278-2.278a6.6 6.6 0 0 1-.413-2.228c-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849a6.6 6.6 0 0 1 .413-2.228a3.98 3.98 0 0 1 2.278-2.278a6.6 6.6 0 0 1 2.228-.413c1.265-.058 1.645-.07 4.849-.07M16 4c-3.259 0-3.668.014-4.948.072a8.8 8.8 0 0 0-2.912.558a6.14 6.14 0 0 0-3.51 3.51a8.8 8.8 0 0 0-.558 2.913C4.014 12.333 4 12.74 4 16s.014 3.668.072 4.948a8.8 8.8 0 0 0 .558 2.912a6.14 6.14 0 0 0 3.51 3.51a8.8 8.8 0 0 0 2.913.558c1.28.058 1.688.072 4.947.072s3.668-.014 4.948-.072a8.8 8.8 0 0 0 2.913-.558a6.14 6.14 0 0 0 3.51-3.51a8.8 8.8 0 0 0 .557-2.913C27.986 19.667 28 19.26 28 16s-.014-3.668-.072-4.948a8.8 8.8 0 0 0-.558-2.912a6.14 6.14 0 0 0-3.51-3.51a8.8 8.8 0 0 0-2.913-.557C19.667 4.013 19.26 4 16 4"
                />
              </svg>
            </a>
          </div>
        </div>
        <p className="text-sm text-zinc-500 mt-2 md:mt-0">
          Copyright © {new Date().getFullYear()} CELESTIA, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
