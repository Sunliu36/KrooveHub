import Image from "next/image";

import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <h1 className="text-4xl font-bold text-center">
            Welcome to GrooveHub
          </h1>
          <Image
            src="favicon.png"
            alt="GrooveHub Logo"
            width={200}
            height={200}
          />
          <p className="text-center">
            A platform for dancers to share their moves, learn from others, and
            connect with the community.
          </p>
          <Button variant="contained" color="primary" href="/signup">
            Get Started
          </Button>
        </div>
      </div>
    </main>
  );
}
