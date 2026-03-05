import { env } from "process";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { loadEnv } from "../../common/helpers/load-env.helper";

loadEnv();

export const mysqlOrmConfig: DataSourceOptions = {
  type: "mysql",
  host: env.DB_HOST || "mysql",
  port: Number(env.DB_PORT || 3306),
  username: env.DB_USERNAME || "root",
  password: env.DB_PASSWORD || "root",
  database: env.DB_DATABASE || "ozmap_integration",
  synchronize: false,
  logging: false,
  migrationsRun: env.NODE_ENV === "test",
  entities: [
    path.resolve(__dirname, "..", "..", "**", "*-orm.entity{.ts,.js}"),
  ],
  entitySkipConstructor: true,
  migrations: [path.resolve(__dirname, "..", "migrations", "*{.ts,.js}")],
};

export const dataSourceOptions = mysqlOrmConfig;

export default new DataSource(mysqlOrmConfig);
