"use client";
import SideBar from "../admin/_component/SideBar";
import Header from "../admin/_component/Header";
import { UserContext } from "@/app/context/user-provider";
import { use, useContext } from "react";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ownerPromise = useContext(UserContext);
  console.log("ownerPromise", ownerPromise);
  if (!ownerPromise) {
    throw new Error("useContext must be used within a UserProvider");
  }
  const owner = use(ownerPromise);
  if (!owner) {
    redirect("/admin/login");
  }
  if (owner.role === "user") {
    redirect("/admin/login");
  }

  return (
    <div className="flex -mt-15 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <SideBar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden text-foreground">
        <Header />
        {children}
      </main>
    </div>
  );
}
