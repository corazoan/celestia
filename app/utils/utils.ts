import { headers } from "next/headers";
import { env } from "../libs/env";

type Handler<T> = [T, null] | [null, Error];

export const returnHandler = <T>(result: T): Handler<T> => {
  return [result, null] as const;
};

export const errorHandler = (error: unknown): [null, Error] => {
  if (error instanceof Error) {
    console.error(error);
    return [null, error] as const;
  }

  // TODO: Get stack trace
  const e = new Error("Unknown error " + JSON.stringify(error) + " " + error);
  console.error(e);
  return [null, e] as const;
};

export async function getClientIP(): Promise<string | null> {
  "use server";
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
