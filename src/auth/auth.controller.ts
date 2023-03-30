import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../database/users.entity';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';
import { LoginAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body(ValidationPipe) authCredential: LoginAuthDto) {
    return this.authService.signin(authCredential);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  logout(@GetUser() user: User) {
    return this.authService.logout(user);
  }
}
