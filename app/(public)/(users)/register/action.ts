"use server";
import { prettifyError, z } from "zod/v4";
import { env } from "@/app/libs/env";
import { registerSchema } from "./types";
import { getClientIP } from "./utlis";
import { prisma } from "@/app/libs/prisma";
import { v4 as uuidv4 } from "uuid";
import { resend } from "@/app/libs/resend";

type RegisterState = {
  success: boolean;
  error: string;
};

export async function registerAction(
  prevState: RegisterState,
  formData: FormData,
) {
  const parse = registerSchema
    .extend({
      "cf-turnstile-response": z
        .string()
        .min(1, "Security verification required"),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!parse.success) {
    return { success: false, error: prettifyError(parse.error) };
  }

  const { email, firstName, lastName, phone } = parse.data;

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

  try {
    // Check for existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber: phone }],
      },
    });

    if (existingUser) {
      return {
        success: false,
        error: "A user with this email or phone number already exists.",
      };
    }

    const verificationToken = uuidv4();

    // Create User and Verification Token in a transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          email,
          firstName,
          lastName,
          phoneNumber: phone,
        },
      });

      await tx.verificationToken.create({
        data: {
          token: verificationToken,
          email: email,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
        },
      });
    });

    // Send verification email
    const verificationLink = `${env.NEXT_PUBLIC_APP_URL}/verify?token=${verificationToken}&email=${email}`;

    const { error: emailError } = await resend.emails.send({
      from: "Celestia <auth@celestia.anuj.app>",
      to: [email],
      subject: "Verify your Celestia account",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333; text-transform: uppercase; letter-spacing: 2px;">Welcome to Celestia</h2>
          <p style="color: #666; font-size: 16px;">Hello ${firstName},</p>
          <p style="color: #666; font-size: 16px;">Thank you for creating an account with Celestia. Please click the button below to verify your email address and complete your registration.</p>
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
    }

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.error("Registration database error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

async function validateTurnstile(token: string, remoteip: string) {
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
