"use server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { errorHandler, returnHandler } from "@/app/utils/utils";
import { compare } from "bcrypt";
import { loginSchema } from "./type";
import { prettifyError } from "zod/v4";
import { env } from "@/app/libs/env";
import { prisma } from "@/app/libs/prisma";
import { redirect } from "next/navigation";
import { getClientIP, validateTurnstile } from "@/app/utils/server_utils";

type adminLoginState = {
  error: string;
  success: boolean;
};

export default async function AdminLoginAction(
  prevState: adminLoginState,
  formData: FormData,
) {
  const cookieStore = await cookies();
  const parse = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parse.success) {
    return { error: prettifyError(parse.error), success: false };
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

  const [admin, userError] = await prisma.admin
    .findUnique({
      where: {
        email: parse.data.email,
        isActive: true,
      },
      select: {
        passwordHash: true,
        id: true,
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

  if (!admin) {
    return {
      error: "There is no account with this email",
      success: false,
    };
  }
  console.log("passwordHash", admin.passwordHash);
  console.log("password", parse.data.password);
  const isPasswordValid = await compare(
    parse.data.password,
    admin.passwordHash,
  );

  console.log("isPasswordValid", isPasswordValid);
  if (!isPasswordValid) {
    return {
      error: "Invalid password, please try again",
      success: false,
    };
  }

  const sessionId = uuidv4();
  const [session, sessionErr] = await prisma.session
    .create({
      data: {
        id: sessionId,
        adminId: admin.id,
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (sessionErr) {
    return {
      error: "An unexpected error occurred, Something went wrong.",
      success: false,
    };
  }

  cookieStore.set("sessionId", session.id, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin/dashboard");
}

//first verify user input
// verify turnstile captcha
// check user have account
// check user password
// create session
// set cookies
