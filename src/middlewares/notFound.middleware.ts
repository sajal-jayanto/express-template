import type { Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

export default notFoundHandler;
