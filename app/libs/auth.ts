import { cookies } from "next/headers";
import { prisma } from "../libs/prisma";
import { errorHandler, returnHandler } from "../utils/utils";
import { cache } from "react";
import type { User, Admin } from "../context/user-provider";

export const getCurrentUser = cache(
  async (): Promise<
    { role: "admin"; admin: Admin } | { role: "user"; user: User } | null
  > => {
    "use server";
    console.log("get current user action is called");
    const cookieStore = await cookies();
    const session = cookieStore.get("sessionId");
    if (!session) return null;

    const [owner] = await prisma.session
      .findUnique({
        where: {
          id: session.value,
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phoneNumber: true,
            },
          },
          admin: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phoneNumber: true,
            },
          },
        },
      })
      .then(returnHandler)
      .catch(errorHandler);

    if (owner?.admin) {
      return { role: "admin", admin: owner.admin };
    }

    if (owner?.user) {
      return { role: "user", user: owner.user };
    }

    return null;
  },
);
