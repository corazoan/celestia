import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import {
  errorHandler,
  getClientIP,
  returnHandler,
  validateTurnstile,
} from "@/app/utils/utils";
import { compare } from "bcrypt";
import { loginSchema } from "./type";
import { prettifyError } from "zod/v4";
import { env } from "@/app/libs/env";
import { prisma } from "@/app/libs/prisma";

type adminLoginState = {
  error: string;
  success: boolean;
};

export default async function AdminLoginAction(
  prevState: adminLoginState,
  formData: FormData,
) {
  const parse = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parse.success) {
    return { error: prettifyError(parse.error), success: false };
  }

  const token = parse.data["cf-turnstile-response"];
  const adminIp = await getClientIP();

  if (env.ENV === "production" && !adminIp) {
    return {
      error: "No request event found, please refresh the page and try again",
      success: false,
    };
  }

  const turnstileResponse = await validateTurnstile(token, adminIp || "");

  if (!turnstileResponse.success) {
    return {
      error: "Turnstile captcha failed, please refresh the page and try again",
      success: false,
    };
  }

  const [user, userError] = await prisma.admin
    .findUnique({
      where: {
        email: parse.data.email,
        isActive: true,
      },
      select: {
        passwordHash: true,
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (userError) {
    return {
      error: "An unexpected error occurred, Something went wrong.",
      success: false,
    };
  }

  if (!user) {
    return {
      error: "There is no account with this email",
      success: false,
    };
  }

  const isPasswordValid = await compare(parse.data.password, user.passwordHash);

  if (!isPasswordValid) {
    return {
      error: "Invalid password, please try again",
      success: false,
    };
  }

  const sessionId = uuidv4();

  return {
    error: "",
    success: true,
  };
}

//first verify user input
// verify turnstile captcha
// check user have account
// check user password
