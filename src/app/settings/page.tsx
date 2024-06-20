"use client";

import { useState } from "react";

import type { NextPage } from "next";

import { Button, Box } from "@mui/material";

import WhenToDance from "@/components/whenToDance";
import WhereToDance from "@/components/whereToDance";

const SettingsPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex ">
        <h1 className="text-3xl font-bold mb-2 text-center">Dance Settings</h1>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 w-full mb-auto">
        <Button
          variant="outlined"
          onClick={() => setSelectedTab(0)}
          sx={{
            borderColor: "white",
            "&:hover": {
              color: "white",
            },
            color: "white",
          }}
        >
          When
        </Button>
        <Button
          variant="outlined"
          onClick={() => setSelectedTab(1)}
          sx={{
            borderColor: "white",
            "&:hover": {
              color: "white",
            },
            color: "white",
          }}
        >
          Where
        </Button>
      </div>
      <Box className="w-full mt-4 mb-auto">
        {selectedTab === 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-2 text-center">
              When <br /> to Dance
            </h2>
            <p className="text-center">
              Choose the time that suits you best and start dancing today.
            </p>
            <div className="flex flex-col items-center justify-center">
              <WhenToDance />
            </div>
          </div>
        )}
        {selectedTab === 1 && (
          <div>
            <h2 className="text-3xl font-bold mb-2 text-center">
              Where <br /> to Dance
            </h2>
            <p className="text-center">
              Choose the place that suits you best and start dancing today.
            </p>
            <div className="flex flex-col items-center justify-center ">
              <WhereToDance />
            </div>
          </div>
        )}
      </Box>
    </main>
  );
};

export default SettingsPage;
