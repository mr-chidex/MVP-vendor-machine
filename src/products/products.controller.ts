import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  ValidationPipe,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductService } from './products.service';
import { GetUser } from '../auth/decorators';
import { User } from '../database/users.entity';
import { ProductDto } from './dto';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard())
  addProduct(
    @GetUser() user: User,
    @Body(ValidationPipe) productDetails: ProductDto,
  ) {
    return this.productService.addNewProduct(user, productDetails);
  }

  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getAllProduct(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.getProductById(productId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@GetUser() user: User, @Param('id', ParseIntPipe) productId: number) {
    return this.productService.removeProduct(productId, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) productId: number,
    @Body(ValidationPipe) productDetails: ProductDto,
  ) {
    return this.productService.updateProduct(productId, productDetails, user);
  }
}
