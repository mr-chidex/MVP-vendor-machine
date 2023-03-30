import { Injectable, ForbiddenException } from '@nestjs/common';

import { BuyDto } from './dto';
import { ROLE, User } from '../database/users.entity';

@Injectable()
export class BuyService {
  async buyProduct(user: User, buyDetails: BuyDto) {
    return user;
  }

  validateRole(user: User) {
    if (user.role !== ROLE.BUYER) {
      throw new ForbiddenException(
        'Not a buyer. Action supported for only "buyers"',
      );
    }

    return;
  }
}
