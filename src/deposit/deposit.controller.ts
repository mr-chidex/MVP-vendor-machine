import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { DepositDto } from './dto';
import { DepositService } from './deposit.service';
import { GetUser } from '../auth/decorators';
import { User } from '../database/users.entity';

@Controller('deposit')
@UseGuards(AuthGuard())
export class DepositController {
  constructor(private authService: DepositService) {}

  @Post()
  deposit(
    @GetUser() user: User,
    @Body(ValidationPipe) depositDetails: DepositDto,
  ) {
    return this.authService.depositCoin(user, depositDetails);
  }
}
