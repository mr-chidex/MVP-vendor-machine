import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../database/products.entity';
import { User } from '../database/users.entity';
import { DepositService } from './deposit.service';
import { DepositDto } from './dto';

describe('BuyService', () => {
  let depositService: DepositService;
  let productRepository: any;

  const mockProductRepository = () => ({
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DepositService,
        JwtService,
        {
          provide: getRepositoryToken(Product),
          useFactory: mockProductRepository,
        },
      ],
    }).compile();

    depositService = module.get<DepositService>(DepositService);
    productRepository = module.get(getRepositoryToken(Product));
  });

  describe('validateRole', () => {
    it('should throw error if user role is not "buyer"', () => {
      const user = {
        username: 'test',
        password: 'test123',
        role: 'seller',
      } as User;

      expect(depositService.validateRole.bind(this, user)).toThrow(
        ForbiddenException,
      );
    });

    it('should return undefined if role is  "buyer"', () => {
      const user = {
        username: 'test',
        password: 'test123',
        role: 'buyer',
      } as User;

      expect(depositService.validateRole(user)).toBeUndefined();
    });
  });

  describe('depositCoin', () => {
    const user = {
      username: 'test',
      password: 'test123',
    } as User;

    it('should return user  on successful deposit of coin', async () => {
      const depositDetails: DepositDto = { deposit: 10 };

      depositService.validateRole = jest.fn().mockReturnValue(true);
      user.save = jest.fn();
      const result = await depositService.depositCoin(user, depositDetails);

      expect(result.username).toBe(user.username);
    });
  });
});
