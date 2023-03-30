import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductService } from './products.service';
import { GetUser } from '../auth/decorators';
import { User } from '../database/users.entity';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  addProduct(@GetUser() user: User) {
    return this.productService.addNewProduct(user, 'productDetails');
  }
}
