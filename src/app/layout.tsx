import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "@/components/navbar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Groove Hub",
  description:
    "A platform for dancers to share their moves, learn from others, and connect with the community.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <div className="fixed top-0 left-0 right-0 z-10 bg-black shadow-md h-16">
          <NavBar />
        </div>
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
