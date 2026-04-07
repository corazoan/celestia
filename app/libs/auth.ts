import { cookies } from "next/headers";
import { prisma } from "../libs/prisma";
import { errorHandler, returnHandler } from "../utils/utils";
import { cache } from "react";
import type { User } from "../context/user-provider";

export const getCurrentUser = cache(async (): Promise<User | null> => {
  "use server";
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return null;

  const [user] = await prisma.session
    .findUnique({
      where: {
        id: session.value,
      },
    })
    .user({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    })
    .then(returnHandler)
    .catch(errorHandler);

  if (user) return user;
  return null;
});
