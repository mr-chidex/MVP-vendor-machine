import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import 'dotenv/config';

import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DepositModule } from './deposit/deposit.module';
import { ResetModule } from './reset/reset.module';
import { ProductModule } from './products/products.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    DepositModule,
    ResetModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
