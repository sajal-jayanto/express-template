import { z } from "zod";

export const numericIdSchema = z.object({
  id: z.coerce
    .number({ error: "'id' must be a number" })
    .int("'id' must be an integer")
    .positive("'id' must be a positive number"),
});

export const createSampleBodySchema = z.object({
  text: z
    .string({ error: "'text' is required" })
    .trim()
    .min(1, "'text' cannot be empty")
    .max(100, "'text' must be at most 100 characters"),
});

export const updateSampleBodySchema = createSampleBodySchema;
