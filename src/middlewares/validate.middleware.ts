import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { HttpError } from "./error.middleware.js";

type ValidationSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

const formatZodError = (error: ZodError) =>
  error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

export const validateSchema =
  ({ body, params, query }: ValidationSchemas) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (body) req.body = body.parse(req.body);
      if (params) req.params = params.parse(req.params) as typeof req.params;
      if (query) req.query = query.parse(req.query) as typeof req.query;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = formatZodError(err);
        next(new HttpError("Validation failed", 400, { details }));
        return;
      }
      next(err);
    }
  };
