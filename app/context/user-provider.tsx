"use client";
import { createContext } from "react";

export type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

export type Admin = {
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  email: string;
};

export const UserContext = createContext<Promise<
  { role: "user"; user: User } | { role: "admin"; admin: Admin } | null
> | null>(null);

export default function UserProvider({
  children,
  userPromise,
}: {
  children: React.ReactNode;
  userPromise: Promise<
    { role: "user"; user: User } | { role: "admin"; admin: Admin } | null
  > | null;
}) {
  return <UserContext value={userPromise}>{children}</UserContext>;
}
