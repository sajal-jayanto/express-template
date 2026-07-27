import { Sample, SampleDto, SampleSchema } from "../entities/sample.entity.js";
import { getRepository } from "../db/mikro-orm.js";
import { lazyLoadDbEntity } from "../utils/lazy.js";

export class SampleRepository {
  private repo = lazyLoadDbEntity(() => getRepository(SampleSchema));

  async findAll() {
    return this.repo().findAll();
  }

  async findOne(id: number) {
    return this.repo().findOne({ id: String(id) });
  }

  async create(payload: SampleDto) {
    const entity = this.repo().create(payload as Sample);
    await this.repo().getEntityManager().flush();
    return entity;
  }

  async update(id: number, payload: SampleDto) {
    const sample = await this.findOne(id);
    if (!sample) {
      return null;
    }
    sample.sampleText = payload.sampleText;
    await this.repo().getEntityManager().flush();
    return sample;
  }

  async remove(id: number) {
    const sample = await this.findOne(id);
    if (!sample) {
      return false;
    }
    const em = this.repo().getEntityManager();
    em.remove(sample);
    await em.flush();
    return true;
  }
}
