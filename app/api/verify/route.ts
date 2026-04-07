import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/app/libs/prisma";
import { verifyTokenSchema } from "./types";
import { env } from "@/app/libs/env";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const parse = verifyTokenSchema.safeParse({ email, token });

  if (!parse.success) {
    return NextResponse.redirect(
      new URL(
        `/verify-error?message=${encodeURIComponent("The verification link is invalid or incomplete.")}`,
        request.url,
      ),
    );
  }

  try {
    const session = await prisma.$transaction(async (tx) => {
      const verificationToken = await tx.verificationToken.findFirst({
        where: { email: email as string, token: token as string },
      });

      if (!verificationToken) {
        throw new Error("Invalid verification link.");
      }

      if (verificationToken.expiresAt < new Date()) {
        throw new Error("Verification link has expired.");
      }

      const user = await tx.user.findFirst({
        where: { email: verificationToken.email },
        select: { id: true },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      await tx.user.update({
        where: { email: verificationToken.email },
        data: { verified: true },
      });

      await tx.verificationToken.delete({
        where: { id: verificationToken.id },
      });

      const newSession = await tx.session.create({
        data: { userId: user.id },
      });

      return newSession;
    });

    // We can safely set cookies in a Route Handler
    const cookieStore = await cookies();
    cookieStore.set("session", session.id, {
      path: "/",
      httpOnly: true,
      secure: env.ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 1000 * 60 * 60),
    });

    // Redirect to a success page or dashboard after setting the cookie
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error(error);

    // Default error message
    let errorMessage = "Verification failed.";

    // If it's a known error from our logic, use it
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Redirect to an error page with the specific message
    return NextResponse.redirect(
      new URL(
        `/verify-error?message=${encodeURIComponent(errorMessage)}`,
        request.url,
      ),
    );
  }
}
