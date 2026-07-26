import { defineConfig } from "@mikro-orm/postgresql";
import { SampleSchema } from "../entities/sample.entity.js";
import { env } from "./env.js";

const dbConfig = defineConfig({
  entities: [SampleSchema],
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  dbName: env.db.name,
  debug: env.nodeEnv === "development",
  ensureDatabase: false,
});

export { dbConfig };
