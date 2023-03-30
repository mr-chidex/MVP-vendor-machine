import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { User } from '../database/users.entity';
import { Product } from '../database/products.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product]), AuthModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
