import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { getCurrentUser } from "./libs/auth";
import UserProvider from "./context/user-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ADD THIS - Export metadata
export const metadata: Metadata = {
  title: "Celestia",
  description: "Your app description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userPromise = getCurrentUser();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <UserProvider userPromise={userPromise}>
          <Header />
          <main className="pt-15">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
