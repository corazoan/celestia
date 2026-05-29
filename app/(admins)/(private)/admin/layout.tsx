import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/libs/auth";
import SidebarWrapper from "./_component/SidebarWrapper";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const owner = await getCurrentUser();

  if (!owner) {
    redirect("/admin/login");
  }

  if (owner.role === "user") {
    redirect("/admin/login");
  }

  return <SidebarWrapper>{children}</SidebarWrapper>;
}
