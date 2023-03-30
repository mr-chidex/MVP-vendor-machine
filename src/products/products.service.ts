import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../database/products.entity';
import { ROLE, User } from '../database/users.entity';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async addNewProduct(user: User, productDetails: ProductDto) {
    this.validateRole(user);

    const { amountAvailable, cost, productName } = productDetails;
    this.validateCost(cost);

    const product = await this.productRepository
      .create({ amountAvailable, cost, productName, sellerId: user.id })
      .save();

    return product;
  }

  validateRole(user: User) {
    if (user.role !== ROLE.SELLER) {
      throw new ForbiddenException(
        'Not a seller. Action surpported for only "sellers"',
      );
    }

    return;
  }

  validateCost(cost: number) {
    if (cost % 5 !== 0) {
      throw new BadRequestException('"Cost" can only be a multiple of 5');
    }
    return;
  }

  async getProducts() {
    return await this.productRepository.find();
  }

  async getProductById(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('product not found');

    return product;
  }

  async getProductByUserId(productId: number, user: User) {
    const product = await this.productRepository.findOne({
      where: { id: productId, sellerId: user.id },
    });

    if (!product) throw new NotFoundException('product not found');

    return product;
  }

  async removeProduct(id: number, user: User) {
    const product = await this.getProductByUserId(id, user);

    await product.remove();
  }

  async updateProduct(id: number, productDetails: ProductDto, user: User) {
    const product = await this.getProductByUserId(id, user);

    this.validateRole(user);

    const { amountAvailable, cost, productName } = productDetails;
    this.validateCost(cost);

    product.amountAvailable = amountAvailable;
    product.cost = cost;
    product.productName = productName;

    await product.save();

    return product;
  }
}
