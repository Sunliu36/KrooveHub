import type { NextPage } from "next";

import WhereToDance from "@/components/whereToDance";

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex ">
        <h1 className="text-3xl font-bold mb-2">
          Where <br /> to Dance
        </h1>
        <p className="text-center">
          Choose the place that suits you best and start dancing today.
        </p>
        <WhereToDance />
      </div>
    </main>
  );
};
export default Home;
