"use client";

import Link from "next/link";

import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, userId } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded) {
    return null;
  }

  return (
    <Link href={!userId ? "/sign-in" : "/videos"} passHref>
      <main className="flex flex-col min-h-screen ">
        <div className="flex flex-grow flex-col items-center justify-center z-10 w-full max-w-5xl font-mono text-sm lg:flex">
          <div className="flex flex-col items-center justify-center w-full gap-3">
            <h1 className="text-7xl font-bold align-middle mb-60 text-white">
              KROOVE
              <br />
              Hub
            </h1>
          </div>
        </div>
      </main>
    </Link>
  );
}
