import { RequestContext } from "@mikro-orm/postgresql";
import cors from "cors";
import express from "express";
import { getOrm } from "./db/mikro-orm.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import notFoundHandler from "./middlewares/notFound.middleware.js";
import { requestLogger } from "./middlewares/requestLogger.middleware.js";
import { healthRouter } from "./routes/health.routes.js";
import { sampleRouter } from "./routes/sample.routes.js";

const createApp = () => {
  const app = express();

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
