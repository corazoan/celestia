"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useState } from "react";
import { Turnstile } from "next-turnstile";
import { env } from "@/app/libs/env";

const initialRegisterState = {
  success: false,
  error: "",
};

// Mock action for UI demonstration
async function mockAdminRegisterAction(prevState: any, formData: FormData) {
  return initialRegisterState;
}

export default function AdminRegisterPage() {
  const [state, formAction, isPending] = useActionState(
    mockAdminRegisterAction,
    initialRegisterState,
  );

  const [, setTurnstileStatus] = useState<
    "success" | "error" | "expired" | "required"
  >("required");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-62px)] flex items-center justify-center px-5 py-12 bg-linear-to-b from-background to-zinc-100/50 dark:to-zinc-900/20">
      <div className="w-full max-w-lg bg-background border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 shadow-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 mb-4 border border-zinc-200 dark:border-zinc-800 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
            Admin Portal
          </div>
          <h1 className="text-3xl font-bold mb-3 tracking-tighter italic">
            Create Admin Account
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm tracking-widest font-medium uppercase">
            System Access Configuration
          </p>
        </div>

        {/* Status Messages */}
        {(state.error || state.success || error) && (
          <div
            className={`mb-8 p-4 border text-xs tracking-widest font-bold ${
              state.success
                ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                : "bg-red-50/50 dark:bg-red-950/10 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400"
            }`}
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {state.success ? (
                  <path d="M20 6 9 17l-5-5" />
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </>
                )}
              </svg>
              <span className="leading-relaxed">
                {state.success
                  ? "Admin account created successfully. Welcome to the console."
                  : state.error || error}
              </span>
            </div>
          </div>
        )}

        {/* Register Form */}
        <form className="grid gap-6" action={formAction}>
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label
                htmlFor="firstName"
                className="text-xs tracking-widest font-bold text-zinc-500 uppercase"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Admin"
                required
                className="h-12 w-full px-4 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all text-sm tracking-wide placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="lastName"
                className="text-xs tracking-widest font-bold text-zinc-500 uppercase"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="User"
                required
                className="h-12 w-full px-4 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all text-sm tracking-wide placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
              />
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="text-xs tracking-widest font-bold text-zinc-500 uppercase"
            >
              System Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="admin@celestia.com"
              required
              className="h-12 w-full px-4 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all text-sm tracking-wide placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
          </div>

          {/* Phone Number */}
          <div className="grid gap-2">
            <label
              htmlFor="phoneNumber"
              className="text-xs tracking-widest font-bold text-zinc-500 uppercase"
            >
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="0123456789"
              pattern="^[0-9]*"
              minLength={10}
              maxLength={15}
              className="h-12 w-full px-4 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all text-sm tracking-wide placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-xs tracking-widest font-bold text-zinc-500 uppercase"
            >
              Secret Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              className="h-12 w-full px-4 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all text-sm tracking-wide placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
          </div>

          {/* Button & Turnstile */}
          <div className="grid gap-4">
            <Turnstile
              siteKey={env.NEXT_PUBLIC_CLOUDFLARED_SITE_KEY}
              retry="auto"
              refreshExpired="auto"
              sandbox={env.NEXT_PUBLIC_ENV === "development"}
              onError={() => {
                setTurnstileStatus("error");
                setError("Security check failed. Please try again.");
              }}
              onExpire={() => {
                setTurnstileStatus("expired");
                setError("Security check expired. Please verify again.");
              }}
              onLoad={() => {
                setTurnstileStatus("required");
                setError(null);
              }}
              onVerify={() => {
                setTurnstileStatus("success");
                setError(null);
              }}
            />

            <button
              type="submit"
              disabled={isPending}
              className="h-12 w-full bg-foreground text-background font-bold tracking-[0.2em] text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 uppercase"
            >
              {isPending ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : (
                <>
                  Initialize Account
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
                </>
              )}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center mt-10">
          <p className="text-xs text-zinc-500 tracking-widest font-medium uppercase">
            Already authorized?{" "}
            <Link
              href="/admin/login"
              className="text-foreground hover:underline underline-offset-4 font-bold"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
