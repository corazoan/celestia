"use client";
import { use, useContext } from "react";
import { redirect } from "next/navigation";
import { UserContext } from "@/app/context/user-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ownerPromise = useContext(UserContext);

  if (!ownerPromise) {
    throw new Error("useContext must be used within a UserProvider");
  }

  const owner = use(ownerPromise);

  if (!owner) {
    return <>{children}</>;
  }

  if (owner.role === "user") {
    return <>{children}</>;
  }

  if (owner.admin) {
    redirect("/admin/dashboard");
  }

  return <>{children}</>;
}
