import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500, options?: { cause?: unknown }) {
    super(message, options);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const message = err instanceof HttpError ? err.message : "Internal Server Error";

  if (env.nodeEnv !== "test") {
    req.log.error(err);
  }

  res.status(statusCode).json({
    statusCode: statusCode,
    message: message,
    ...(env.nodeEnv === "development" && { stack: err.stack }),
  });
}
