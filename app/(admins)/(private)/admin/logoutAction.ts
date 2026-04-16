"use server";
import { cookies } from "next/headers";
import { prisma } from "@/app/libs/prisma";
import { errorHandler, returnHandler } from "@/app/utils/utils";
import { redirect } from "next/navigation";
export async function adminLogoutAction() {
  console.log("hello");
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
  console.log("delete");
  cookieStore.delete("sessionId");
  redirect("/admin/login");
}
