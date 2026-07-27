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
const getEntityManager = () => orm.em.fork();

export { initOrm, getOrm, getEntityManager };
