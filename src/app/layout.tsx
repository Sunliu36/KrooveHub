import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import NavBar from "@/components/navbar";
import SwitchBar from "@/components/switchBar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Kroove Hub",
  description:
    "A platform for dancers to share their moves, learn from others, and connect with the community.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </head>
        <body className={`h-full ${inter.className}`}>
          <NavBar />
          <SwitchBar />
          <div className="">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
