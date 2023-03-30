import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';
import { User } from '../database/users.entity';
import { AuthModule } from '../auth/auth.module';
import { Product } from '../database/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  providers: [BuyService],
  controllers: [BuyController],
})
export class BuyModule {}
