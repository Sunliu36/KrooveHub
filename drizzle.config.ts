import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

import { privateEnv } from "./src/lib/env/private";

// this file is for drizzle-kit, which is used to do our database migrations
dotenv.config({ path: "./.env" });

if (!privateEnv.POSTGRES_URL) {
  throw new Error("POSTGRES_URL must be defined in .env");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: { connectionString: privateEnv.POSTGRES_URL },
} satisfies Config;
