import createApp from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { initOrm } from "./db/mikro-orm.js";
import { initMigrations } from "./db/init-migrate.js";

const app = createApp();
const PORT = Number(env.port) || 3000;

const startServer = async () => {
  // ======================= Database Connection ==============================
  const orm = await initOrm().catch((err: unknown) => {
    logger.error(err, "❌ Failed to connect to database, aborting startup");
    process.exit(1);
  });
  logger.info("✅ Connected to database successfully.");

  // ======================= Run Migrations ==============================
  await initMigrations().catch((err: unknown) => {
    logger.error(err, "❌ Failed to run migrations, aborting startup");
    process.exit(1);
  });
  logger.info("✅ Migrations up to date.");

  // ======================= Start Server ==============================
  app.listen(PORT, () => {
    logger.info(`✅ Service listening on port ${PORT} [${env.nodeEnv}]`);
  });

  process.on("SIGTERM", async () => {
    await orm.close();
    process.exit(0);
  });
};

startServer();
