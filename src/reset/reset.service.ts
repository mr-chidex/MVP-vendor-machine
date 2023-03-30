import { Injectable, ForbiddenException } from '@nestjs/common';

import { ROLE, User } from '../database/users.entity';

@Injectable()
export class ResetService {
  async resetDeposit(user: User) {
    this.validateRole(user);

    user.deposit = 0;
    await user.save();

    return user;
  }

  validateRole(user: User) {
    if (user.role !== ROLE.BUYER) {
      throw new ForbiddenException(
        'Not a buyer. Action surpported for only "buyers"',
      );
    }

    return;
  }
}
