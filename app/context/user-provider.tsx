"use client";
import { createContext } from "react";

export type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

export const UserContext = createContext<Promise<User | null> | null>(null);

export default function UserProvider({
  children,
  userPromise,
}: {
  children: React.ReactNode;
  userPromise: Promise<User | null>;
}) {
  return <UserContext value={userPromise}>{children}</UserContext>;
}
