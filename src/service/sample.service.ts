import { SampleDto } from "../entities/sample.entity.js";
import { HttpError } from "../middlewares/error.middleware.js";
import { SampleRepository } from "../repository/sample.repository.js";

export class SampleService {
  private sampleRepository = new SampleRepository();

  async findAll() {
    return this.sampleRepository.findAll();
  }

  async findOne(id: number) {
    return this.sampleRepository.findOne(id);
  }

  async create(payload: SampleDto) {
    const sample = await this.sampleRepository.create(payload);
    if (!sample) {
      throw new HttpError("Failed to create sample", 500);
    }
  }

  async update(id: number, payload: SampleDto) {
    const updated = await this.sampleRepository.update(id, payload);
    if (!updated) {
      throw new HttpError(`Sample with id '${id}' not found`, 404);
    }
    return updated;
  }

  async remove(id: number) {
    const removed = await this.sampleRepository.remove(id);
    if (!removed) {
      throw new HttpError(`Sample with id '${id}' not found`, 404);
    }
  }
}
