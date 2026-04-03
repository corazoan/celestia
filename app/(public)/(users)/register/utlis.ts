"use server";

import { headers } from "next/headers";

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
