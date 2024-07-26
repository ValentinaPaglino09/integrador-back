import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORM = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: '',
    port: 1,
    username: '',
    password: '',
    database: '',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
    // logging: true,
  };
};