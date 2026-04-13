"use server";

import { headers } from "next/headers";
import { env } from "../libs/env";

export async function getClientIP(): Promise<string | null> {
  const headersList = await headers();

  // Standard headers used by proxies / CDNs
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor?.split(",")[0];
  }
  const realIP = headersList.get("x-real-ip");

  // x-forwarded-for can contain multiple IPs
  return realIP || null;
}
export async function validateTurnstile(token: string, remoteip: string) {
  "use server";
  const SECRET_KEY = env.CLOUDFLARED_SECRET_KEY;
  const formData = new FormData();
  formData.append("secret", SECRET_KEY);
  formData.append("response", token);
  formData.append("remoteip", remoteip);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Turnstile validation error:", error);
    return { success: false, "error-codes": ["internal-error"] };
  }
}
