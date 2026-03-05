import { env } from "process";
import path from "path";
import { DataSourceOptions } from "typeorm";
import { loadEnv } from "../../common/helpers/load-env.helper";

loadEnv();

export const mongoOrmConfig: DataSourceOptions = {
  type: "mongodb",
  host: env.MONGO_HOST || "ozmap-mongodb",
  port: parseInt(env.MONGO_PORT || "27017", 10),
  username: env.MONGO_USERNAME || "root",
  password: env.MONGO_PASSWORD || "root",
  database: env.MONGO_DATABASE || "ozmap_integration",
  authSource: env.MONGO_AUTH_SOURCE || "admin",
  synchronize: false,
  entities: [
    path.resolve(__dirname, "..", "..", "**", "*.mongoEntity{.ts,.js}"),
  ],
};
