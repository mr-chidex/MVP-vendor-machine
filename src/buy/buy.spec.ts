import { NotFoundException } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../database/products.entity';
import { User } from '../database/users.entity';
import { BuyService } from './buy.service';
import { BuyDto } from './dto';

describe('BuyService', () => {
  let buyService: BuyService;
  let productRepository: any;

  const mockProductRepository = () => ({
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BuyService,
        JwtService,
        {
          provide: getRepositoryToken(Product),
          useFactory: mockProductRepository,
        },
      ],
    }).compile();

    buyService = module.get<BuyService>(BuyService);
    productRepository = module.get(getRepositoryToken(Product));
  });

  describe('validateRole', () => {
    it('should throw error if user role is not "buyer"', () => {
      const user = {
        username: 'test',
        password: 'test123',
        role: 'seller',
      } as User;

      expect(buyService.validateRole.bind(this, user)).toThrow(
        ForbiddenException,
      );
    });

    it('should return undefined if role is  "buyer"', () => {
      const user = {
        username: 'test',
        password: 'test123',
        role: 'buyer',
      } as User;

      expect(buyService.validateRole(user)).toBeUndefined();
    });
  });

  describe('getProductById', () => {
    it('should throw error if product is not found', () => {
      productRepository.findOne.mockResolvedValue(null);

      expect(buyService.getProductById(1)).rejects.toThrow(NotFoundException);
    });

    it('should return product', async () => {
      const mockProduct = { productName: 'Pen' };

      productRepository.findOne.mockResolvedValue(mockProduct);

      const result = await buyService.getProductById(1);
      expect(result.productName).toBe(mockProduct.productName);
    });
  });

  describe('buyAction', () => {
    it('should throw BadRequestException error if user deposit is less tahn amount', () => {
      const user = {
        username: 'test',
        password: 'test123',
        deposit: 0,
      } as User;

      const product = {
        productName: 'Tea',
        cost: 20,
      } as Product;

      expect(buyService.buyAction(user, product, 1)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return array containing amount, user deposit and productName', async () => {
      const user = {
        username: 'test',
        password: 'test123',
        deposit: 100,
      } as User;

      const product = {
        productName: 'Tea',
        cost: 20,
      } as Product;

      user.save = jest.fn();
      const result = await buyService.buyAction(user, product, 1);

      expect(result).toEqual([20, 100 - 20, product.productName]);
    });
  });

  describe('buyProduct', () => {
    const user = {
      username: 'test',
      password: 'test123',
    } as User;

    const product = {
      productName: 'test',
      cost: 20,
    } as Product;

    it('should return purchase details', async () => {
      const buyDetails: BuyDto = { productId: 1, amountOfProduct: 1 };

      buyService.validateRole = jest.fn().mockReturnValue(true);
      buyService.getProductById = jest.fn().mockResolvedValue(product);
      buyService.buyAction = jest.fn().mockResolvedValue([10, 50, 'tea']);

      const result = await buyService.buyProduct(user, buyDetails);

      expect(result.amountSpent).toEqual(10);
      expect(result.balance).toEqual(50);
      expect(result.productName).toEqual('tea');
      expect(result.productCount).toEqual(buyDetails.amountOfProduct);
    });
  });
});
