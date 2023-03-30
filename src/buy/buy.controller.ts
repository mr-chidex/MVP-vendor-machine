import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BuyDto } from './dto';
import { BuyService } from './buy.service';
import { GetUser } from '../auth/decorators';
import { User } from '../database/users.entity';

@Controller('buy')
@UseGuards(AuthGuard())
export class BuyController {
  constructor(private buyService: BuyService) {}

  @Post()
  buy(@GetUser() user: User, @Body(ValidationPipe) buyDetails: BuyDto) {
    return this.buyService.buyProduct(user, buyDetails);
  }
}
