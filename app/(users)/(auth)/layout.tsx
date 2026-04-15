"use client";
import { useContext, use } from "react";
import { UserContext } from "@/app/context/user-provider";
import { redirect } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = useContext(UserContext);

  if (!userPromise) {
    return null;
  }

  const user = use(userPromise);

  if (user) {
    redirect("/account");
  }

  return <>{children}</>;
}
