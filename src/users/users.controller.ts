import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { RegisterAuthDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private authService: UsersService) {}

  @Post()
  register(@Body(ValidationPipe) userCredentials: RegisterAuthDto) {
    return this.authService.signup(userCredentials);
  }
}
