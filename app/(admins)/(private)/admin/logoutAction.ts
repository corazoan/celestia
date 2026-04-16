"use server";
import { cookies } from "next/headers";
import { prisma } from "@/app/libs/prisma";
import { errorHandler, returnHandler } from "@/app/utils/utils";
import { redirect } from "next/navigation";
export async function adminLogoutAction() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId");
  if (sessionId) {
    await prisma.session
      .delete({
        where: { id: sessionId.value },
      })
      .then(returnHandler)
      .catch(errorHandler);
  }

  cookieStore.delete("sessionId");
  redirect("/admin/login");
}
