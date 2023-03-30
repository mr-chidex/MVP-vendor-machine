import { Injectable, ForbiddenException } from '@nestjs/common';

import { DepositDto } from './dto';
import { ROLE, User } from '../database/users.entity';

@Injectable()
export class DepositService {
  async depositCoin(user: User, depositDetails: DepositDto) {
    const { deposit } = depositDetails;

    this.validateRole(user);

    user.deposit += deposit;
    await user.save();

    return user;
  }

  validateRole(user: User) {
    if (user.role !== ROLE.BUYER) {
      throw new ForbiddenException(
        'Not a buyer. Only "buyers" can make deposit',
      );
    }

    return;
  }
}
