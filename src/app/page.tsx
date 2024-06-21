"use client";

import Image from "next/image";

import { useAuth } from "@clerk/nextjs";
import Button from "@mui/material/Button";

export default function Home() {
  const { isLoaded, userId } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-black via-gray-800 to-gray-600">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex ">
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Welcome to KrooveHub
          </h1>
          <Image
            src="/favicon.png"
            alt="KrooveHub Logo"
            width={200}
            height={200}
          />
          <p className="text-center text-white text-xl">
            Learn to Dance, Anytime, Anywhere
          </p>
          <Button
            variant="contained"
            color="primary"
            href={userId ? "/videos" : "/sign-in"}
          >
            {userId ? "Start Dancing" : "Sign In"}
          </Button>
        </div>
      </div>
    </main>
  );
}
