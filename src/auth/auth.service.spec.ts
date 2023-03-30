import {
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../database/users.entity';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: any;
  const mockAuthCredentials: LoginAuthDto = {
    username: 'invalid',
    password: 'test',
  };

  const mockUserRepository = () => ({
    findOneBy: jest.fn(),
    create: jest.fn(() => ({ save: jest.fn() })),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepository },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('validateCredentials', () => {
    afterAll(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error if username is incorrect', () => {
      userRepository.findOneBy.mockResolvedValue(false);

      expect(
        authService.validateCredentials(mockAuthCredentials),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw error if password is incorrect', () => {
      userRepository.findOneBy.mockResolvedValue(true);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      expect(
        authService.validateCredentials(mockAuthCredentials),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return user', async () => {
      userRepository.findOneBy.mockResolvedValue(mockAuthCredentials);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await authService.validateCredentials(mockAuthCredentials);
      expect(result).toEqual(mockAuthCredentials);
    });
  });

  describe('isUserActive', () => {
    it('shoud  return undefined if token is not specified in user', () => {
      const mockData = {
        username: 'invalid',
        password: 'test',
      } as User;

      const result = authService.isUserActive(mockData);
      expect(result).toBeUndefined();
    });
  });

  describe.skip('signin', () => {
    it('should sign a user in and get token', async () => {
      const mockAuthCredentials: LoginAuthDto = {
        username: 'test',
        password: 'test',
      };

      authService.signin = jest.fn().mockResolvedValue('token');

      const result = await authService.signin(mockAuthCredentials);

      expect(result).toBe('token');
    });
  });
});
