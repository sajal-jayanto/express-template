import { Router, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { getOrm } from "../db/mikro-orm.js";

export const healthRouter = Router();

healthRouter.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const db = await getOrm().checkConnection();
    let statusCodes = StatusCodes.OK;
    let status = "ok";
    let reason = {};

    if (!db.ok) {
      statusCodes = StatusCodes.SERVICE_UNAVAILABLE;
      status = "error";
      reason = db.reason;
    }

    const response = {
      status,
      time: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status,
        ...(reason ? {} : reason),
      },
    };

    res.status(statusCodes).json(response);
  }),
);
