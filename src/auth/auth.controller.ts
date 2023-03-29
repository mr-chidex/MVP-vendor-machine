import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body(ValidationPipe) authCredential: LoginAuthDto) {
    return this.authService.signin(authCredential);
  }
}
