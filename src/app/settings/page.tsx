"use client";

import { useState } from "react";

import type { NextPage } from "next";

import { Button, Box } from "@mui/material";

import WhenToDance from "@/components/whenToDance";
import WhereToDance from "@/components/whereToDance";

const SettingsPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <main className="flex h-full flex-col items-center justify-between p-10 mt-16">
      <div className="flex flex-row items-center justify-center gap-4 w-full mb-4">
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
      <Box className="w-full mb-auto">
        {selectedTab === 0 && (
          <>
            <h2 className="text-3xl font-bold mb-8 text-font">
              When <br /> to Dance
            </h2>
            <div className="flex flex-col items-center justify-center">
              <WhenToDance />
            </div>
          </>
        )}
        {selectedTab === 1 && (
          <>
            <h2 className="text-3xl font-bold mb-4 text-font">
              Where <br /> to Dance
            </h2>
            <div className="flex flex-col items-center justify-center ">
              <WhereToDance />
            </div>
          </>
        )}
      </Box>
    </main>
  );
};

export default SettingsPage;
