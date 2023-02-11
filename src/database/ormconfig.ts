import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';
import path from 'path';
import { Package, StorageLocation, PackageTransation, PackageCategory } from '../core';

const connectionConfig: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  entities: [Package, StorageLocation, PackageTransation, PackageCategory],
  logging: false,
  cli: {
    migrationsDir: path.resolve(__dirname, 'migrations'),
  },
  migrations: [path.resolve(__dirname, 'migrations', '*{.ts,.js}')],
};

export default connectionConfig;
