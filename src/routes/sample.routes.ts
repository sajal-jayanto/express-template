import { Router, type Request, type Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { SampleService } from "../service/sample.service.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  createSampleBodySchema,
  numericIdSchema,
  updateSampleBodySchema,
} from "../schemas/sample.schema.js";

export const sampleRouter = Router();
const sampleService = new SampleService();

sampleRouter.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const samples = await sampleService.findAllSample();
    res.status(200).json(samples);
  }),
);

sampleRouter.get(
  "/:id",
  validateSchema({ params: numericIdSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const sample = await sampleService.findSampleById(id);
    res.status(200).json(sample);
  }),
);

sampleRouter.post(
  "/",
  validateSchema({ body: createSampleBodySchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const { text } = req.body;
    const sample = await sampleService.createSample({ sampleText: text });
    res.status(201).json(sample);
  }),
);

sampleRouter.put(
  "/:id",
  validateSchema({ params: numericIdSchema, body: updateSampleBodySchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { text } = req.body;
    const sample = await sampleService.updateSampleById(id, { sampleText: text });
    res.status(200).json(sample);
  }),
);

sampleRouter.delete(
  "/:id",
  validateSchema({ params: numericIdSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await sampleService.removeSampleById(id);
    res.status(204).send();
  }),
);
