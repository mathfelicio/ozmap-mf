import { env } from 'process';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { loadEnv } from '../../common/helpers/load-env.helper';

loadEnv();

export const postgresOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST || 'postgres',
  port: Number(env.DB_PORT || 5432),
  username: env.DB_USERNAME || 'postgres',
  password: env.DB_PASSWORD || 'postgres',
  database: env.DB_DATABASE || 'ozmap_integration',
  synchronize: false,
  logging: false,
  migrationsRun: env.NODE_ENV === 'test',
  schema: env.DB_SCHEMA || 'public',
  entities: [path.resolve(__dirname, '..', '..', '**', '*-orm.entity{.ts,.js}')],
  entitySkipConstructor: true,
  migrations: [
    path.resolve(__dirname, '..', 'migrations', '*{.ts,.js}')
  ]
};

export const dataSourceOptions = postgresOrmConfig;

export default new DataSource(postgresOrmConfig);
