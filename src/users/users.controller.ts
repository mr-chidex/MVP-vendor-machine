import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

import { RegisterAuthDto } from './dto';
import { UserPipe } from './pipes/users.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private authService: UsersService) {}

  @Post()
  @UsePipes(UserPipe)
  register(@Body(ValidationPipe) userCredentials: RegisterAuthDto) {
    return this.authService.signup(userCredentials);
  }
}
