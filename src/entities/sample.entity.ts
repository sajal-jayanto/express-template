import { EntitySchema } from "@mikro-orm/postgresql";

export interface SampleDto {
  sampleText: string;
}

export interface Sample {
  id: string;
  sampleText: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SampleSchema = new EntitySchema<Sample>({
  name: "Sample",
  tableName: "sample",
  properties: {
    id: { type: "string", primary: true, autoincrement: true },
    sampleText: { type: "string", length: 100, fieldName: "sample_text" },
    createdAt: { type: "Date", fieldName: "created_at", onCreate: () => new Date() },
    updatedAt: {
      type: "Date",
      fieldName: "updated_at",
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
    },
  },
});
