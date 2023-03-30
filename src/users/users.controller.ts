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
import { RegisterAuthDto, UpdateDto } from './dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  register(@Body(ValidationPipe) userCredentials: RegisterAuthDto) {
    return this.userService.signup(userCredentials);
  }

  @Get()
  @UseGuards(AuthGuard())
  profile(@GetUser() user: User) {
    return this.userService.getProfile(user);
  }

  @Patch()
  @UseGuards(AuthGuard())
  update(
    @GetUser() user: User,
    @Body(ValidationPipe) updateDetails: UpdateDto,
  ) {
    return this.userService.updateProfile(user, updateDetails);
  }

  @Delete()
  @UseGuards(AuthGuard())
  delete(@GetUser() user: User) {
    return this.userService.deleteAccount(user);
  }
}
