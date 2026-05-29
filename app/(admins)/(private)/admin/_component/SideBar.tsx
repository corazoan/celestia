"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { adminLogoutAction } from "../logoutAction";

interface SubItem {
  label: string;
  href: string;
}

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  subItems?: SubItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    href: "/admin/dashboard",
  },
  {
    label: "Products",
    href: "/admin/products/list",
    icon: (
      <>
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </>
    ),
    subItems: [
      { label: "Product List", href: "/admin/products/list" },
      { label: "Category", href: "/admin/products/category" },
      { label: "Units", href: "/admin/products/units" },
      { label: "Add Product", href: "/admin/products/add-product" },
    ],
  },
  {
    label: "Sales",
    icon: (
      <>
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
    href: "/admin/sales",
  },
  {
    label: "Customers",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </>
    ),
    href: "/admin/customers",
  },
  {
    label: "Analytics",
    icon: (
      <>
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </>
    ),
    href: "/admin/analytics",
  },
  {
    label: "Notifications",
    icon: (
      <>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </>
    ),
    href: "/admin/notifications",
  },
  {
    label: "Settings",
    icon: (
      <>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    href: "/admin/settings",
  },
];

export default function SideBar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Close sidebar on mobile when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  // Auto-open menu if current pathname matches a sub-item
  useEffect(() => {
    sidebarItems.forEach((item) => {
      if (item.subItems?.some((sub) => pathname === sub.href)) {
        setOpenMenus((prev) =>
          prev.includes(item.label) ? prev : [...prev, item.label],
        );
      }
    });
  }, [pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-zinc-950/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`w-64 bg-background border-r border-zinc-200 dark:border-zinc-800 flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform lg:translate-x-0  lg:h-screen lg:sticky top-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <div>
            <Link href="/">
              <span className="text-2xl font-bold tracking-tighter uppercase italic">
                CELESTIA
              </span>
            </Link>
            <p className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase mt-1">
              Admin Console
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-zinc-400 hover:text-foreground transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const hasSubItems = !!item.subItems?.length;
            const isOpen = openMenus.includes(item.label);
            const isActive =
              pathname === item.href ||
              item.subItems?.some((sub) => pathname === sub.href);

            return (
              <div key={item.label} className="space-y-1">
                {hasSubItems ? (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors rounded-none ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {item.icon}
                      </svg>
                      {item.label}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors rounded-none ${
                      pathname === item.href
                        ? "bg-foreground text-background"
                        : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {item.icon}
                    </svg>
                    {item.label}
                  </Link>
                )}

                {hasSubItems && isOpen && (
                  <div className="pl-12 space-y-1">
                    {item.subItems?.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className={`block py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                          pathname === sub.href
                            ? "text-foreground"
                            : "text-zinc-500 hover:text-foreground"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-900">
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Log out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
