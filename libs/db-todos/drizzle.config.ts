import type { Config } from "drizzle-kit";

import { env } from "./env";

export default {
  schema: "./src/tables.ts",
  driver: "pg",
  dbCredentials: { connectionString: env.DB_TODOS_URL },
} satisfies Config;
