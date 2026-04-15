"use client";
import { use } from "react";
import { redirect } from "next/navigation";
import { UserContext } from "@/app/context/user-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ownerPromise = use(UserContext);
  if (!ownerPromise) return null;

  const owner = use(ownerPromise);
  if (!owner) return null;

  if (owner.role === "user") {
    return null;
  }

  if (owner.role === "admin") {
    redirect("/admin/dashboard");
  }

  return <div>{children}</div>;
}
