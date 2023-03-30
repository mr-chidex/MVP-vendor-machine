import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DepositDto } from './dto';
import { User } from '../database/users.entity';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async depositCoin(user: User, depositDetails: DepositDto) {
    const { deposit } = depositDetails;

    this.validateRole(user);

    user.deposit += deposit;
    await user.save();

    return user;
  }

  validateRole(user: User) {
    if (user.role !== 'buyer') {
      throw new ForbiddenException(
        'Not a buyer. Only "buyers" can make deposit',
      );
    }

    return;
  }
}
