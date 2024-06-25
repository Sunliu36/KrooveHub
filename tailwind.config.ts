import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "black": "black",
      // },
      colors: {
        advanced: "#CB8736",
        beginner: "#CB5AD6",
        intermediate: "#5AA2D6",
        purple1: "#EF42B4",
        gray1: "#8E91A5",
      },
    },
  },
  plugins: [],
};
export default config;
