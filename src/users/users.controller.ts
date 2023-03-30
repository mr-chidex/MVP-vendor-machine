import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../database/users.entity';
import { GetUser } from '../auth/decorators';
import { RegisterAuthDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private authService: UsersService) {}

  @Post()
  register(@Body(ValidationPipe) userCredentials: RegisterAuthDto) {
    return this.authService.signup(userCredentials);
  }

  @Get()
  @UseGuards(AuthGuard())
  profile(@GetUser() user: User) {
    return this.authService.getProfile(user);
  }

  @Patch()
  @UseGuards(AuthGuard())
  update(
    @GetUser() user: User,
    @Body(ValidationPipe) userCredentials: RegisterAuthDto,
  ) {
    return this.authService.updateProfile(user, userCredentials);
  }

  @Delete()
  delete(@GetUser() user: User) {
    return this.authService.deleteAccount(user);
  }
}
