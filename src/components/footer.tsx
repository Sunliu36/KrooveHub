import React from "react";

import { Typography } from "@mui/material";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="container mx-auto">
      <div className="flex flex-wrap items-end justify-center gap-y-4 gap-x-8 border-t border-blue-gray-50 py-6 md:justify-between">
        <div className="text-center md:text-start">
          <Typography className="font-normal !text-blue-700 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
              />
            </svg>
            <a href="https://github.com/hollow-leaf/Konan">
              Following our Github here !
            </a>
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
