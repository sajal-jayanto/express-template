import { Router, type Request, type Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { HttpError } from "../middlewares/error.middleware.js";
import { SampleService } from "../service/sample.service.js";

export const sampleRouter = Router();

const sampleService = new SampleService();

sampleRouter.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const samples = await sampleService.findAll();
    res.status(200).json(samples);
  }),
);

sampleRouter.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const sample = await sampleService.findOne(id);
    res.status(200).json(sample);
  }),
);

sampleRouter.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
      throw new HttpError("'sampleText' is required", 400);
    }
    const sample = await sampleService.create({ sampleText: text });
    res.status(201).json(sample);
  }),
);

sampleRouter.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { text } = req.body;
    if (!text) {
      throw new HttpError("'sampleText' is required", 400);
    }
    const sample = await sampleService.update(id, { sampleText: text });
    res.status(200).json(sample);
  }),
);

sampleRouter.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await sampleService.remove(id);
    res.status(204).send();
  }),
);
