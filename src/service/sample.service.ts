import { SampleDto, SampleEntity } from "../entities/sample.entity.js";
import { getEntityManager } from "../db/mikro-orm.js";
import { HttpError } from "../middlewares/error.middleware.js";
import { StatusCodes } from "http-status-codes";
import { wrap } from "@mikro-orm/core";

const sampleNotFound = (_entityName: string, id: unknown) =>
  new HttpError(`Sample with id ${id} not found`, StatusCodes.NOT_FOUND);

export class SampleService {
  async findAllSample() {
    const dbEntityManager = getEntityManager();

    const data = await dbEntityManager.findAll(SampleEntity);
    return data;
  }

  async findSampleById(id: number) {
    const dbEntityManager = getEntityManager();

    const sample = await dbEntityManager.findOne(SampleEntity, { id });
    if (!sample) {
      throw new HttpError(`No data found with sample id ${id}`, StatusCodes.NOT_FOUND);
    }
    return sample;
  }

  async createSample(payload: SampleDto) {
    const dbEntityManager = getEntityManager();

    const sample = dbEntityManager.create(SampleEntity, payload);
    await dbEntityManager.flush();
    return sample;
  }

  async updateSampleById(id: number, payload: SampleDto) {
    const dbEntityManager = getEntityManager();
    const sample = await dbEntityManager.findOne(SampleEntity, { id });

    if (!sample) {
      throw new HttpError(`No data found with sample id ${id}`, StatusCodes.NOT_FOUND);
    }

    wrap(sample).assign(payload);
    await dbEntityManager.flush();
    return sample;
  }

  async removeSampleById(id: number) {
    const dbEntityManager = getEntityManager();

    const sample = await this.findSampleById(id);
    await dbEntityManager.remove(sample).flush();
  }
}
