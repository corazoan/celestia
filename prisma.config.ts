import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  schema: "prisma/models", // Include both!
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
