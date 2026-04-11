"use server";

import z from "zod/v4";
import { prisma } from "@/app/libs/prisma";
import { loginSchema } from "./types";
import { v4 as uuidv4 } from "uuid";
import {
  errorHandler,
  getClientIP,
  returnHandler,
  validateTurnstile,
} from "@/app/utils/utils";
import { env } from "@/app/libs/env";
import { resend } from "@/app/libs/resend";

type LoginState = {
  success: boolean;
  error: string;
};

export async function sendLoginLinkAction(
  prevState: LoginState,
  formData: FormData,
) {
  const parse = loginSchema
    .extend({
      "cf-turnstile-response": z
        .string()
        .min(1, "Security verification required"),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!parse.success) {
    return {
      success: false,
      error: parse.error.message,
    };
  }

  const { email } = parse.data;

  const token = parse.data["cf-turnstile-response"];
  const userIp = await getClientIP();

  if (env.ENV === "production") {
    if (!userIp) {
      return {
        success: false,
        error: "No request event found, please refresh the page and try again",
      };
    }

    const turnstileResponse = await validateTurnstile(token, userIp);
    console.dir(turnstileResponse);

    if (!turnstileResponse.success) {
      return {
        success: false,
        error:
          "Turnstile captcha failed, please refresh the page and try again",
      };
    }
  }

  const [user, userFindError] = await prisma.user
    .findUnique({
      where: { email },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (userFindError) {
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }

  if (!user) {
    return {
      success: false,
      error: "No account found with this email. Please sign up.",
    };
  }

  const verificationToken = uuidv4();

  const [, createError] = await prisma.verificationToken
    .create({
      data: {
        token: verificationToken,
        email: email,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (createError) {
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }

  const verificationLink = `${env.NEXT_PUBLIC_APP_URL}/api/verify?token=${verificationToken}&email=${email}`;

  const { error: emailError } = await resend.emails.send({
    from: "Celestia <auth@celestia.anuj.app>",
    to: [email],
    subject: "Verify your Celestia account",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #333; text-transform: uppercase; letter-spacing: 2px;">Welcome to Celestia</h2>
        <p style="color: #666; font-size: 16px;">Welcome back. Please click the button below to verify your email address and complete your registration.</p>
        <div style="margin: 30px 0;">
          <a href="${verificationLink}" style="background-color: #000; color: #fff; padding: 15px 25px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; border-radius: 5px;">Verify Email Address</a>
        </div>
        <p style="color: #999; font-size: 12px;">If the button above doesn't work, copy and paste this link into your browser:</p>
        <p style="color: #999; font-size: 12px;">${verificationLink}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #999; font-size: 12px; text-align: center;">&copy; 2026 Celestia. All rights reserved.</p>
      </div>
    `,
  });

  if (emailError) {
    console.error("Resend email error:", emailError);

    await prisma.verificationToken
      .delete({
        where: { token: verificationToken },
      })
      .catch((err) => {
        console.error("Failed to cleanup verification token:", err);
      });

    return {
      success: false,
      error: "Failed to send verification email. Please try again later.",
    };
  }

  return {
    success: true,
    error: "",
  };
}
