"use client";
import { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex -mt-15 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden text-foreground">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        {children}
      </main>
    </div>
  );
}
