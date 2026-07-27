import { StatusCodes } from "http-status-codes";
import { SampleDto } from "../entities/sample.entity.js";
import { HttpError } from "../middlewares/error.middleware.js";
import { SampleRepository } from "../repository/sample.repository.js";

export class SampleService {
  private sampleRepository = new SampleRepository();

  async findAllSample() {
    return this.sampleRepository.findAll();
  }

  async findSampleById(id: number) {
    return this.sampleRepository.findOne(id);
  }

  async createSample(payload: SampleDto) {
    const sample = await this.sampleRepository.create(payload);
    if (!sample) {
      throw new HttpError("Failed to create sample", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async updateSampleById(id: number, payload: SampleDto) {
    const updated = await this.sampleRepository.update(id, payload);
    if (!updated) {
      throw new HttpError(`Sample with id '${id}' not found`, StatusCodes.NOT_FOUND);
    }
    return updated;
  }

  async removeSampleById(id: number) {
    const removed = await this.sampleRepository.remove(id);
    if (!removed) {
      throw new HttpError(`Sample with id '${id}' not found`, StatusCodes.NOT_FOUND);
    }
  }
}
