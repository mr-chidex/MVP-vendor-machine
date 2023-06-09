import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ResetService } from './reset.service';
import { GetUser } from '../auth/decorators';
import { User } from '../database/users.entity';

@Controller('reset')
@UseGuards(AuthGuard())
export class ResetController {
  constructor(private resetService: ResetService) {}

  @Post()
  reset(@GetUser() user: User) {
    return this.resetService.resetDeposit(user);
  }
}
