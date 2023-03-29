import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../database/users.entity';
import { Product } from '../database/products.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOSTNAME,
  port: (process.env.DB_PORT && parseInt(process.env.DB_PORT)) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User, Product],
};
