"use server";

import z, { prettifyError } from "zod/v4";
import { registerAdminSchema } from "./type";
import { getClientIP, validateTurnstile } from "@/app/utils/utils";
import { env } from "@/app/libs/env";

type RegisterState = {
  success: boolean;
  error: string;
};

export async function registerAdminAction(
  prevState: RegisterState,
  formData: FormData,
) {
  const parse = registerAdminSchema
    .extend({
      "cf-turnstile-response": z
        .string()
        .min(1, "Security verification required"),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!parse.success) {
    return { success: false, error: prettifyError(parse.error) };
  }

  const token = parse.data["cf-turnstile-response"];
  const adminIp = await getClientIP();

  if (env.ENV === "production") {
    if (!adminIp) {
      return {
        success: false,
        error: "No request event found, please refresh the page and try again",
      };
    }

    const turnstileResponse = await validateTurnstile(token, adminIp);
    console.dir(turnstileResponse);

    if (!turnstileResponse.success) {
      return {
        success: false,
        error:
          "Turnstile captcha failed, please refresh the page and try again",
      };
    }
  }
}
