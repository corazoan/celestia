"use client";
import { useContext, use } from "react";
import { UserContext } from "@/app/context/user-provider";
import { redirect } from "next/navigation";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = useContext(UserContext);

  if (!userPromise) {
    throw new Error("useContext must be used within a UserProvider");
  }

  const user = use(userPromise);

  if (user) {
    redirect("/account");
  }

  return <main>{children}</main>;
}
