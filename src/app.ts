import express from "express";

import cors from "cors";
import helmet from "helmet";
import { getOrm } from "./db/mikro-orm.js";
import { RequestContext } from "@mikro-orm/postgresql";
import { errorHandler } from "./middlewares/error.middleware.js";
import { requestLogger } from "./middlewares/requestLogger.middleware.js";
import { notFoundHandler } from "./middlewares/notFound.middleware.js";

import { healthRouter } from "./routes/health.routes.js";
import { sampleRouter } from "./routes/sample.routes.js";

const app = express();

const createApp = () => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);
  app.use((_req, _res, next) => RequestContext.create(getOrm().em, next));

  app.use("/health", healthRouter);
  app.use("/sample", sampleRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
