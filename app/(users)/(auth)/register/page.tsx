"use client";
import { useActionState } from "react";
import Link from "next/link";
import { useState } from "react";
import { Turnstile } from "next-turnstile";
import { env } from "@/app/libs/env";
import { registerAction } from "./action";
const initialRegisterState = {
  success: false,
  error: "",
};
export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialRegisterState,
  );
  const [, setTurnstileStatus] = useState<
    "success" | "error" | "expired" | "required"
  >("required");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-62px)] flex items-center justify-center px-5 py-12 bg-linear-to-b from-background to-zinc-100/50 dark:to-zinc-900/20">
      <div className="w-full max-w-lg bg-background">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 tracking-tighter italic">
            Create Account
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm tracking-widest font-medium">
            Join Celestia for exclusive access
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
            {state.success ? (
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>
                  You did it! You successfully filled out a form on the
                  internet. Check your email for a verification link. There’s no
                  free pizza inside, but clicking it does activate your account.
                  Basically the same thing.
                </span>
              </div>
            ) : (
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
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="leading-relaxed">{state.error || error}</span>
              </div>
            )}
          </div>
        )}

        {/* Register Form */}
        <form className="grid gap-6" action={formAction}>
          {/* Email */}
          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="text-xs tracking-widest font-bold text-zinc-500"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              className="h-12 w-full px-4 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all text-sm tracking-wide placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label
                htmlFor="firstName"
                className="text-xs tracking-widest font-bold text-zinc-500"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                required
                className="h-12 w-full px-4 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all text-sm tracking-wide placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="lastName"
                className="text-xs tracking-widest font-bold text-zinc-500"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                required
                className="h-12 w-full px-4 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all text-sm tracking-wide placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="grid gap-2">
            <label
              htmlFor="phone"
              className="text-xs tracking-widest font-bold text-zinc-500"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="0123456789"
              required
              pattern="^[0-9]*"
              minLength={10}
              maxLength={10}
              title="Should be 10 digits"
              className="h-12 w-full px-4 bg-transparent border border-zinc-200 dark:border-zinc-800 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all text-sm tracking-wide placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
          </div>

          {/* Button */}
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
              className="h-12 w-full bg-foreground text-background font-bold tracking-widest text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                  Continue
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
          <p className="text-xs text-zinc-500 tracking-widest font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-foreground hover:underline underline-offset-4 font-bold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
