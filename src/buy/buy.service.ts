import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

import { BuyDto } from './dto';
import { ROLE, User } from '../database/users.entity';
import { Product } from '../database/products.entity';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async buyProduct(user: User, buyDetails: BuyDto) {
    this.validateRole(user);

    const { productId, amountOfProduct } = buyDetails;

    const product = await this.getProductById(productId);

    const [amount, balance, productName] = await this.buyAction(
      user,
      product,
      amountOfProduct,
    );

    return {
      amountSpent: amount,
      balance,
      productName,
      productCount: amountOfProduct,
    };
  }

  validateRole(user: User) {
    if (user.role !== ROLE.BUYER) {
      throw new ForbiddenException(
        'Not a buyer. Action supported for only "buyers"',
      );
    }

    return;
  }

  async getProductById(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('product not found');

    return product;
  }

  async buyAction(user: User, product: Product, count: number) {
    const amount = count * product.cost;

    if (user.deposit < amount) {
      throw new BadRequestException(
        'Deposit balance is lesser than purchased items amount',
      );
    }

    user.deposit -= amount;

    await user.save();

    return [amount, user.deposit, product.productName];
  }
}
