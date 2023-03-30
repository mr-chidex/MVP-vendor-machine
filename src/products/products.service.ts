import { Injectable, ForbiddenException } from '@nestjs/common';

import { ROLE, User } from '../database/users.entity';

@Injectable()
export class ProductService {
  async addNewProduct(user: User, productDetails: any) {
    this.validateRole(user);

    return {};
  }

  validateRole(user: User) {
    if (user.role !== ROLE.SELLER) {
      throw new ForbiddenException(
        'Not a seller. Action surpported for only "sellers"',
      );
    }

    return;
  }
}
