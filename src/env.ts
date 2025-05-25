import "dotenv/config";

import { z as zod } from "zod";

const envSchema = zod.object({
  CORS_ORIGIN: zod.string().optional().default("*"),

  BASE_URL: zod.string(),
  PORT: zod.coerce.number().optional().default(3000),

  DATABASE_URL: zod.string(),

  NODE_ENV: zod.string().optional().default("development"),
});

export default envSchema.parse(process.env);
