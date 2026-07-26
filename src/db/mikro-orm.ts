import { MikroORM, type EntityName } from "@mikro-orm/postgresql";
import { dbConfig } from "../config/orm.config.js";

let orm: MikroORM;

const initOrm = async (): Promise<MikroORM> => {
  orm = await MikroORM.init(dbConfig);
  await orm.connect();
  const check = await orm.checkConnection();
  if (!check.ok) {
    throw check.error ?? new Error(check.reason);
  }
  return orm;
};

const getOrm = () => orm;

const getEM = () => orm.em.fork();

// Safe to call once and reuse: every repository method resolves the current
// request's forked EntityManager internally via RequestContext (AsyncLocalStorage),
// as long as the RequestContext middleware is registered (see app.ts).
const getRepository = <T extends object>(entity: EntityName<T>) => orm.em.getRepository(entity);

export { initOrm, getOrm, getEM, getRepository };
